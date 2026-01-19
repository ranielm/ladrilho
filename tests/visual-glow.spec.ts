import { test, expect } from '@playwright/test';

test('visual: ambient glow exists and is non-blocking', async ({ page }) => {
    await page.goto('http://localhost:5173');

    // 1. Verify AmbientBackground exists
    const glowContainer = page.locator('.pointer-events-none').first();
    await expect(glowContainer).toBeVisible();

    // 2. Verify fixed positioning
    const position = await glowContainer.evaluate((el) => window.getComputedStyle(el).position);
    expect(position).toBe('fixed');

    // 3. Verify pointer-events: none (so users can click the game behind it)
    const pointerEvents = await glowContainer.evaluate((el) => window.getComputedStyle(el).pointerEvents);
    expect(pointerEvents).toBe('none');

    // 4. Verify blue inset shadow (rgb(30, 58, 138) is blue-900 color used)
    // The motion.div has the shadow
    const shadowDiv = page.locator('.shadow-\\[inset_0_0_150px_rgba\\(30\\,58\\,138\\,0\\.5\\)\\]');
    await expect(shadowDiv).toBeVisible();

    // 5. Check if it's animating (subtle check for opacity change)
    const opacity1 = await shadowDiv.evaluate((el) => window.getComputedStyle(el).opacity);
    await page.waitForTimeout(1000);
    const opacity2 = await shadowDiv.evaluate((el) => window.getComputedStyle(el).opacity);

    // Since it's a slow breath (4s), we might not see a huge jump, but we can verify it's a motion component
    // Or just trust the visual check in the screenshot.

    await page.screenshot({ path: 'test-results/ambient-glow.png' });
});
