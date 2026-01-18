
import { test, expect } from '@playwright/test';

test.describe('Login Error Handling', () => {
    // We can test the frontend error handling by navigating directly to the URL 
    // that the auth provider would redirect to on error.
    // We don't need a real backend for this specific UI test if we just assume the frontend is served.
    // However, we'll assume the app is running at the baseURL.

    const baseURL = 'http://localhost:5174'; // Updated to match start-up port

    test('should display readable error for OAuthAccountNotLinked', async ({ page }) => {
        // Navigate to the login page with the specific error parameter
        await page.goto(`${baseURL}/?error=OAuthAccountNotLinked`);

        // Force wait for logic to run if needed, but assertions wait automatically

        // Check if the "Login" tab is active (it should switch automatically)
        const loginTab = page.getByRole('button', { name: /Login|Account/i });
        // Depending on implementation, we might check class names or aria-selected

        // Click login tab just in case, though code should have switched it
        await loginTab.click();

        // Check for the specific error message
        // "An account with this email already exists with a different provider"
        const errorMessage = page.locator('text=An account with this email already exists');
        await expect(errorMessage).toBeVisible();

        // Take a screenshot for verification
        await page.screenshot({ path: 'login-error-state.png' });
    });

    test('should display readable error for MissingCSRF', async ({ page }) => {
        await page.goto(`${baseURL}/?error=MissingCSRF`);

        const loginTab = page.getByRole('button', { name: /Login|Account/i });
        await loginTab.click();

        const errorMessage = page.locator('text=Security token missing');
        await expect(errorMessage).toBeVisible();
    });
});
