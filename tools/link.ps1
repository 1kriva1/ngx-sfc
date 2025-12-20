
# link.ps1
Write-Host "Starting build and link process..." -ForegroundColor Yellow

# Save current location
Push-Location

function BuildAndLink {
    param (
        [string]$ProjectName
    )

    # Step 1: Navigate to project root
    Set-Location "C:\SFC\Ngx\ngx-sfc"

    # Step 2: Run npm build:common
    Write-Host "Running npm run build:$ProjectName..." -ForegroundColor Yellow
    npm run build:$ProjectName

    # Step 3: Navigate to dist/ngx-sfc-common
    Set-Location "dist/ngx-sfc-$ProjectName"

    # Step 4: Run npm link
    Write-Host "Linking package ngx-sfc-$ProjectName globally..." -ForegroundColor Yellow
    npm link

    # Step 5: Return to root directory
    Set-Location "C:\SFC\Ngx\ngx-sfc"
}

try {
    # Step 1: Build common project
    BuildAndLink -ProjectName common

    # Step 2: Build components project
    BuildAndLink -ProjectName components

    # Step 3: Build inputs project
    BuildAndLink -ProjectName inputs

    Write-Host "Process completed successfully!" -ForegroundColor Green
}
finally {
    # Return to original location
    Pop-Location
}