/**
 * MCP Usage Examples
 * Practical examples of using MCP in your Playwright tests
 * 
 * Copy these examples into your test files!
 */

const { test, expect } = require('@playwright/test');
const testAgents = require('../src/core/test-agents-mcp');
const mcpClient = require('../src/mcp/playwright-mcp-client');

//=============================================================================
// EXAMPLE 1: Basic Test Generation
//=============================================================================

test('Example 1: Generate simple test', async () => {
  const code = await testAgents.generateTest(`
    Test: Login to SauceDemo
    1. Go to https://www.saucedemo.com
    2. Enter username: standard_user
    3. Enter password: secret_sauce
    4. Click login
    5. Verify products page
  `);
  
  console.log('Generated Code:\n', code);
});

//=============================================================================
// EXAMPLE 2: Plan and Generate Workflow
//=============================================================================

test('Example 2: Plan then generate', async () => {
  // Step 1: Generate plan
  const plan = await testAgents.planTest('Shopping cart checkout flow');
  console.log('Test Plan:\n', plan);
  
  // Step 2: Generate code from plan
  const code = await testAgents.generateTest(plan, {
    url: 'https://www.saucedemo.com'
  });
  console.log('Generated Code:\n', code);
});

//=============================================================================
// EXAMPLE 3: One-Step Plan + Generate
//=============================================================================

test('Example 3: Combined plan and generate', async () => {
  const { plan, code } = await testAgents.planAndGenerate(
    'Add multiple items to cart and checkout',
    {
      testType: 'e2e',
      url: 'https://www.saucedemo.com',
      framework: 'playwright-ai'
    }
  );
  
  console.log('Plan:\n', plan);
  console.log('\nCode:\n', code);
});

//=============================================================================
// EXAMPLE 4: Save Generated Files
//=============================================================================

test('Example 4: Generate and save to files', async () => {
  await testAgents.planAndGenerate(
    'User registration and verification',
    {
      testType: 'e2e',
      savePlanTo: 'test-results/agents/plans/registration.md',
      saveCodeTo: 'src/tests/generated-registration.spec.js'
    }
  );
  
  console.log('✅ Files saved!');
});

//=============================================================================
// EXAMPLE 5: Analyze Page Context
//=============================================================================

test('Example 5: Analyze page for testing', async ({ page }) => {
  // Navigate to page
  await page.goto('https://www.saucedemo.com');
  
  // Ask AI to analyze the page
  const analysis = await testAgents.analyzePageContext(
    page,
    'What are the main elements I should test on this page?'
  );
  
  console.log('AI Page Analysis:\n', analysis);
});

//=============================================================================
// EXAMPLE 6: Self-Healing Test
//=============================================================================

test('Example 6: Auto-heal failed test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  
  try {
    // This will fail - wrong selector
    await page.click('#wrong-login-button', { timeout: 5000 });
  } catch (error) {
    console.log('❌ Test failed, asking AI for help...');
    
    const screenshot = await page.screenshot({ encoding: 'base64' });
    
    const fix = await testAgents.healTest({
      errorMessage: error.message,
      testCode: 'await page.click("#wrong-login-button")',
      screenshot: screenshot,
      pageUrl: page.url()
    });
    
    console.log('💊 AI Suggested Fix:\n', fix);
  }
});

//=============================================================================
// EXAMPLE 7: Direct MCP Tool Usage
//=============================================================================

test('Example 7: Use MCP tools directly', async () => {
  // Skip if MCP not enabled
  const mcpInfo = await testAgents.getMCPInfo();
  test.skip(!mcpInfo.available, 'MCP not enabled');
  
  // Call MCP tool directly
  const result = await testAgents.callMCPTool('generate_test_plan', {
    requirements: 'API testing for REST endpoints',
    testType: 'api',
    priority: 'high'
  });
  
  console.log('MCP Tool Response:\n', result.content[0].text);
});

//=============================================================================
// EXAMPLE 8: List Available MCP Tools
//=============================================================================

test('Example 8: Discover MCP capabilities', async () => {
  // Get MCP server info
  const info = await testAgents.getMCPInfo();
  console.log('MCP Server Info:', JSON.stringify(info, null, 2));
  
  // List all available tools
  const { tools } = await testAgents.listMCPTools();
  console.log('\nAvailable Tools:');
  tools.forEach(tool => {
    console.log(`  • ${tool.name}: ${tool.description}`);
  });
});

//=============================================================================
// EXAMPLE 9: Multi-Scenario Test Generation
//=============================================================================

test('Example 9: Generate tests for multiple scenarios', async () => {
  const scenarios = [
    'Login with valid credentials',
    'Login with invalid credentials',
    'Logout successfully'
  ];
  
  for (const scenario of scenarios) {
    console.log(`\n🎯 Generating test for: ${scenario}`);
    
    const code = await testAgents.generateTest(scenario, {
      url: 'https://www.saucedemo.com',
      framework: 'playwright-ai'
    });
    
    console.log(code.substring(0, 200) + '...\n');
  }
});

