# Re-renders entry.png from design/page.html with headless Chrome (Windows).
# Usage:  powershell -File design/render.ps1 [-Chrome "C:\path\to\chrome.exe"]
param(
  [string]$Chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
)
$ErrorActionPreference = 'Stop'
$design = $PSScriptRoot
$repo   = Split-Path $design -Parent
$page   = "file:///" + (($design -replace '\\', '/') + "/page.html")
$out    = Join-Path $repo 'entry.png'
$prof   = Join-Path ([IO.Path]::GetTempPath()) 'news-image-chrome-profile'

# page.html builds itself with worldmap.js and art.js, so let scripts finish first.
# Chrome logs harmless warnings on stderr; don't let them stop the script.
$ErrorActionPreference = 'Continue'
& $Chrome --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 `
  --allow-file-access-from-files --virtual-time-budget=3000 `
  --window-size=1024,1024 --user-data-dir="$prof" --screenshot="$out" $page 2>$null | Out-Null

$len = (Get-Item $out).Length
if ($len -gt 1048576) { throw "entry.png is $len bytes, over the 1 MiB cap" }
"rendered $out ($len bytes)"
