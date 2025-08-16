# 🚀 Deployment Checklist

## Pre-deployment ✅

- [x] Code optimized with lazy loading
- [x] Bundle size optimized with code splitting
- [x] Mobile responsiveness tested
- [x] Production build works locally
- [x] Environment variables configured
- [x] SEO meta tags added
- [x] Performance optimizations applied

## Vercel Deployment (Frontend)

### 1. Repository Setup

- [x] Code pushed to GitHub
- [x] Branch: `main`

### 2. Vercel Configuration

- [ ] Connect GitHub repo to Vercel
- [ ] Framework preset: **Vite**
- [ ] Root directory: `frontend`
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`

### 3. Environment Variables

- [ ] `VITE_API_URL`: Backend URL (will get from Render)

### 4. Domain (Optional)

- [ ] Custom domain configured
- [ ] DNS records updated

## Render Deployment (Backend)

### 1. Service Creation

- [ ] Connect GitHub repo to Render
- [ ] Service type: **Web Service**
- [ ] Root directory: `backend`
- [ ] Runtime: **Node.js**

### 2. Build Settings

- [ ] Build command: `npm install`
- [ ] Start command: `npm start`

### 3. Environment Variables

- [ ] `MONGODB_URI`: MongoDB Atlas connection string
- [ ] `NOTION_API_KEY`: Notion integration token
- [ ] `NOTION_DATABASE_ID`: Notion database ID
- [ ] `EMAIL_USER`: SMTP email username
- [ ] `EMAIL_PASS`: SMTP email password
- [ ] `NODE_ENV`: `production`

## Post-deployment Verification

### Backend (Render)

- [ ] Service is live and running
- [ ] Health check: `https://your-backend.onrender.com/health`
- [ ] API endpoints responding
- [ ] MongoDB connection working
- [ ] Logs show no errors

### Frontend (Vercel)

- [ ] Site loads successfully
- [ ] All pages accessible
- [ ] API calls working (update VITE_API_URL if needed)
- [ ] Mobile responsive
- [ ] Performance good

### Integration Testing

- [ ] Word cloud submission works
- [ ] Project voting works
- [ ] Contact form sends emails
- [ ] Blog loads articles
- [ ] Events page displays correctly

## Final Steps

- [ ] Share live URLs with team
- [ ] Monitor initial traffic
- [ ] Set up monitoring/alerts (optional)
- [ ] Update documentation with live URLs

## URLs to Save

- Frontend: `https://your-project.vercel.app`
- Backend: `https://your-project.onrender.com`
- Admin panel: `https://your-project.onrender.com/health`

## Emergency Contacts

- GitHub: https://github.com/visarutforthaipbs/pi-new-website-2025
- Support: pi.thaipbs@gmail.com
