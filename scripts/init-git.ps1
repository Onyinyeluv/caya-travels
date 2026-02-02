# Initializes a git repo and makes the initial commit.
# Usage (PowerShell):
#   cd 'C:\Users\Angel\Desktop\CA'
#   .\scripts\init-git.ps1

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$repoRoot = Resolve-Path (Join-Path $scriptDir '..')
Set-Location $repoRoot

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Error "Git is not installed or not in PATH. Install Git from https://git-scm.com/ and re-run this script."
  exit 1
}

try {
  git init
  git checkout -b main
  git config user.name "Angel"
  git config user.email "angel@local"
  git add .
  git commit -m "chore: initial scaffold"
  Write-Host "Repository initialized and initial commit created."
} catch {
  Write-Error "Git commands failed: $_"
  exit 1
}
