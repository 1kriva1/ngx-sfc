# unlink.ps1
Write-Host "Starting unlink process..." -ForegroundColor Yellow

$globalNodeModules = Join-Path $env:APPDATA "npm\node_modules"
Write-Host "Global npm node_modules path: $globalNodeModules" -ForegroundColor Yellow

$foldersToRemove = @("ngx-sfc-common", "ngx-sfc-components", "ngx-sfc-inputs")

foreach ($folder in $foldersToRemove) {
    $fullPath = Join-Path $globalNodeModules $folder
    if (Test-Path $fullPath) {
        Write-Host "Removing folder: $fullPath" -ForegroundColor Yellow
        Remove-Item -Path $fullPath -Recurse -Force
        Write-Host "Folder: $fullPath was successfully removed." -ForegroundColor Green
    } else {
        Write-Host "Folder not found: $fullPath" -ForegroundColor Yellow
    }
}

Write-Host "Unlink process completed!" -ForegroundColor Green
