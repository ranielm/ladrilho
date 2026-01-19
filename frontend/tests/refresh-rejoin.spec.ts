import { test, expect } from '@playwright/test';

test('rejoin with same name after refresh should work', async ({ page, context }) => {
    // 1. Setup: Join a room as "Raniel"
    await page.goto('/');
    await page.click('button:has-text("Criar Sala"), button:has-text("Create Room")');
    await page.fill('input[placeholder*="nome"], input[placeholder*="name"]', 'Raniel');
    await page.click('button:has-text("Criar"), button:has-text("Create")');

    // Wait for lobby/game to load
    await expect(page.locator('text=Raniel')).toBeVisible();
    const roomId = await page.url().split('room=')[1];

    // Store player specific ID from localStorage to simulate identity
    const playerId = await page.evaluate(() => localStorage.getItem('ladrilho-player-id'));
    expect(playerId).toBeTruthy();

    // 2. Action: Refresh the page
    await page.reload();

    // 3. Assertion: Verify successful re-entry without "already taken" error
    await expect(page.locator('text=Name already taken')).not.toBeVisible();
    await expect(page.locator('text=Raniel')).toBeVisible();

    // 4. Negative Test: User B (different session) tries to join as "Raniel"
    const pageB = await context.newPage();
    await pageB.goto(`/?room=${roomId}`);
    await pageB.fill('input[placeholder*="nome"], input[placeholder*="name"]', 'Raniel');
    await pageB.click('button:has-text("Entrar"), button:has-text("Join")');

    // Should show error for different user
    await expect(pageB.locator('text=Name already taken')).toBeVisible();
});
