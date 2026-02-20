# GitHub Pages Deployment Guide

## Repository Information
- **Repository**: https://github.com/Ascen-dion/AI-Assisted-Playwright-Automation-Framework
- **Branch**: `mcp_rail_jira_ui`
- **Live URL**: https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework/

## Automatic Deployment Setup

The UI is configured to automatically deploy to GitHub Pages when you push to the `mcp_rail_jira_ui` branch.

### Prerequisites
1. Repository settings must have GitHub Pages enabled
2. GitHub Actions must have write permissions

### Enabling GitHub Pages (One-Time Setup)

1. Go to your repository: `https://github.com/Ascen-dion/AI-Assisted-Playwright-Automation-Framework`

2. Navigate to **Settings** → **Pages**

3. Under "Build and deployment":
   - **Source**: Choose "GitHub Actions"
   - The workflow will automatically deploy from the `mcp_rail_jira_ui` branch

4. Under **Settings** → **Actions** → **General**:
   - Scroll to "Workflow permissions"
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click **Save**

### How It Works

The deployment happens automatically via GitHub Actions (`.github/workflows/deploy-ui.yml`):

1. **Trigger**: Pushes to `mcp_rail_jira_ui` branch that modify files in `ui/` folder, or manual trigger
2. **Build**: Installs dependencies and builds the React app
3. **Deploy**: Publishes the built files to GitHub Pages

### Manual Deployment (Alternative Method)

If you prefer to deploy manually from your local machine:

```powershell
# Navigate to the ui folder
cd ui

# Install dependencies (if not already done)
npm install

# Build and deploy
npm run deploy
```

This will:
1. Build the production version of the app
2. Push the built files to the `gh-pages` branch
3. GitHub Pages will serve from that branch

## Backend API Configuration

**Important**: The UI is currently configured to connect to a backend API at `http://localhost:3001`. For production use, you'll need to:

### Option 1: Deploy Backend Separately
1. Host the backend API on a cloud service (Azure, AWS, Heroku, etc.)
2. Update the API URL in `ui/src/components/WorkflowUI.js`:
   ```javascript
   const API_BASE = 'https://your-api-domain.com/api/workflow';
   ```

### Option 2: Use GitHub Pages for Static Demo Only
- The UI can be hosted on GitHub Pages for demonstration purposes
- Backend functionality requires a separate hosting solution

## Verifying Deployment

After pushing to the `mcp_rail_jira_ui` branch:

1. Go to **Actions** tab in your repository
2. Watch the "Deploy UI to GitHub Pages" workflow run
3. Once completed (green checkmark), visit: https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework/
4. The UI should load with the Ascendion dark theme and Matrix rain animation

## Troubleshooting

### Deployment Failed
- Check the Actions tab for error logs
- Ensure GitHub Pages is enabled in repository settings
- Verify workflow permissions are set to "Read and write"

### 404 Error on Page Load
- Wait 5-10 minutes after first deployment
- Clear browser cache and try again
- Verify the homepage URL in `ui/package.json` matches your repository

### Blank White Page
- Check browser console for errors
- Ensure the build completed successfully in Actions
- Verify all assets are loading correctly (check Network tab)

### API Connection Issues
- Remember: GitHub Pages is static hosting only
- Backend API must be hosted separately
- Update API_BASE URL in the code to point to your hosted backend

## Theme & Features

The deployed UI includes:
- 🎨 Ascendion dark theme with teal accents
- 🌊 Animated Matrix rain background (purple to green gradient)
- ✨ Glowing effects on buttons and cards
- 🔄 Two-mode input system (Jira ID or Plain English)
- 🔗 Clickable Jira and TestRail URLs
- 🛠️ Self-healing test execution
- 📊 Real-time workflow progress tracking

## Updates

To update the live site:
1. Make changes to files in the `ui/` folder
2. Commit and push to `mcp_rail_jira_ui` branch
3. GitHub Actions will automatically rebuild and redeploy
4. Changes will be live in 2-5 minutes

## Manual Trigger

You can manually trigger a deployment without pushing code:
1. Go to **Actions** tab
2. Select "Deploy UI to GitHub Pages" workflow
3. Click "Run workflow" dropdown
4. Select `mcp_rail_jira_ui` branch
5. Click "Run workflow" button

---

**Note**: This is a React Single Page Application. The 404.html file in `ui/public/` handles client-side routing for GitHub Pages.
