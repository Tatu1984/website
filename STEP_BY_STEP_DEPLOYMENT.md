# Step-by-Step Deployment Guide
## Deploy www.infinititechpartners.com to Production

---

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] Domain purchased: `infinititechpartners.com`
- [ ] Access to domain DNS settings (GoDaddy, Namecheap, etc.)
- [ ] GitHub account (for code hosting)
- [ ] This codebase ready

---

## Method 1: Deploy with Vercel (RECOMMENDED - Easiest & Free)

### Why Vercel?
- Built specifically for Next.js (your framework)
- Automatic HTTPS/SSL
- Free tier available
- Automatic deployments on code changes
- Global CDN
- Zero configuration needed

---

### Step 1: Push Code to GitHub

**1.1. Create a GitHub Account (if you don't have one)**
   - Go to https://github.com/signup
   - Create an account

**1.2. Create a New Repository**
   - Go to https://github.com/new
   - Repository name: `infinititech-website`
   - Keep it Private (recommended) or Public
   - Click "Create repository"

**1.3. Push Your Code to GitHub**

Open Terminal in your project directory and run these commands:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit - Ready for deployment"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your GitHub username
git remote add origin https://github.com/YOUR_USERNAME/infinititech-website.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** If you get an authentication error, you may need to create a Personal Access Token:
- Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Generate new token with `repo` scope
- Use the token as your password when pushing

---

### Step 2: Deploy to Vercel

**2.1. Create Vercel Account**
   - Go to https://vercel.com/signup
   - Click "Continue with GitHub"
   - Authorize Vercel to access your GitHub account

**2.2. Import Your Project**
   - Click "Add New..." → "Project"
   - You'll see your GitHub repositories
   - Find `infinititech-website` and click "Import"

**2.3. Configure Project Settings**
   - **Project Name:** `infinititech-partners` (or your choice)
   - **Framework Preset:** Next.js (should auto-detect)
   - **Root Directory:** `./` (leave as default)
   - **Build Command:** `npm run build` (auto-filled)
   - **Output Directory:** `.next` (auto-filled)
   - **Install Command:** `npm install` (auto-filled)

**2.4. Add Environment Variables**
   - Click "Environment Variables"
   - Add these variables:

   ```
   Name: NEXT_PUBLIC_SANITY_PROJECT_ID
   Value: nwa9weet

   Name: NEXT_PUBLIC_SANITY_DATASET
   Value: production
   ```

   - Click "Add" for each variable

**2.5. Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for deployment (you'll see progress)
   - Once done, you'll get a URL like: `infinititech-partners.vercel.app`

**2.6. Test Your Deployment**
   - Click "Visit" to open your deployed site
   - Test the HRMS login button
   - Navigate through all pages
   - Verify everything works

---

### Step 3: Connect Your Custom Domain

**3.1. Add Domain in Vercel**
   - In your Vercel project dashboard
   - Go to "Settings" tab
   - Click "Domains" in the left sidebar
   - Click "Add"
   - Enter: `infinititechpartners.com`
   - Click "Add"
   - Also add: `www.infinititechpartners.com`
   - Click "Add"

**3.2. Get DNS Configuration Details**

Vercel will show you DNS records to add. You'll see something like:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Keep this page open** - you'll need these values in the next step.

---

### Step 4: Configure DNS at Your Domain Registrar

**For GoDaddy:**

**4.1. Login to GoDaddy**
   - Go to https://www.godaddy.com
   - Sign in to your account

**4.2. Access DNS Management**
   - Click "My Products"
   - Find `infinititechpartners.com`
   - Click "DNS" or "Manage DNS"

**4.3. Add A Record**
   - Click "Add" or "Add Record"
   - Type: `A`
   - Name: `@` (or leave blank)
   - Value: `76.76.21.21` (Vercel's IP)
   - TTL: `600` (or 1 hour)
   - Click "Save"

**4.4. Add CNAME Record**
   - Click "Add" or "Add Record"
   - Type: `CNAME`
   - Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `600` (or 1 hour)
   - Click "Save"

**4.5. Remove Conflicting Records (Important!)**
   - Look for any existing A or CNAME records for `@` or `www`
   - Delete the old ones (especially parking pages)
   - Keep only the new records you just added

---

**For Namecheap:**

**4.1. Login to Namecheap**
   - Go to https://www.namecheap.com
   - Sign in

**4.2. Access Advanced DNS**
   - Go to "Domain List"
   - Click "Manage" next to `infinititechpartners.com`
   - Go to "Advanced DNS" tab

**4.3. Add A Record**
   - Click "Add New Record"
   - Type: `A Record`
   - Host: `@`
   - Value: `76.76.21.21`
   - TTL: `Automatic`
   - Click "Save"

**4.4. Add CNAME Record**
   - Click "Add New Record"
   - Type: `CNAME Record`
   - Host: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `Automatic`
   - Click "Save"

**4.5. Remove Parking Page**
   - Delete any existing records that point to parking pages
   - Remove any URL Redirect Records

---

**For Cloudflare:**

**4.1. Login to Cloudflare**
   - Go to https://cloudflare.com
   - Sign in

**4.2. Select Your Domain**
   - Click on `infinititechpartners.com`

**4.3. Go to DNS Settings**
   - Click "DNS" in the top menu

**4.4. Add A Record**
   - Click "Add record"
   - Type: `A`
   - Name: `@`
   - IPv4 address: `76.76.21.21`
   - Proxy status: `DNS only` (turn off orange cloud)
   - Click "Save"

**4.5. Add CNAME Record**
   - Click "Add record"
   - Type: `CNAME`
   - Name: `www`
   - Target: `cname.vercel-dns.com`
   - Proxy status: `DNS only` (turn off orange cloud)
   - Click "Save"

---

### Step 5: Wait for DNS Propagation

**5.1. Understanding DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours to propagate worldwide
   - Usually takes 15-30 minutes for most users

**5.2. Check Propagation Status**
   - Go to: https://dnschecker.org
   - Enter: `infinititechpartners.com`
   - Click "Search"
   - You should see `76.76.21.21` for A records worldwide
   - Green checkmarks mean it's propagated in that region

**5.3. Verify in Vercel**
   - Go back to Vercel → Your Project → Settings → Domains
   - Wait until you see a green checkmark next to your domain
   - This means SSL certificate is issued and domain is ready

---

### Step 6: Test Your Live Website

**6.1. Visit Your Website**
   - Open a browser
   - Go to: `https://www.infinititechpartners.com`
   - Also test: `https://infinititechpartners.com`
   - Both should work and redirect to HTTPS automatically

**6.2. Test All Features**
   - [ ] Homepage loads correctly
   - [ ] Navigation works (About, Services, Portfolio, Team, Contact)
   - [ ] Scroll animations work
   - [ ] Cursor follower effect works
   - [ ] HRMS Login button is visible
   - [ ] Click HRMS Login → Login page loads
   - [ ] Try logging in with any credentials
   - [ ] Dashboard loads after login
   - [ ] All dashboard cards are visible
   - [ ] Logout button works

**6.3. Test on Different Devices**
   - Desktop browser
   - Mobile phone
   - Tablet
   - Different browsers (Chrome, Firefox, Safari)

---

### Step 7: Set Up Automatic Deployments

**7.1. How It Works**
   - Every time you push code to GitHub, Vercel automatically deploys
   - No manual deployment needed

**7.2. Make a Test Change**
   ```bash
   # In your local project
   # Make a small change to any file

   # Commit and push
   git add .
   git commit -m "Test automatic deployment"
   git push
   ```

**7.3. Watch Deployment**
   - Go to Vercel dashboard
   - Click on your project
   - You'll see a new deployment starting
   - Wait for it to complete
   - Your live site updates automatically!

---

## Method 2: Deploy with Netlify (Alternative)

### Step 1: Build Your Project

```bash
# In your project directory
npm run build
```

### Step 2: Deploy to Netlify

**2.1. Install Netlify CLI**
```bash
npm install -g netlify-cli
```

**2.2. Login to Netlify**
```bash
netlify login
```
- This opens a browser
- Click "Authorize"

**2.3. Initialize and Deploy**
```bash
# Initialize
netlify init

# Follow prompts:
# - Create & configure a new site
# - Team: Select your team
# - Site name: infinititech-partners
# - Build command: npm run build
# - Directory: .next
# - Deploy: Yes

# Deploy to production
netlify deploy --prod
```

**2.4. Add Custom Domain**
- Go to https://app.netlify.com
- Select your site
- Go to "Domain settings"
- Click "Add custom domain"
- Enter: `infinititechpartners.com`
- Follow DNS instructions (similar to Vercel)

---

## Troubleshooting Common Issues

### Issue 1: "Domain Not Found" or 404 Error

**Solution:**
- DNS not propagated yet - wait 1-2 hours
- Check DNS records are correct in your domain registrar
- Use https://dnschecker.org to verify propagation

---

### Issue 2: "Certificate Error" or "Not Secure"

**Solution:**
- Wait for SSL certificate to be issued (takes 5-10 minutes)
- In Vercel, check Settings → Domains
- Look for green checkmark next to domain
- If stuck, try removing and re-adding domain

---

### Issue 3: Website Shows Vercel/Netlify Domain Instead

**Solution:**
- Add both `www` and non-www versions of domain
- Set primary domain in hosting settings
- Force HTTPS redirect

---

### Issue 4: HRMS Login Not Working

**Solution:**
- Check browser console for errors (F12 → Console)
- Verify API route is deployed: `yoursite.com/api/hrms/auth/login`
- Check environment variables are set in Vercel/Netlify

---

### Issue 5: "Build Failed" Error

**Solution:**
```bash
# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps

# Try build locally
npm run build

# If successful, commit and push
git add .
git commit -m "Fix build"
git push
```

---

## Post-Deployment Checklist

After deployment, verify:

- [ ] `infinititechpartners.com` loads (with HTTPS)
- [ ] `www.infinititechpartners.com` loads (with HTTPS)
- [ ] Both redirect to HTTPS automatically
- [ ] All pages load correctly
- [ ] Images and assets load
- [ ] HRMS login button visible
- [ ] HRMS login page works
- [ ] HRMS dashboard accessible after login
- [ ] Mobile responsive design works
- [ ] Cursor follower effect works
- [ ] Animations and transitions work
- [ ] Contact form works (if applicable)
- [ ] No console errors (check F12 → Console)

---

## Performance Optimization (Optional)

### Enable Analytics

**Vercel Analytics:**
1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable Vercel Analytics
4. Free tier includes basic metrics

**Google Analytics:**
1. Create account at https://analytics.google.com
2. Get tracking ID
3. Add to your website code

---

### Enable Speed Insights

**Vercel Speed Insights:**
1. Install package:
   ```bash
   npm install @vercel/speed-insights
   ```

2. Add to `app/layout.tsx`:
   ```typescript
   import { SpeedInsights } from "@vercel/speed-insights/next"

   // Add in body:
   <SpeedInsights />
   ```

3. Commit and push

---

## Monitoring and Maintenance

### Set Up Monitoring

**Vercel:**
- Automatic error tracking
- Performance monitoring
- Deployment notifications

**External Tools:**
- UptimeRobot (https://uptimerobot.com) - Free uptime monitoring
- Google Search Console - SEO monitoring
- PageSpeed Insights - Performance testing

---

### Regular Maintenance Tasks

**Weekly:**
- [ ] Check website is loading
- [ ] Test HRMS login
- [ ] Check for errors in Vercel dashboard

**Monthly:**
- [ ] Update dependencies: `npm update`
- [ ] Check and update content in Sanity CMS
- [ ] Review analytics

**Quarterly:**
- [ ] Security audit
- [ ] Performance review
- [ ] Backup configuration

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Deploy to Vercel
vercel --prod

# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Rollback deployment (if needed)
vercel rollback
```

---

## Getting Help

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions
- Twitter: @vercel

**Next.js Support:**
- Documentation: https://nextjs.org/docs
- Community: https://github.com/vercel/next.js/discussions

**Your Domain Registrar:**
- GoDaddy: https://www.godaddy.com/help
- Namecheap: https://www.namecheap.com/support
- Cloudflare: https://support.cloudflare.com

---

## Success! 🎉

Once you see your website live at `https://www.infinititechpartners.com`, you're done!

Your website is:
✅ Live and accessible worldwide
✅ Secured with HTTPS/SSL
✅ Automatically deployed on code changes
✅ Ready for HRMS integration
✅ Fast and optimized with CDN

---

## Next Steps After Deployment

1. **Connect Real HRMS API**
   - Update `app/api/hrms/auth/login/route.ts`
   - Add your HRMS API credentials
   - Test authentication flow

2. **SEO Optimization**
   - Submit to Google Search Console
   - Create sitemap
   - Add meta descriptions

3. **Marketing**
   - Share website link
   - Update social media profiles
   - Set up business email

Congratulations on your deployment! 🚀