//=============================================================================
// EXAMPLE 10: Context-Aware Test Generation
//=============================================================================

test('Example 10: Generate test based on live page', async ({ page }) => {
  // Navigate to the application
  await page.goto('https://www.saucedemo.com');
  await page.waitForLoadState('networkidle');
  
  // Analyze the page first
  const pageAnalysis = await testAgents.analyzePageContext(
    page,
    'Analyze this login page and suggest test scenarios'
  );
  
  console.log('AI Page Analysis:\n', pageAnalysis);
  
  // Generate test based on analysis
  const testCode = await testAgents.generateTest(`
    Based on the SauceDemo login page, create a comprehensive login test that:
    1. Tests successful login
    2. Verifies error messages for invalid credentials
    3. Checks all form validations
  `, {
    url: page.url(),
    framework: 'playwright-ai'
  });
  
  console.log('\nGenerated Test:\n', testCode);
});

//=============================================================================
// PRACTICAL WORKFLOWS
//=============================================================================

test.describe('Practical MCP Workflows', () => {

  test('Workflow 1: New Feature Testing', async ({ page }) => {
    console.log('📋 Step 1: Planning tests for new feature...');
    const plan = await testAgents.planTest(
      'Test new shopping cart feature with discount codes',
      { testType: 'e2e', priority: 'high' }
    );
    
    console.log('💻 Step 2: Generating test code...');
    const code = await testAgents.generateTest(plan, {
      url: 'https://www.saucedemo.com',
      framework: 'playwright-ai',
      saveTo: 'src/tests/generated-cart-feature.spec.js'
    });
    
    console.log('✅ Complete! Test file saved.');
  });

  test('Workflow 2: Bug Investigation', async ({ page }) => {
    // Simulate a bug scenario
    await page.goto('https://www.saucedemo.com');
    
    console.log('🐛 Step 1: Reproducing bug...');
    let error = null;
    try {
      await page.click('#non-existent-button');
    } catch (e) {
      error = e;
    }
    
    console.log('🔍 Step 2: Analyzing failure with AI...');
    const screenshot = await page.screenshot({ encoding: 'base64' });
    const analysis = await testAgents.healTest({
      errorMessage: error.message,
      pageUrl: page.url(),
      screenshot
    });
    
    console.log('💡 AI Analysis:\n', analysis);
  });

  test('Workflow 3: Test Maintenance', async () => {
    console.log('🔄 Step 1: Analyzing existing test...');
    
    const oldTest = `
      await page.goto('https://old-url.com');
      await page.fill('#old-selector', 'data');
      await page.click('.old-button');
    `;
    
    console.log('🤖 Step 2: Asking AI to modernize...');
    const modernized = await testAgents.generateTest(
      `Modernize this test to use AI-powered selectors and best practices:\n${oldTest}`,
      { framework: 'playwright-ai' }
    );
    
    console.log('✨ Modernized Test:\n', modernized);
  });

});

//=============================================================================
// HELPER PATTERNS
//=============================================================================

// Pattern 1: Check MCP availability before use
async function ensureMCP() {
  const info = await testAgents.getMCPInfo();
  if (!info.available) {
    throw new Error('MCP not available. Set USE_MCP=true in .env');
  }
  return info;
}

// Pattern 2: Generate test with retry
async function generateTestWithRetry(description, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await testAgents.generateTest(description);
    } catch (error) {
      console.log(`Attempt ${i + 1} failed, retrying...`);
      if (i === maxRetries - 1) throw error;
    }
  }
}

// Pattern 3: Batch test generation
async function generateTestSuite(scenarios) {
  const results = [];
  for (const scenario of scenarios) {
    const code = await testAgents.generateTest(scenario);
    results.push({ scenario, code });
  }
  return results;
}

//=============================================================================
// USAGE IN REAL TESTS
//=============================================================================

test.describe('Real-World Example: E-Commerce Testing', () => {
  
  test('Complete shopping flow', async ({ page }) => {
    // Use MCP to analyze the app first
    await page.goto('https://www.saucedemo.com');
    
    const appAnalysis = await testAgents.analyzePageContext(
      page,
      'Analyze this e-commerce app and suggest a complete shopping test flow'
    );
    
    console.log('App Analysis:', appAnalysis);
    
    // Generate comprehensive test based on analysis
    const testSuite = await testAgents.generateTest(
      appAnalysis + '\n\nGenerate a complete shopping flow test',
      {
        url: page.url(),
        framework: 'playwright-ai',
        saveTo: 'src/tests/generated-shopping-flow.spec.js'
      }
    );
    
    console.log('✅ Test suite generated and saved!');
  });

});

module.exports = {
  ensureMCP,
  generateTestWithRetry,
  generateTestSuite
};
