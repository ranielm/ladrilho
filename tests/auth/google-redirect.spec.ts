
import { test, expect } from '@playwright/test';

test.describe('Google Auth Redirect', () => {
    const baseURL = 'http://localhost:5174';

    test('should initiate Google OAuth flow', async ({ page }) => {
        // Detailed Network Logging
        page.on('request', request => console.log(`>> ${request.method()} ${request.url()}`));
        page.on('response', response => {
            console.log(`<< ${response.status()} ${response.url()}`);
            if (response.status() >= 300 && response.status() < 400) {
                console.log(`   Location: ${response.headers()['location']}`);
            }
        });
        page.on('console', msg => console.log('BROWSER LOG:', msg.text()));

        // 1. Go to home page
        console.log(`Navigating to ${baseURL}`);
        await page.goto(baseURL);

        // 2. Click "Login" tab
        await page.getByRole('button', { name: /Login|Account/i }).click();

        // Debug: Check if button exists
        const btnCount = await page.locator('text=Sign in with Google').count();
        console.log(`Found ${btnCount} Google Sign-in buttons`);

        // 3. Click Sign in and wait for ANY navigation
        console.log("Clicking Sign in with Google...");

        // We use Promise.all to ensure we catch the navigation event if it happens immediately
        try {
            await Promise.all([
                // Wait for either the backend response OR a navigation event
                page.waitForEvent('response', { predicate: r => r.url().includes('/api/auth/signin/google') }).catch(() => console.log("Response wait timeout")),
                page.click('text=Sign in with Google')
            ]);

            // Give it a moment to process the response/redirect
            await page.waitForTimeout(3000);

            const currentUrl = page.url();
            console.log('Current URL after click:', currentUrl);

            if (currentUrl.includes('google.com')) {
                console.log('SUCCESS: Navigated to Google');
            } else if (currentUrl.includes('error')) {
                console.log('FAILURE: Navigated to error page. URL:', currentUrl);
            } else {
                console.log('PENDING: Still on original page or intermediate. URL:', currentUrl);
            }

        } catch (e) {
            console.log("Error during interaction:", e);
        }

        // Take screenshot
        await page.screenshot({ path: 'google-flow-debug.png' });
    });
});
