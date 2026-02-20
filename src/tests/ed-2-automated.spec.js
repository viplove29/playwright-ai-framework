const { test, expect } = require('@playwright/test');

test.describe('ED-2: Verify H1 Headline on Endpoint Clinical', () => {
  
  // Setup: Define the target URL
  const targetUrl = 'https://www.endpointclinical.com';

  test.beforeEach(async ({ page }) => {
    // Navigate to the target URL with domcontentloaded for faster loading
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded' });
  });

  test('Test Case 1: Verify H1 Element Contains Correct Headline', async ({ page }) => {
    try {
      // Locate the H1 element
      const h1Element = page.locator('h1');

      // Assert that the H1 element is visible
      await expect(h1Element).toBeVisible();

      // Get the text content of the H1 element
      const h1Text = await h1Element.textContent();

      // Verify that the headline contains the required keywords
      expect(h1Text).toContain('hidden');
      expect(h1Text).toContain('advantage');
      expect(h1Text).toContain('RTSM');

    } catch (error) {
      // Handle any errors that occur during the test
      console.error('Error during test execution:', error);
      throw error; // Rethrow the error to fail the test
    }
  });

  test.afterEach(async ({ page }) => {
    // Teardown: Close the page if needed (optional)
    await page.close();
  });
});
