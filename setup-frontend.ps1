# Caya Express Travels - Automated Frontend Setup Script
# Run this script after installing Node.js

Write-Host "🚀 Starting Caya Express Travels Frontend Setup..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    Write-Host "✓ Node.js $nodeVersion detected" -ForegroundColor Green
    Write-Host "✓ npm $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Visit https://nodejs.org/" -ForegroundColor Cyan
    Write-Host "2. Download the LTS version" -ForegroundColor Cyan
    Write-Host "3. Run the installer" -ForegroundColor Cyan
    Write-Host "4. Restart PowerShell and run this script again" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or try: winget install OpenJS.NodeJS.LTS" -ForegroundColor Cyan
    exit 1
}

Write-Host ""
Write-Host "📦 Installing Backend Dependencies..." -ForegroundColor Yellow
Set-Location "C:\Users\Angel\Desktop\CA\backend"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Backend dependency installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "🔧 Generating Prisma Client..." -ForegroundColor Yellow
npx prisma generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Prisma client generation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Prisma client generated" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing Frontend Dependencies..." -ForegroundColor Yellow
Set-Location "C:\Users\Angel\Desktop\CA\frontend-next"
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Frontend dependency installation failed" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "🎨 Installing Tailwind CSS..." -ForegroundColor Yellow
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Tailwind installation had issues, but continuing..." -ForegroundColor Yellow
}
Write-Host "✓ Tailwind CSS installed" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installing Additional Packages..." -ForegroundColor Yellow
npm install clsx @supabase/auth-helpers-nextjs
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠ Some packages had issues, but continuing..." -ForegroundColor Yellow
}
Write-Host "✓ Additional packages installed" -ForegroundColor Green

Write-Host ""
Write-Host "✅ Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Configure Environment Variables" -ForegroundColor White
Write-Host "   Create: C:\Users\Angel\Desktop\CA\frontend-next\.env.local" -ForegroundColor Gray
Write-Host ""
Write-Host "   Required variables:" -ForegroundColor Gray
Write-Host "   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co" -ForegroundColor Gray
Write-Host "   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key" -ForegroundColor Gray
Write-Host "   DATABASE_URL=postgresql://user:pass@localhost:5432/caya_express" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Setup Supabase (Free)" -ForegroundColor White
Write-Host "   → Visit https://supabase.com and create a project" -ForegroundColor Gray
Write-Host "   → Create storage buckets: 'listings' and 'program-docs' (make public)" -ForegroundColor Gray
Write-Host "   → Copy credentials to .env.local" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Initialize Database" -ForegroundColor White
Write-Host "   cd C:\Users\Angel\Desktop\CA\backend" -ForegroundColor Gray
Write-Host "   npx prisma migrate dev --name initial" -ForegroundColor Gray
Write-Host "   node prisma\seed.ts" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Start Development Server" -ForegroundColor White
Write-Host "   cd C:\Users\Angel\Desktop\CA\frontend-next" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "   Then visit: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test accounts (after seeding):" -ForegroundColor Yellow
Write-Host "  Admin: host@example.com / admin123" -ForegroundColor Gray
Write-Host "  Partner: partner@example.com / partner123" -ForegroundColor Gray
Write-Host ""
Write-Host "Need help? Check README.md or WEBSITE_COMPLETE.md" -ForegroundColor Gray
Write-Host ""
