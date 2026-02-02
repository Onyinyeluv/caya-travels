#!/usr/bin/env pwsh
# Update deployment URLs automatically

Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  DEPLOYMENT URL UPDATER" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Get Backend URL
Write-Host "Enter your BACKEND URL from Render:" -ForegroundColor Yellow
Write-Host "(Example: https://caya-duffel-backend.onrender.com)" -ForegroundColor Gray
Write-Host ""
$backendUrl = Read-Host "Backend URL"

if ([string]::IsNullOrWhiteSpace($backendUrl)) {
    Write-Host "❌ Backend URL cannot be empty!" -ForegroundColor Red
    exit 1
}

# Get Frontend URL
Write-Host ""
Write-Host "Enter your FRONTEND URL from Netlify:" -ForegroundColor Yellow
Write-Host "(Example: https://caya-travels.netlify.app)" -ForegroundColor Gray
Write-Host ""
$frontendUrl = Read-Host "Frontend URL"

if ([string]::IsNullOrWhiteSpace($frontendUrl)) {
    Write-Host "❌ Frontend URL cannot be empty!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  UPDATING FILES..." -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Update frontend/travel.html
$travelHtmlPath = "c:\Users\Angel\Desktop\CA\frontend\travel.html"
Write-Host "1. Updating frontend/travel.html..." -ForegroundColor Cyan

if (Test-Path $travelHtmlPath) {
    $content = Get-Content $travelHtmlPath -Raw
    
    # Update API_BASE_URL
    $content = $content -replace ":\s*'https://your-backend-url\.com'", ": '$backendUrl'"
    
    Set-Content $travelHtmlPath -Value $content
    Write-Host "   ✓ Updated API_BASE_URL to: $backendUrl" -ForegroundColor Green
} else {
    Write-Host "   ✗ File not found: $travelHtmlPath" -ForegroundColor Red
}

# Update backend/server.js CORS
$serverJsPath = "c:\Users\Angel\Desktop\CA\caya-duffel-backend\server.js"
Write-Host ""
Write-Host "2. Updating backend/server.js CORS..." -ForegroundColor Cyan

if (Test-Path $serverJsPath) {
    $content = Get-Content $serverJsPath -Raw
    
    # Add frontend URLs to CORS if not already present
    $urlToAdd = $frontendUrl
    $urlToAddWww = $frontendUrl -replace "https://", "https://www."
    
    if ($content -notmatch [regex]::Escape($urlToAdd)) {
        # Find the allowedOrigins array and add the URLs
        $corsSection = @"
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      '$urlToAdd',
      '$urlToAddWww',
"@
        $content = $content -replace "('http://127\.0\.0\.1:3001')", "$corsSection"
        
        Set-Content $serverJsPath -Value $content
        Write-Host "   ✓ Added $urlToAdd to CORS" -ForegroundColor Green
        Write-Host "   ✓ Added $urlToAddWww to CORS" -ForegroundColor Green
    } else {
        Write-Host "   ℹ URLs already in CORS configuration" -ForegroundColor Yellow
    }
} else {
    Write-Host "   ✗ File not found: $serverJsPath" -ForegroundColor Red
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  SUMMARY" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ Configuration Updated!" -ForegroundColor Green
Write-Host ""
Write-Host "Backend URL:  $backendUrl" -ForegroundColor White
Write-Host "Frontend URL: $frontendUrl" -ForegroundColor White
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  NEXT STEPS" -ForegroundColor Yellow
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. REDEPLOY BACKEND on Render:" -ForegroundColor Yellow
Write-Host "   - Go to your Render dashboard" -ForegroundColor Gray
Write-Host "   - Click 'Manual Deploy' → 'Deploy latest commit'" -ForegroundColor Gray
Write-Host ""
Write-Host "2. REDEPLOY FRONTEND on Netlify:" -ForegroundColor Yellow
Write-Host "   - Drag and drop the 'frontend' folder again" -ForegroundColor Gray
Write-Host "   - Or use Netlify's 'Deploys' → 'Trigger deploy'" -ForegroundColor Gray
Write-Host ""
Write-Host "3. TEST YOUR WEBSITE:" -ForegroundColor Yellow
Write-Host "   - Visit: $frontendUrl" -ForegroundColor Cyan
Write-Host "   - Open Console (F12)" -ForegroundColor Gray
Write-Host "   - Check for: 'API Base URL: $backendUrl'" -ForegroundColor Gray
Write-Host "   - Search for flights!" -ForegroundColor Gray
Write-Host ""
Write-Host "═══════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
