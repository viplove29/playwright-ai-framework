# 🔧 GitHub Pages Deployment Fix

## Current Issue

You're seeing a weird URL like:
```
https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework/?/UI_DEPLOYMENT_GUIDE.html
```

This happens because GitHub Pages is currently serving **repository files** (markdown docs) instead of the **built React app**.

## Why This Happened

1. **React App Not Built**: The `ui/build` folder doesn't exist yet
2. **GitHub Pages Misconfigured**: Pages is serving from repository root, not the build
3. **404.html Redirect**: The SPA redirect script is catching markdown file requests

## ✅ How to Fix It

### Step 1: Configure GitHub Pages Correctly

1. Go to: https://github.com/Ascen-dion/AI-Assisted-Playwright-Automation-Framework/settings/pages

2. Under **"Build and deployment"**:
   - **Source**: Select **"GitHub Actions"** (not "Deploy from a branch")
   - This tells GitHub to use your workflow file instead of serving files directly

3. Under **Settings → Actions → General → Workflow permissions**:
   - Select **"Read and write permissions"**
   - Check **"Allow GitHub Actions to create and approve pull requests"**
   - Click **Save**

### Step 2: Build the React App Locally (First Time)

```powershell
# Navigate to UI folder
cd ui

# Install dependencies if not already done
npm install

# Build the React app
npm run build
```

This creates the `ui/build` folder with optimized production files.

### Step 3: Deploy to GitHub Pages

**Option A: Automatic via GitHub Actions (Recommended)**

```powershell
# From repository root
git add .
git commit -m "Configure GitHub Pages and build React app"
git push origin mcp_rail_jira_ui
```

The workflow will:
1. Checkout code
2. Install dependencies
3. Build React app
4. Deploy to GitHub Pages

**Option B: Manual Deploy**

```powershell
cd ui
npm run deploy
```

### Step 4: Verify Deployment

1. Go to **Actions** tab: https://github.com/Ascen-dion/AI-Assisted-Playwright-Automation-Framework/actions

2. Watch the **"Deploy UI to GitHub Pages"** workflow run

3. Once complete (green ✓), wait 2-5 minutes for DNS propagation

4. Visit: https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework/

You should see:
- ✅ Dark theme with Matrix rain animation
- ✅ Two input modes (Jira ID / Plain English)
- ✅ Clean URL (no `?/` weirdness)

## What You'll See After Fix

### Before (Current - Wrong)
```
https://ascen-dion.github.io/.../?/UI_DEPLOYMENT_GUIDE.html
```
- Shows markdown files with weird ?/ URLs
- 404.html redirect interfering

### After (Fixed - Correct)
```
https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework/
```
- Shows React app with Ascendion dark theme
- Matrix rain background
- Workflow interface ready to use

## Important Notes

### Backend API Required

The UI connects to `http://localhost:3001` for backend functionality. For full workflow features:

1. **Local Development**: Run backend locally
   ```powershell
   cd server
   node workflow-api.js
   ```

2. **Production**: Deploy backend separately (Azure, AWS, Heroku) and update API URL in:
   ```javascript
   // ui/src/components/WorkflowUI.js
   const API_BASE = 'https://your-backend.com/api/workflow';
   ```

### GitHub Pages Limitations

- **Static Hosting Only**: GitHub Pages serves static files
- **No Backend**: Cannot run Node.js server
- **Demo Mode**: UI works for demonstration, but needs hosted backend for full functionality

## Troubleshooting

### Still Seeing Markdown Files?

1. **Clear GitHub Pages Cache**:
   - Go to Settings → Pages
   - Change source to "None", save
   - Change back to "GitHub Actions", save

2. **Hard Refresh Browser**:
   - Windows: `Ctrl + Shift + R`
   - Mac: `Cmd + Shift + R`

3. **Check Actions Log**:
   - Verify deployment completed successfully
   - Look for any error messages

### Build Fails in GitHub Actions?

- Check `ui/package-lock.json` is committed
- Ensure no syntax errors in React code
- Review Actions logs for specific error

### Blank Page After Deployment?

1. Check browser console (F12) for errors
2. Verify homepage URL in `ui/package.json`:
   ```json
   "homepage": "https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework"
   ```
3. Ensure all assets loaded (check Network tab)

## Quick Reference

**Repository**: https://github.com/Ascen-dion/AI-Assisted-Playwright-Automation-Framework

**Branch**: `mcp_rail_jira_ui`

**Live URL**: https://ascen-dion.github.io/AI-Assisted-Playwright-Automation-Framework/

**Workflow File**: `.github/workflows/deploy-ui.yml`

**Build Folder**: `ui/build/` (created by `npm run build`)

## Next Steps

1. ✅ Fix GitHub Pages settings (use GitHub Actions source)
2. ✅ Build React app locally (`npm run build`)
3. ✅ Push changes to trigger deployment
4. ✅ Wait 2-5 minutes for deployment
5. ✅ Visit live URL and enjoy! 🎉

---

**Need Help?** Check [GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md) for detailed setup guide.
