# Bootstrap script for the workspace
# Usage (PowerShell):
#   cd 'C:\Users\Angel\Desktop\CA'
#   .\scripts\bootstrap.ps1

function Open-NodeDownload {
    Write-Host "Opening Node.js download page in your browser..."
    Start-Process "https://nodejs.org/en/download/"
}

# Check for npm and node
$node = Get-Command node -ErrorAction SilentlyContinue
$npm = Get-Command npm -ErrorAction SilentlyContinue

if (-not $node -or -not $npm) {
    Write-Warning "Node.js (which includes npm) is not installed or not in PATH."
    $choice = Read-Host "Open Node.js download page now? (Y/n)"
    if ($choice -eq '' -or $choice -match '^[Yy]') {
        Open-NodeDownload
    }
    Write-Host "After installing Node.js, re-run this script to install dependencies and start dev servers."
    exit 1
}

Write-Host "Node and npm found. Installing dependencies (this may take a few minutes)..."
# Run npm install at workspace root using workspaces install
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Error "npm install failed. Check output above and try again."
    exit $LASTEXITCODE
}

Write-Host "Dependencies installed. Starting dev servers (Ctrl+C to stop)..."
# Start the dev script from root which uses concurrently
npm run dev

# When user stops the dev script, exit
exit 0
