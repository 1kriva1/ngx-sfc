
# publish.ps1
param (
    [string[]]$Projects
)

Write-Host "Starting publishing..." -ForegroundColor Yellow

# Save current location
Push-Location

function BuildAndPublish {
    param (
        [string]$ProjectName
    )

    # Step 1: Navigate to project root
    Set-Location "C:\SFC\Ngx\ngx-sfc"

    # Step 2: Run npm build:*
    Write-Host "Running npm run build:$ProjectName..." -ForegroundColor Yellow
    npm run build:$ProjectName

    # Step 3: Navigate to dist/ngx-sfc-*
    Set-Location "dist/ngx-sfc-$ProjectName"

    # Step 4: Run npm link
    Write-Host "Publishing package ngx-sfc-$ProjectName..." -ForegroundColor Yellow
    npm publish

    # Step 5: Return to root directory
    Set-Location "C:\SFC\Ngx\ngx-sfc"
}

try {

    if ($Projects.Count -eq 0) {
        BuildAndPublish -ProjectName common
        BuildAndPublish -ProjectName components
        BuildAndPublish -ProjectName inputs
    } else {
        foreach ($project in $Projects) {
            Write-Host "Start publishing project - $item."
            BuildAndPublish -ProjectName $project
            Write-Host "Publishing project - $item is finished."
        }
    }

    Write-Host "Process completed successfully!" -ForegroundColor Green
}
finally {
    # Return to original location
    Pop-Location
}