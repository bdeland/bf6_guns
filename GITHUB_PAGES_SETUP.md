# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying the interactive weapon statistics dashboard to GitHub Pages, making it accessible to anyone via a public URL.

## 📋 Prerequisites

- A GitHub account
- Git installed on your computer
- This repository on your local machine

## 🎯 Quick Setup (5 minutes)

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right and select **"New repository"**
3. Name your repository (e.g., `bf6_guns`)
4. Choose **Public** (required for free GitHub Pages)
5. **Do NOT** initialize with README (we already have one)
6. Click **"Create repository"**

### Step 2: Push Your Code

```bash
# Navigate to your project directory
cd /path/to/your/guns/folder

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Interactive weapon statistics dashboard"

# Add your GitHub repository as remote
# Example for your repository:
git remote add origin https://github.com/bdeland/bf6_guns.git

# Push to GitHub
git push -u origin main
```

**Note:** If you get an error about `master` vs `main`, use:
```bash
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** (gear icon at top right)
3. Scroll down and click **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for deployment

### Step 4: Access Your Dashboard

Your dashboard will be available at:
```
https://bdeland.github.io/bf6_guns/
```

Update the username and repository name for your own project!

## ✅ Verify Deployment

1. Visit your GitHub Pages URL
2. You should see the interactive dashboard
3. Test all tabs: Overview, Comparison, Charts, Leaderboards, Calculator
4. Try filtering and sorting weapons
5. Check that charts render correctly

## 🔧 Troubleshooting

### Dashboard shows blank page

**Problem:** Files aren't loading properly

**Solution:** 
1. Check browser console (F12) for errors
2. Ensure all files are committed: `index.html`, `app.js`, `styles.css`, `data.csv`
3. Try hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)

### Charts not displaying

**Problem:** Chart.js not loading

**Solution:** Check internet connection - Chart.js loads from CDN. If offline, charts won't work.

### Data not loading

**Problem:** `data.csv` file not found

**Solution:** Ensure `data.csv` is in the same directory as `index.html` and has been committed to git:
```bash
git add data.csv
git commit -m "Add weapon data CSV"
git push
```

### 404 Page Not Found

**Problem:** GitHub Pages not enabled or wrong URL

**Solution:**
1. Double-check Settings → Pages is configured
2. Verify the URL matches: `https://bdeland.github.io/bf6_guns/`
3. Wait a few minutes - initial deployment can take time

## 🔄 Updating Your Dashboard

After making changes to your code:

```bash
# Save your changes
git add .
git commit -m "Description of your changes"
git push

# GitHub Pages will automatically rebuild (takes 1-2 minutes)
```

## 🎨 Customization

### Change Colors

Edit `styles.css` and modify the `:root` variables:

```css
:root {
    --primary-color: #2563eb;    /* Change this */
    --secondary-color: #7c3aed;  /* And this */
    /* ... etc */
}
```

### Add Your Own Data

1. Edit `data.csv` with your weapon data
2. Keep the same column structure
3. Commit and push changes
4. Dashboard will automatically update

### Modify Features

Edit `app.js` to:
- Add new chart types
- Change sorting options
- Add new metrics
- Customize calculations

## 📱 Mobile Optimization

The dashboard is already responsive! Test on mobile by:
1. Opening your GitHub Pages URL on your phone
2. Or use Chrome DevTools (F12) → Toggle device toolbar (Ctrl+Shift+M)

## 🌐 Custom Domain (Optional)

Want a custom domain like `weapons.yourname.com`?

1. Buy a domain from any registrar (Namecheap, Google Domains, etc.)
2. In your repository, create a file named `CNAME` (no extension)
3. Add your domain to the file: `weapons.yourname.com`
4. In your DNS settings, add a CNAME record pointing to `bdeland.github.io`
5. Wait for DNS propagation (can take 24-48 hours)

More details: [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

## 📊 Embed in Other Sites

You can embed your dashboard in other websites using an iframe:

```html
<iframe 
    src="https://bdeland.github.io/bf6_guns/" 
    width="100%" 
    height="800px" 
    frameborder="0">
</iframe>
```

## 🔒 Making Repository Private

**Note:** GitHub Pages requires a public repository for free accounts. 

If you have GitHub Pro, you can:
1. Keep the repository private
2. GitHub Pages will still work
3. Your dashboard remains publicly accessible at the URL

## 📈 Analytics (Optional)

Want to track visitors? Add Google Analytics:

1. Create a Google Analytics account
2. Get your tracking ID
3. Add this to `index.html` before `</head>`:

```html
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-GA-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR-GA-ID');
</script>
```

## 🎉 Sharing Your Dashboard

Update your README.md with the live link:

```markdown
## 🌐 Live Demo

**[View Interactive Dashboard](https://bdeland.github.io/bf6_guns/)**
```

Share on:
- Reddit
- Twitter
- Discord
- Gaming forums
- Your portfolio

## 🆘 Need Help?

- **GitHub Pages Docs**: https://pages.github.com/
- **GitHub Issues**: Open an issue in this repository
- **Community**: Ask in GitHub Discussions

## 🎊 Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled in Settings
- [ ] Dashboard accessible at GitHub Pages URL
- [ ] All tabs working correctly
- [ ] Charts rendering properly
- [ ] Data loading successfully
- [ ] Mobile-responsive design working
- [ ] Updated README with live link
- [ ] Shared with friends/community!

---

**Congratulations!** 🎉 Your interactive weapon statistics dashboard is now live!

Share your URL: `https://bdeland.github.io/bf6_guns/`

