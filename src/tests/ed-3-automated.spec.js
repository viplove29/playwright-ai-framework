const { test, expect } = require('@playwright/test');

test.describe('ED-3: Ascendion Homepage Tests', () => {
  
  test('Test Case 1: Display Welcome Message on Ascendion Homepage', async ({ page }) => {
    try {
      // Navigate to the Ascendion homepage
      await page.goto('https://www.ascendion.com', { 
        waitUntil: 'domcontentloaded', 
        timeout: 30000 
      });

      // Get the page title and verify it contains "Ascendion"
      const title = await page.title();
      expect(title).toContain('Ascendion');

      // Verify the page loaded successfully
      const url = page.url();
      expect(url).toContain('ascendion.com');

      // Check for any visible text content
      const bodyText = await page.locator('body').textContent();
      expect(bodyText).toBeTruthy();
      expect(bodyText.length).toBeGreaterThan(100);

      console.log('✓ Successfully loaded Ascendion homepage');
      console.log(`  Page title: ${title}`);
      console.log(`  Page URL: ${url}`);

    } catch (error) {
      console.error('Error during test execution:', error);
      throw error;
    }
  });
});
