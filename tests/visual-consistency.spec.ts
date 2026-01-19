import { test, expect } from '@playwright/test';

test('visual consistency: dark mode and solid background', async ({ page }) => {
    // 1. Setup: Load application in fresh context
    await page.goto('http://localhost:5173');

    // 2. Assertion: Verify <html> has class 'dark'
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');

    // 3. Assertion: Verify body background color is Slate 900 rgb(15, 23, 42)
    const bodyBg = await page.evaluate(() => {
        return window.getComputedStyle(document.body).backgroundColor;
    });
    // Slate 900 is #0f172a which is rgb(15, 23, 42)
    expect(bodyBg).toBe('rgb(15, 23, 42)');

    // 4. Assertion: Verify NO elements have 'blur-3xl' (vignette/glow removal)
    const blurElements = await page.locator('.blur-3xl').count();
    expect(blurElements).toBe(0);

    // 5. Assertion: Verify container uses bg-slate-800 rgb(30, 41, 59)
    const containerBg = await page.evaluate(() => {
        // Target the main glass-card component (which now has bg-slate-800)
        const card = document.querySelector('.bg-slate-800');
        return card ? window.getComputedStyle(card).backgroundColor : null;
    });
    expect(containerBg).toBe('rgb(30, 41, 59)');

    // 6. Screenshot for manual validation
    await page.screenshot({ path: 'test-results/visual-consistency.png' });
});
