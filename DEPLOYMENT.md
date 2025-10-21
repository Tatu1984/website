# Deployment Guide for www.infinititechpartners.com

## HRMS Integration Complete ✓

The website now includes:
- **HRMS Login Button** in the navigation bar (top right)
- **Login Page** at `/hrms/login`
- **Dashboard** at `/hrms/dashboard` (placeholder - needs real HRMS API integration)
- **Authentication API** at `/api/hrms/auth/login`

---

## Deployment Options

### Option 1: Vercel (Recommended for Next.js)

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Configure Custom Domain**:
   - Go to your Vercel project dashboard
   - Navigate to Settings → Domains
   - Add `www.infinititechpartners.com` and `infinititechpartners.com`
   - Update your DNS settings:
     - Add A record pointing to Vercel's IP: `76.76.21.21`
     - Add CNAME record for `www` pointing to `cname.vercel-dns.com`

5. **Environment Variables**:
   - Add in Vercel dashboard under Settings → Environment Variables:
     - `NEXT_PUBLIC_SANITY_PROJECT_ID` = nwa9weet
     - `NEXT_PUBLIC_SANITY_DATASET` = production
     - Add your HRMS API credentials when ready

---

### Option 2: Netlify

1. **Install Netlify CLI**:
   ```bash
   npm i -g netlify-cli
   ```

2. **Login**:
   ```bash
   netlify login
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   ```bash
   netlify deploy --prod
   ```

5. **Configure Custom Domain**:
   - Go to Site settings → Domain management
   - Add custom domain: `www.infinititechpartners.com`
   - Follow DNS configuration instructions

---

### Option 3: Custom Server (VPS/AWS/DigitalOcean)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Start production server**:
   ```bash
   npm start
   ```

3. **Use PM2 for process management**:
   ```bash
   npm i -g pm2
   pm2 start npm --name "infinititech" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx as reverse proxy**:
   ```nginx
   server {
       listen 80;
       server_name infinititechpartners.com www.infinititechpartners.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Set up SSL with Certbot**:
   ```bash
   sudo certbot --nginx -d infinititechpartners.com -d www.infinititechpartners.com
   ```

---

## DNS Configuration

For any hosting provider, update your domain DNS settings at your domain registrar:

### A Records:
```
Type: A
Name: @
Value: [Your hosting provider's IP]
TTL: 3600
```

### CNAME Records:
```
Type: CNAME
Name: www
Value: [Your hosting provider's domain]
TTL: 3600
```

---

## HRMS API Integration (TODO)

The current implementation uses placeholder authentication. To connect to your real HRMS:

1. **Update API route** (`app/api/hrms/auth/login/route.ts`):
   ```typescript
   // Replace the mock authentication with your HRMS API
   const hrmsResponse = await fetch('YOUR_HRMS_API_URL/auth/login', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ email, password }),
   });
   ```

2. **Add environment variables**:
   ```
   HRMS_API_URL=https://your-hrms-api.com
   HRMS_API_KEY=your-api-key
   JWT_SECRET=your-secret-key
   ```

3. **Implement proper JWT token handling**:
   - Generate secure JWT tokens
   - Store tokens securely (httpOnly cookies recommended)
   - Implement token refresh mechanism
   - Add middleware for protected routes

4. **Connect dashboard to real data**:
   - Fetch employee data from HRMS API
   - Implement attendance tracking
   - Connect leave management
   - Display real payroll information

---

## Pre-Deployment Checklist

- [ ] Update Sanity project ID and dataset if needed
- [ ] Configure HRMS API credentials
- [ ] Test HRMS login flow
- [ ] Set up proper error handling
- [ ] Configure security headers
- [ ] Enable HTTPS
- [ ] Set up monitoring and analytics
- [ ] Test on mobile devices
- [ ] Configure CORS if needed
- [ ] Set up backup strategy

---

## Build Command

```bash
npm run build
```

## Start Command

```bash
npm start
```

## Environment Variables Required

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=nwa9weet
NEXT_PUBLIC_SANITY_DATASET=production

# HRMS (Add when ready)
HRMS_API_URL=
HRMS_API_KEY=
JWT_SECRET=

# Optional
NODE_ENV=production
```

---

## Support

For deployment issues, contact:
- Vercel: https://vercel.com/support
- Netlify: https://www.netlify.com/support/
- Next.js: https://nextjs.org/docs

For HRMS integration help, ensure you have:
- HRMS API documentation
- Authentication credentials
- API endpoint URLs
