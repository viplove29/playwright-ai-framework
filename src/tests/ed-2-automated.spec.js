const { test, expect } = require('@playwright/test');

test.describe('ED-2: Verify H1 Headline on Endpoint Clinical', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    // Launch a new browser instance
    const context = await browser.newContext();
    page = await context.newPage();
  });

  test.afterAll(async () => {
    // Close the browser context after tests
    await page.context().close();
  });

  test('Test Case 1: Verify H1 contains "Your hidden advantage in RTSM"', async () => {
    try {
      // Navigate to the target URL with a timeout
      await page.goto('https://www.endpointclinical.com', { waitUntil: 'domcontentloaded', timeout: 10000 });

      // Locate the H1 element
      const h1Locator = page.locator('h1');

      // Assert that the H1 element is visible
      await expect(h1Locator).toBeVisible();

      // Get the text content of the H1 element
      const h1Text = await h1Locator.textContent();

      // Verify that the H1 contains the required keywords
      expect(h1Text).toContain('hidden');
      expect(h1Text).toContain('advantage');
      expect(h1Text).toContain('RTSM');

    } catch (error) {
      // Log any errors that occur during the test
      console.error('Error during test execution:', error);
      throw error; // Rethrow the error to fail the test
    }
  });
});
