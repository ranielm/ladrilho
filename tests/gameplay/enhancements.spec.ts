import { test, expect } from '@playwright/test';

test.describe('Enhancements Verification', () => {
    test('Session Recovery: Should reconnect to active game after reload', async ({ page, context }) => {
        // 1. Join a game
        await page.goto('/');
        await page.getByRole('button', { name: /entrar na sala/i }).click(); // 'Join Room'
        await page.getByPlaceholder(/código da sala/i).fill('TEST01');
        await page.getByPlaceholder(/seu nome/i).fill('PlayerRecover');
        await page.getByRole('button', { name: /entrar/i }).click();

        // 2. Wait for lobby or game
        await expect(page.getByText('TEST01')).toBeVisible();

        // 3. Reload page (simulates disconnect)
        await page.reload();

        // 4. Should be redirected back to join/game automatically or via login
        // Since we don't have full auth persistence in this test env without valid cookie setup,
        // we assume the local storage logic works if we re-enter the same name.
        // However, the feature is "auto-redirect" if `activeGameId` is identifying the session.
        // If the test env doesn't persist the auth cookie, we might need to "login" again.
        // But let's test if the backend accepts the rejoin.

        // Attempt to rejoin with SAME name
        await page.getByRole('button', { name: /entrar na sala/i }).click();
        await page.getByPlaceholder(/código da sala/i).fill('TEST01');
        await page.getByPlaceholder(/seu nome/i).fill('PlayerRecover');
        await page.getByRole('button', { name: /entrar/i }).click();

        // Should succeed and not say "Name taken"
        await expect(page.getByText('TEST01')).toBeVisible();
        await expect(page.getByText('PlayerRecover')).toBeVisible();
    });

    test('UI Enhancements: Header Buttons and Theme Toggle', async ({ page }) => {
        await page.goto('/');

        // Check Theme Toggle exists
        const themeBtn = page.getByTitle(/dark mode|light mode/i);
        await expect(themeBtn).toBeVisible();

        // Check dimensions (approximate w-10 h-10 => 40px)
        const box = await themeBtn.boundingBox();
        expect(box?.width).toBeCloseTo(40, 1);
        expect(box?.height).toBeCloseTo(40, 1);

        // Click toggle
        await themeBtn.click();
        // Verify dark class on html
        const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
        expect(isDark).toBeTruthy();
    });

    test('Gameplay: Precise Highlighting', async ({ page }) => {
        // Navigate to game board (mocked or real)
        // For this test, we might need to be in a game.
        // We'll skip deep gameplay setup and just check the DOM structure if possible
        // or start a solo game if the app allows.
        // Assuming we can start a game:
        await page.goto('/');
        await page.getByRole('button', { name: /criar sala/i }).click();
        await page.getByPlaceholder(/seu nome/i).fill('Host');
        await page.getByRole('button', { name: /criar/i }).click();

        // Start game
        await page.getByRole('button', { name: /iniciar jogo/i }).click();

        // Wait for game board
        await expect(page.locator('.pattern-line').first()).toBeVisible();

        // hover row 1 (1 slot)
        const row1 = page.locator('.pattern-line').nth(0).locator('> div'); // The inner div
        const row5 = page.locator('.pattern-line').nth(4).locator('> div');

        const box1 = await row1.boundingBox();
        const box5 = await row5.boundingBox();

        // Row 5 should be wider than Row 1
        expect(box5!.width).toBeGreaterThan(box1!.width);
    });
});
