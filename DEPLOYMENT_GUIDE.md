# 🚀 Deployment Guide - Production Setup

## 📋 Overview

This guide explains how to deploy your Caya Express Travels website with the Duffel flight search backend.

---

## ⚙️ What Was Fixed

### 1. **Environment-Aware API Configuration**
The frontend now automatically detects if it's running locally or in production:
- **Local Development**: Uses `http://localhost:3000`
- **Production**: Uses your deployed backend URL

### 2. **Backend Updates**
- ✅ CORS configured for production domains
- ✅ Server binds to `0.0.0.0` (all network interfaces)
- ✅ Ready for cloud deployment

---

## 🔧 Deployment Steps

### Step 1: Deploy Your Backend

Choose a hosting platform:

#### Option A: **Render.com** (Recommended - Free tier available)

1. Create account at [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repo or upload code
4. Configure:
   ```
   Name: caya-duffel-backend
   Environment: Node
   Build Command: npm install
   Start Command: node server.js
   ```
5. Add Environment Variables:
   ```
   DUFFEL_API_KEY=your_key_here
   EMAIL_USER=cayaexpresstravels@gmail.com
   EMAIL_PASSWORD=your_email_password
   PORT=3000
   ```
6. Click "Create Web Service"
7. **Copy your backend URL** (e.g., `https://caya-duffel-backend.onrender.com`)

#### Option B: **Railway.app**

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select backend folder
4. Add environment variables (same as above)
5. Copy your deployment URL

#### Option C: **Heroku**

1. Install Heroku CLI
2. ```bash
   cd caya-duffel-backend
   heroku create caya-backend
   heroku config:set DUFFEL_API_KEY=your_key
   git push heroku main
   ```

---

### Step 2: Update Frontend Configuration

1. Open `frontend/travel.html`
2. Find line ~947 (look for `API_BASE_URL`)
3. Update with your deployed backend URL:

```javascript
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'  // Local development
  : 'https://caya-duffel-backend.onrender.com';  // 👈 UPDATE THIS
```

**Example:**
```javascript
: 'https://caya-duffel-backend.onrender.com';  // Your Render URL
```

---

### Step 3: Deploy Frontend

Choose a hosting platform:

#### Option A: **Netlify** (Recommended)

1. Create account at [netlify.com](https://netlify.com)
2. Drag & drop your `frontend` folder
3. Your site is live! (e.g., `https://caya-travels.netlify.app`)

#### Option B: **Vercel**

1. Install Vercel CLI: `npm install -g vercel`
2. ```bash
   cd frontend
   vercel
   ```

#### Option C: **GitHub Pages**

1. Push code to GitHub
2. Settings → Pages → Deploy from branch

---

### Step 4: Update Backend CORS

1. Open `caya-duffel-backend/server.js`
2. Find the `allowedOrigins` array (line ~15)
3. Add your deployed frontend domain:

```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'https://caya-travels.netlify.app',      // 👈 ADD THIS
  'https://www.caya-travels.netlify.app'   // 👈 ADD THIS (with www)
];
```

4. Redeploy backend

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Visit your deployed website
- [ ] Open browser DevTools (F12) → Console
- [ ] You should see: `API Base URL: https://your-backend.com`
- [ ] Search for flights
- [ ] Verify prices display in Naira (₦)
- [ ] Check for errors in Console

### Expected Console Output:
```
API Base URL: https://caya-duffel-backend.onrender.com
Updated adults to 2 {adults: 2, children: 0, infants: 0}
```

### If You See Errors:

#### Error: "Failed to fetch"
- **Cause**: Backend not running or wrong URL
- **Fix**: Verify backend URL is correct in `travel.html`

#### Error: "CORS blocked"
- **Cause**: Your domain not in allowedOrigins
- **Fix**: Add your frontend domain to `server.js` CORS config

#### Error: "404 Not Found"
- **Cause**: Wrong endpoint URL
- **Fix**: Check backend routes match frontend calls

---

## 🔐 Security Notes

### Before Going Live:

1. **Enable Strict CORS** in `server.js`:
   ```javascript
   // Change this:
   callback(null, true); // Allow all for testing
   
   // To this:
   callback(new Error('Not allowed by CORS')); // Block unauthorized domains
   ```

2. **Never Commit Secrets**:
   - Keep `.env` file private
   - Don't push API keys to GitHub
   - Use environment variables in hosting platform

3. **HTTPS Only**:
   - Use HTTPS for both frontend and backend
   - Most hosting platforms provide this automatically

---

## 💡 Cost Estimation

### Free Tier Options:
- **Render**: 750 hours/month free
- **Netlify**: Unlimited bandwidth
- **Vercel**: 100 GB bandwidth/month

### Recommended for Production:
- **Backend**: Render (Starter $7/month for always-on)
- **Frontend**: Netlify (Free forever for static sites)

**Total Monthly Cost**: $7 or FREE if using free tiers

---

## 🆘 Troubleshooting

### Backend Won't Start
```bash
# Check logs:
# Render: Dashboard → Logs tab
# Railway: Click service → Logs
# Heroku: heroku logs --tail
```

### Frontend Can't Connect
1. Test backend directly:
   ```bash
   curl https://your-backend.com
   # Should return: {"message":"Duffel API Backend is running!"}
   ```

2. Check CORS in browser DevTools → Network tab

### Prices Not Showing in Naira
- Check console for JavaScript errors
- Verify API response contains flight data
- Ensure conversion logic executed (search for "USD_TO_NGN")

---

## 📞 Support

If you encounter issues:

1. Check browser console (F12)
2. Check backend logs
3. Verify environment variables are set
4. Test backend health endpoint: `https://your-backend.com/`

---

## 🎉 Success!

Once everything is working:
- ✅ Frontend loads without errors
- ✅ Flight search returns results
- ✅ Prices display in Nigerian Naira (₦)
- ✅ No "localhost" errors in production
- ✅ Reservation form submits successfully

Your flight booking website is now live! 🚀
