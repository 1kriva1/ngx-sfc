# start.ps1

param(
    [switch]$NewWindow
)

Write-Host "Running npm install..." -ForegroundColor Yellow
Start-Process "npm.cmd" -ArgumentList "install" -WorkingDirectory "C:\SFC\Ngx\ngx-sfc" -NoNewWindow -Wait
Write-Host "Npm install is done!"

if ($NewWindow) {
    Write-Host "Start SFC ngx projects at new window..." -ForegroundColor Magenta
    Start-Process "npm.cmd" -ArgumentList "run build:all:watch" -WorkingDirectory "C:\SFC\Ngx\ngx-sfc" -WindowStyle Normal
} else {
    Write-Host "Start SFC ngx projects..." -ForegroundColor Magenta
    Start-Process "npm.cmd" -ArgumentList "run build:all:watch" -WorkingDirectory "C:\SFC\Ngx\ngx-sfc" -NoNewWindow
}