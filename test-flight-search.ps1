$uri = 'http://localhost:3000/search-flights'
$body = @{
    origin = 'LOS'
    destination = 'JFK'
    date = '2025-03-15'
} | ConvertTo-Json

Write-Host "Testing flight search endpoint..."
Write-Host "URL: $uri"
Write-Host "Body: $body"

try {
    $response = Invoke-WebRequest -Uri $uri -Method POST -ContentType 'application/json' -Body $body -UseBasicParsing
    Write-Host "Status: $($response.StatusCode)"
    Write-Host "Response: $($response.Content)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
}
