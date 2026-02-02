# 🚀 LET'S DEPLOY YOUR WEBSITE NOW!

Follow these steps carefully. I'll guide you through each one.

---

## 📦 STEP 1: Deploy Backend to Render.com (FREE)

### 1.1 Create Render Account
1. Go to https://render.com
2. Click **"Get Started for Free"**
3. Sign up with GitHub (recommended) or email

### 1.2 Prepare Backend for Deployment
First, we need to create a few files in your backend folder:

**I'll create these files for you automatically below.**

### 1.3 Deploy on Render
1. After signing in to Render, click **"New +"** (top right)
2. Select **"Web Service"**
3. Choose **"Build and deploy from a Git repository"**
4. If you don't have GitHub repo yet:
   - Click **"Public Git repository"**
   - Enter: `https://github.com/yourusername/caya-backend` (we'll skip this)
   - OR click **"Deploy from local code"** if available
   
**EASIEST METHOD - Manual Upload:**
5. Instead, let's use Render's manual upload:
   - After clicking "New +", select **"Web Service"**
   - Choose **"Deploy from GitHub"** then click **"Configure account"**
   - OR use Render's CLI (I'll help you below)

### 1.4 Configure Service Settings
When prompted, enter:
- **Name**: `caya-duffel-backend`
- **Region**: Choose closest to Nigeria (e.g., Frankfurt)
- **Branch**: `main` (if using Git)
- **Root Directory**: `caya-duffel-backend`
- **Environment**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `node server.js`

### 1.5 Add Environment Variables
Click **"Advanced"** then add these environment variables:

```
DUFFEL_API_KEY = your_actual_duffel_key_here
EMAIL_USER = cayaexpresstravels@gmail.com
EMAIL_PASSWORD = your_email_app_password
PORT = 3000
```

⚠️ **IMPORTANT**: Use your real Duffel API key!

### 1.6 Deploy
1. Click **"Create Web Service"**
2. Wait 2-5 minutes for deployment
3. You'll get a URL like: `https://caya-duffel-backend.onrender.com`

**📋 COPY THIS URL - YOU'LL NEED IT!**

---

## 📦 STEP 2: Update Frontend Configuration

Once you have your backend URL:

1. Open `frontend/travel.html`
2. Go to **line 950**
3. Find this line:
   ```javascript
   : 'https://your-backend-url.com';  // Production - UPDATE THIS
   ```
4. Replace with YOUR backend URL:
   ```javascript
   : 'https://caya-duffel-backend.onrender.com';
   ```

**I can do this automatically - just tell me your backend URL!**

---

## 📦 STEP 3: Deploy Frontend to Netlify (FREE & EASIEST)

### 3.1 Create Netlify Account
1. Go to https://netlify.com
2. Click **"Sign up"**
3. Use GitHub, GitLab, or email

### 3.2 Deploy Your Site (Drag & Drop Method)
1. After signing in, click **"Add new site"**
2. Choose **"Deploy manually"**
3. Drag your **entire `frontend` folder** onto the upload area
4. Wait 30 seconds
5. Done! You'll get a URL like: `https://random-name-123.netlify.app`

### 3.3 Customize Your URL (Optional)
1. In Netlify dashboard, go to **Site settings**
2. Click **"Change site name"**
3. Enter: `caya-travels` (if available)
4. Your new URL: `https://caya-travels.netlify.app`

**📋 COPY THIS URL - YOU'LL NEED IT!**

---

## 📦 STEP 4: Update Backend CORS

Now that you have your frontend URL, update backend:

1. Open `caya-duffel-backend/server.js`
2. Find **line 21** (allowedOrigins array)
3. Add your frontend URL:
   ```javascript
   const allowedOrigins = [
     'http://localhost:3000',
     'http://127.0.0.1:3000',
     'http://localhost:5500',
     'http://127.0.0.1:5500',
     'https://caya-travels.netlify.app',      // ADD THIS
     'https://www.caya-travels.netlify.app'   // ADD THIS TOO
   ];
   ```

4. **Redeploy backend** on Render:
   - Go to your service dashboard
   - Click **"Manual Deploy"** → **"Deploy latest commit"**

**I can update this file for you - just tell me your frontend URL!**

---

## 📦 STEP 5: Test Everything

### 5.1 Visit Your Live Website
Go to: `https://caya-travels.netlify.app` (your actual URL)

### 5.2 Open Browser Console
1. Press **F12**
2. Go to **Console** tab
3. You should see: `API Base URL: https://caya-duffel-backend.onrender.com`

### 5.3 Test Flight Search
1. Fill in flight details
2. Click **Search Flights**
3. Prices should display in Nigerian Naira (₦)

### 5.4 Check for Errors
- No "Failed to fetch" errors ✅
- No CORS errors ✅
- Flights load successfully ✅

---

## 🆘 TROUBLESHOOTING

### "Failed to fetch" error
- Check: Is backend URL correct in travel.html line 950?
- Check: Is backend actually running on Render?
- Test: Visit `https://your-backend.com` directly - should show JSON

### "CORS blocked" error
- Check: Did you add frontend URL to server.js?
- Check: Did you redeploy backend after CORS update?

### Backend not starting on Render
- Check: Environment variables set correctly?
- Check: DUFFEL_API_KEY is valid?
- View Render logs for error messages

---

## 📞 TELL ME:

To complete your deployment, I need:

1. **What's your Duffel API key?** (I'll set it as environment variable)
2. **Do you want to use GitHub or manual upload?**

Then I can:
- ✅ Create necessary deployment files
- ✅ Guide you through Render setup
- ✅ Update all URLs automatically
- ✅ Get your site live in 15 minutes!

**Ready? Let's do this! 🚀**
