# Deployment Guide

This project consists of a React frontend (Vite) and Node.js backend (Express), designed to be deployed on Vercel (frontend) and Render (backend).

## Architecture

- **Frontend**: React + Vite → Vercel
- **Backend**: Node.js + Express → Render
- **Database**: MongoDB Atlas
- **Features**: Word Cloud, Budget Transparency, Contact Form, Project Showcase

## Frontend Deployment (Vercel)

### Prerequisites

1. GitHub account with this repository
2. Vercel account linked to GitHub

### Steps

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Set these environment variables:
     - `VITE_API_URL` = `https://your-backend-url.onrender.com`
   - Deploy

3. **Custom Domain (Optional)**:
   - Add your custom domain in Vercel project settings
   - Update DNS records as instructed

## Backend Deployment (Render)

### Prerequisites

1. Render account
2. MongoDB Atlas account with the provided connection string

### Steps

1. **Deploy on Render**:
   - Go to [render.com](https://render.com)
   - Click "New Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Root Directory**: `backend`
2. **Environment Variables** (Set in Render dashboard):

   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://visarutforthaipbs:SVkplsPIzJVD1A9M@pi-website-wordcould.9cgfpj5.mongodb.net/?retryWrites=true&w=majority&appName=pi-website-wordcould
   NOTION_API_KEY=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
   NOTION_DATABASE_ID=24e85b60e2a780988192cc3b3ab25fdf
   PORT=3001
   ```

3. **Update Frontend Config**:
   - After backend is deployed, update `VITE_API_URL` in Vercel with your Render URL
   - Redeploy frontend

## Database Setup

### MongoDB Atlas

- ✅ Already configured with connection string
- ✅ Collections: `wordcloud`, `project_votes`
- ✅ Sample data will be seeded automatically

## Environment Variables Summary

### Frontend (.env.local)

```bash
VITE_API_URL=https://your-backend-app.onrender.com
```

### Backend (Render Environment Variables)

```bash
NODE_ENV=production
MONGODB_URI=mongodb+srv://visarutforthaipbs:SVkplsPIzJVD1A9M@pi-website-wordcould.9cgfpj5.mongodb.net/?retryWrites=true&w=majority&appName=pi-website-wordcould
NOTION_API_KEY=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
NOTION_DATABASE_ID=24e85b60e2a780988192cc3b3ab25fdf
PORT=3001
```

## API Endpoints

- `GET /api/projects` - Notion projects
- `GET /api/wordclouds` - Word cloud data
- `POST /api/wordclouds` - Submit word
- `POST /api/contact` - Contact form
- `GET /health` - Health check

## Features

### ✅ Word Cloud

- Interactive Thai word visualization
- MongoDB storage
- Real-time updates

### ✅ Budget Transparency

- CSV-based budget data (2568 fiscal year)
- Thai Baht formatting
- Responsive tables

### ✅ Contact Form

- Email notifications
- Form validation
- Success/error handling

### ✅ Project Showcase

- Notion CMS integration
- Project voting system
- Responsive gallery

## Post-Deployment Checklist

1. ✅ Backend health check: `https://your-backend.onrender.com/health`
2. ✅ Word cloud functionality
3. ✅ Contact form submissions
4. ✅ Budget page displays correctly
5. ✅ Project voting works
6. ✅ All API endpoints respond correctly

## Troubleshooting

### Common Issues

- **CORS errors**: Ensure backend CORS is configured for your Vercel domain
- **API connection**: Verify `VITE_API_URL` matches your Render deployment
- **MongoDB connection**: Check connection string and IP whitelist
- **Build failures**: Check Node.js versions match (18.17.0)

### Logs

- **Vercel**: Function logs in Vercel dashboard
- **Render**: Server logs in Render dashboard
- **MongoDB**: Atlas monitoring for connection issues
