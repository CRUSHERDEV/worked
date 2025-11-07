# PowerShell script to apply database schema using Supabase REST API
# This uses the Supabase Management API to execute SQL

$ErrorActionPreference = "Stop"

# Load environment variables
$envFile = ".env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "❌ .env.local file not found!" -ForegroundColor Red
    exit 1
}

# Read environment variables
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^([^#][^=]+)=(.*)$') {
        $name = $matches[1].Trim()
        $value = $matches[2].Trim()
        [Environment]::SetEnvironmentVariable($name, $value, "Process")
    }
}

$supabaseUrl = $env:SUPABASE_URL
$supabaseServiceKey = $env:SUPABASE_SERVICE_KEY

if (-not $supabaseUrl -or -not $supabaseServiceKey) {
    Write-Host "❌ Missing Supabase credentials in .env.local" -ForegroundColor Red
    exit 1
}

Write-Host "`n🗄️  Applying Database Schema to Supabase" -ForegroundColor Cyan
Write-Host "==========================================`n" -ForegroundColor Cyan

# Read SQL file
$sqlFile = "supabase\migrations\20240101000001_initial_schema.sql"
if (-not (Test-Path $sqlFile)) {
    Write-Host "❌ SQL file not found: $sqlFile" -ForegroundColor Red
    exit 1
}

$sql = Get-Content $sqlFile -Raw

Write-Host "📖 Read SQL file: $sqlFile" -ForegroundColor Green
Write-Host "📏 SQL size: $($sql.Length) characters`n" -ForegroundColor Gray

Write-Host "⚠️  Note: Supabase REST API doesn't support direct SQL execution." -ForegroundColor Yellow
Write-Host "   You need to apply the schema manually via Supabase Dashboard.`n" -ForegroundColor Yellow

Write-Host "📌 Quick Steps:" -ForegroundColor Cyan
Write-Host "   1. Open: https://supabase.com/dashboard/project/giqrkglcjstwvhbslpiu/sql" -ForegroundColor White
Write-Host "   2. Click 'New Query'" -ForegroundColor White
Write-Host "   3. Copy ALL SQL from: $sqlFile" -ForegroundColor White
Write-Host "   4. Paste into SQL Editor" -ForegroundColor White
Write-Host "   5. Click 'Run' button`n" -ForegroundColor White

Write-Host "💡 Alternative: Using npx supabase (if available)" -ForegroundColor Cyan
Write-Host "   npx supabase link --project-ref giqrkglcjstwvhbslpiu" -ForegroundColor Gray
Write-Host "   npx supabase db push`n" -ForegroundColor Gray

# Try using npx supabase if available
Write-Host "🔄 Attempting to use npx supabase...`n" -ForegroundColor Yellow

try {
    # Check if we can use npx
    $npxCheck = Get-Command npx -ErrorAction SilentlyContinue
    if ($npxCheck) {
        Write-Host "✅ npx is available, attempting to link project..." -ForegroundColor Green
        
        Push-Location supabase
        try {
            npx supabase link --project-ref giqrkglcjstwvhbslpiu 2>&1 | Out-String
            Write-Host "`n🚀 Pushing database schema..." -ForegroundColor Yellow
            npx supabase db push 2>&1 | Out-String
            Write-Host "`n✅ Schema applied successfully!" -ForegroundColor Green
        } catch {
            Write-Host "`n⚠️  npx supabase command failed. Please apply manually via Dashboard." -ForegroundColor Yellow
        } finally {
            Pop-Location
        }
    } else {
        Write-Host "❌ npx not available. Please apply schema manually." -ForegroundColor Red
    }
} catch {
    Write-Host "⚠️  Could not execute npx. Please apply schema manually via Dashboard." -ForegroundColor Yellow
}

Write-Host "`n✅ Done! Verify tables in Supabase Dashboard - Table Editor`n" -ForegroundColor Green
