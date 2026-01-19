import { test, expect } from '@playwright/test';

test('rejoin with same name after refresh should work', async ({ page, context }) => {
    // 1. Setup: Join a room as "Raniel"
    await page.goto('http://localhost:5173');

    // Wait for landing page
    const createBtn = page.getByRole('button', { name: /Criar Sala|Create Room/i });
    await createBtn.click();

    // Enter name
    await page.fill('input[placeholder*="nome"], input[placeholder*="name"]', 'Raniel');
    const confirmCreateBtn = page.getByRole('button', { name: /Criar|Create/i }).first();
    await confirmCreateBtn.click();

    // Wait for lobby/game (look for room code or name)
    await expect(page.locator('text=Raniel')).toBeVisible();

    // Get room ID from URL
    const url = await page.url();
    const roomIdMatch = url.match(/room=([A-Z0-9]{6})/);
    const roomId = roomIdMatch ? roomIdMatch[1] : null;
    expect(roomId).toBeTruthy();

    // Store player specific ID from localStorage
    const playerId = await page.evaluate(() => localStorage.getItem('ladrilho-player-id'));
    expect(playerId).toBeTruthy();

    // 2. Action: Refresh the page
    await page.reload();

    // 3. Assertion: Verify successful re-entry without "already taken" error
    // If the bug exists, we might see the error toast or be kicked to home
    await expect(page.locator('text=Name already taken')).not.toBeVisible();
    await expect(page.locator('text=Raniel')).toBeVisible();

    // 4. Negative Test: User B (different session) tries to join as "Raniel"
    const pageB = await context.newPage();
    await pageB.goto(`http://localhost:5173/?room=${roomId}`);

    // Join room B
    const joinBtn = pageB.getByRole('button', { name: /Entrar|Join/i });
    await joinBtn.click();

    await pageB.fill('input[placeholder*="nome"], input[placeholder*="name"]', 'Raniel');
    const confirmJoinBtn = pageB.getByRole('button', { name: /Entrar|Join/i }).first();
    await confirmJoinBtn.click();

    // Should show error for different user (since they don't have the same email or playerId)
    await expect(pageB.locator('text=Name already taken')).toBeVisible();
});
