#!/usr/bin/env pwsh
# Caya Express Travels - Deployment Helper Script
# This script helps you deploy your backend to Render.com

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  CAYA EXPRESS TRAVELS - DEPLOYMENT HELPER" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if we have the necessary files
Write-Host "📋 Step 1: Checking backend files..." -ForegroundColor Green
$backendPath = "c:\Users\Angel\Desktop\CA\caya-duffel-backend"

if (Test-Path "$backendPath\server.js") {
    Write-Host "  ✓ server.js found" -ForegroundColor Green
} else {
    Write-Host "  ✗ server.js NOT found" -ForegroundColor Red
    exit 1
}

if (Test-Path "$backendPath\package.json") {
    Write-Host "  ✓ package.json found" -ForegroundColor Green
} else {
    Write-Host "  ✗ package.json NOT found" -ForegroundColor Red
    exit 1
}

if (Test-Path "$backendPath\.env") {
    Write-Host "  ✓ .env file found" -ForegroundColor Green
} else {
    Write-Host "  ⚠ .env file NOT found (you'll need to set environment variables manually)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT OPTIONS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "Choose your deployment method:" -ForegroundColor White
Write-Host ""
Write-Host "1. Render.com (RECOMMENDED - Easiest, Free tier available)" -ForegroundColor Cyan
Write-Host "   - Sign up at https://render.com" -ForegroundColor Gray
Write-Host "   - Click 'New +' → 'Web Service'" -ForegroundColor Gray
Write-Host "   - Deploy from GitHub or upload code" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Railway.app (Easy, Free trial)" -ForegroundColor Cyan
Write-Host "   - Sign up at https://railway.app" -ForegroundColor Gray
Write-Host "   - Click 'New Project' → 'Deploy from GitHub'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Heroku (Classic, requires credit card)" -ForegroundColor Cyan
Write-Host "   - Requires Heroku CLI" -ForegroundColor Gray
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "For RENDER.COM deployment:" -ForegroundColor Green
Write-Host ""
Write-Host "1. Go to: https://render.com" -ForegroundColor White
Write-Host "2. Sign up/Login" -ForegroundColor White
Write-Host "3. Click 'New +' → 'Web Service'" -ForegroundColor White
Write-Host "4. Choose deployment method:" -ForegroundColor White
Write-Host ""
Write-Host "   OPTION A - GitHub (Recommended):" -ForegroundColor Cyan
Write-Host "   - Push your code to GitHub first" -ForegroundColor Gray
Write-Host "   - Connect your GitHub repo" -ForegroundColor Gray
Write-Host "   - Select repository and branch" -ForegroundColor Gray
Write-Host ""
Write-Host "   OPTION B - Manual Upload:" -ForegroundColor Cyan
Write-Host "   - Zip the caya-duffel-backend folder" -ForegroundColor Gray
Write-Host "   - Upload to Render" -ForegroundColor Gray
Write-Host ""
Write-Host "5. Configure settings:" -ForegroundColor White
Write-Host "   Name: caya-duffel-backend" -ForegroundColor Gray
Write-Host "   Environment: Node" -ForegroundColor Gray
Write-Host "   Build Command: npm install" -ForegroundColor Gray
Write-Host "   Start Command: node server.js" -ForegroundColor Gray
Write-Host ""
Write-Host "6. Add Environment Variables (IMPORTANT!):" -ForegroundColor Yellow
Write-Host "   DUFFEL_API_KEY = your_duffel_key" -ForegroundColor Gray
Write-Host "   EMAIL_USER = cayaexpresstravels@gmail.com" -ForegroundColor Gray
Write-Host "   EMAIL_PASSWORD = your_email_password" -ForegroundColor Gray
Write-Host ""
Write-Host "7. Click 'Create Web Service'" -ForegroundColor White
Write-Host "8. Wait 2-5 minutes for deployment" -ForegroundColor White
Write-Host "9. Copy your backend URL (e.g., https://caya-duffel-backend.onrender.com)" -ForegroundColor Yellow
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 WRITE DOWN YOUR BACKEND URL:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   https://___________________________.onrender.com" -ForegroundColor White
Write-Host ""
Write-Host "You'll need this URL to update your frontend!" -ForegroundColor Yellow
Write-Host ""

Write-Host "Press any key to see frontend deployment instructions..." -ForegroundColor Cyan
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  FRONTEND DEPLOYMENT (Netlify)" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Go to: https://netlify.com" -ForegroundColor White
Write-Host "2. Sign up/Login" -ForegroundColor White
Write-Host "3. Click 'Add new site' → 'Deploy manually'" -ForegroundColor White
Write-Host "4. Drag and drop your ENTIRE 'frontend' folder" -ForegroundColor Yellow
Write-Host "5. Wait 30 seconds" -ForegroundColor White
Write-Host "6. Copy your frontend URL (e.g., https://caya-travels.netlify.app)" -ForegroundColor Yellow
Write-Host ""
Write-Host "📝 WRITE DOWN YOUR FRONTEND URL:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   https://___________________________.netlify.app" -ForegroundColor White
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  AFTER DEPLOYMENT" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Run this script to update your configuration:" -ForegroundColor White
Write-Host ""
Write-Host "  .\update-deployment-urls.ps1" -ForegroundColor Cyan
Write-Host ""
Write-Host "It will ask for your backend and frontend URLs and update everything!" -ForegroundColor Green
Write-Host ""

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  DONE!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "Need help? Check DEPLOY_NOW.md for detailed instructions." -ForegroundColor Yellow
Write-Host ""
