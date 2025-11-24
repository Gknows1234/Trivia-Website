# TriviaTrek Deployment Guide

## Overview

This guide covers deploying TriviaTrek frontend to Vercel and the backend API to Render or Railway.

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub repository with TriviaTrek code

### Step 1: Connect Repository to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select "Import Git Repository"
4. Connect your GitHub account and select the TriviaTrek repository
5. Click "Import"

### Step 2: Configure Build Settings

Vercel should auto-detect the following, but verify:

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 3: Set Environment Variables

In the Vercel project settings, add:

```
VITE_API_URL=https://your-api-domain.com
```

Replace `your-api-domain.com` with your actual backend URL (see Backend Deployment below).

### Step 4: Deploy

Click "Deploy" and wait for the build to complete. Your app will be available at a URL like `https://trivia-trek.vercel.app`.

### Subsequent Deployments

Any push to the main branch will automatically trigger a new deployment.

---

## Backend Deployment (Render)

### Prerequisites
- Render account (free at https://render.com)
- GitHub repository with TriviaTrek code

### Step 1: Create a New Web Service

1. Go to [render.com](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub account
4. Select the TriviaTrek repository
5. Click "Connect"

### Step 2: Configure Service

Fill in the following details:

- **Name**: `trivia-trek-api`
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Build Command**: `npm install`
- **Start Command**: `npm run start:api`

### Step 3: Set Environment Variables

No environment variables needed for basic setup, but you can add:

```
NODE_ENV=production
PORT=4000
```

### Step 4: Deploy

Click "Create Web Service" and wait for deployment. Your API will be available at a URL like `https://trivia-trek-api.onrender.com`.

### Important Notes for Render

- **Free tier limitations**: Services spin down after 15 minutes of inactivity
- **Data persistence**: JSON-Server stores data in memory; use a database for production
- **Seed data**: Upload your `db.json` file or use the API to populate data

---

## Backend Deployment (Railway)

### Prerequisites
- Railway account (free at https://railway.app)
- GitHub repository with TriviaTrek code

### Step 1: Create New Project

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect GitHub and select TriviaTrek repository

### Step 2: Configure Service

Railway auto-detects the configuration. Verify:

- **Build Command**: `npm install`
- **Start Command**: `npm run start:api`
- **Port**: `4000`

### Step 3: Set Environment Variables

In the Railway dashboard, add:

```
NODE_ENV=production
PORT=4000
```

### Step 4: Deploy

Railway automatically deploys on push. Your API will be available at a Railway-generated URL.

---

## Production Database Setup

For production, replace JSON-Server with a real database:

### Option 1: MongoDB Atlas (Recommended)

1. Create a MongoDB Atlas account (free tier available)
2. Create a cluster and database
3. Update your API to use MongoDB instead of JSON-Server
4. Store connection string in environment variables

### Option 2: PostgreSQL

1. Use Render's PostgreSQL add-on or Railway's Postgres service
2. Update API to use a Node.js ORM (Prisma, TypeORM, etc.)
3. Run migrations on deployment

### Option 3: Firebase

1. Create a Firebase project
2. Set up Firestore or Realtime Database
3. Update API to use Firebase SDK
4. Add Firebase credentials to environment variables

---

## Continuous Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      # Vercel deployment handled automatically
      # Render/Railway deployment handled automatically on push
```

---

## Monitoring & Maintenance

### Vercel Monitoring
- Check deployment logs in Vercel dashboard
- Set up error tracking with Sentry
- Monitor performance with Web Vitals

### Render/Railway Monitoring
- Check service logs in dashboard
- Set up uptime monitoring
- Monitor API response times

### Health Checks

Add a health check endpoint to your API:

```typescript
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() })
})
```

---

## Troubleshooting

### Frontend Issues

**Build fails on Vercel:**
- Check Node version compatibility
- Verify environment variables are set
- Check build logs for specific errors

**API calls fail in production:**
- Verify `VITE_API_URL` environment variable
- Check CORS settings on backend
- Ensure backend is running and accessible

### Backend Issues

**Service won't start:**
- Check start command is correct
- Verify `db.json` exists and is valid JSON
- Check port is not already in use

**Data not persisting:**
- JSON-Server stores data in memory; restart clears data
- Implement database for production
- Use seed data on each deployment

---

## Rollback Procedure

### Vercel
1. Go to Deployments tab
2. Find previous successful deployment
3. Click "Redeploy"

### Render/Railway
1. Go to Deployment History
2. Select previous deployment
3. Click "Redeploy"

---

## Performance Optimization

### Frontend
- Enable Gzip compression (automatic on Vercel)
- Use CDN for static assets
- Implement code splitting
- Monitor Core Web Vitals

### Backend
- Use caching headers
- Implement rate limiting
- Use database indexes
- Monitor query performance

---

## Security Checklist

- [ ] Environment variables not committed to git
- [ ] HTTPS enabled (automatic on Vercel/Render/Railway)
- [ ] CORS properly configured
- [ ] Input validation implemented
- [ ] Rate limiting enabled
- [ ] Sensitive data not logged
- [ ] Dependencies kept up to date
- [ ] Security headers configured

---

## Support

For deployment issues:
- Vercel Support: https://vercel.com/support
- Render Support: https://render.com/docs
- Railway Support: https://railway.app/docs

---

**Last Updated**: January 2024
