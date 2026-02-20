const { test, expect } = require('@playwright/test');

test.describe('Ascendion Homepage Tests', () => {
  // Setup: Define the target URL
  const targetUrl = 'https://www.endpointclinical.com';

  test.beforeEach(async ({ page }) => {
    // Navigate to the target URL with a timeout for DOM content loaded
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  });

  test('UI: Display Welcome Message on Ascendion Homepage', async ({ page }) => {
    try {
      // Locate the H1 element
      const h1Element = page.locator('h1');

      // Assert that the H1 element is visible
      await expect(h1Element).toBeVisible();

      // Get the text content of the H1 element
      const h1Text = await h1Element.textContent();

      // Verify that the H1 text contains the required keywords
      expect(h1Text).toContain('hidden');
      expect(h1Text).toContain('advantage');
      expect(h1Text).toContain('RTSM');
    } catch (error) {
      // Handle any errors gracefully
      console.error('Error during the test execution:', error);
      throw error; // Rethrow the error to fail the test
    }
  });

  test.afterEach(async ({ page }) => {
    // Optional: Add any teardown logic if needed
    // For example, closing the page or clearing cookies
  });
});
