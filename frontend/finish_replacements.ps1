$c = Get-Content "programs.html" -Raw

# Australian universities
$c = $c.Replace('university: "James Cook University"','university: "Premier Australian University"')
$c = $c.Replace('university: "Monash University"','university: "Premier Australian University"')
$c = $c.Replace('university: "RMIT University"','university: "Premier Australian University"')
$c = $c.Replace('university: "University of Adelaide"','university: "Premier Australian University"')
$c = $c.Replace('university: "Australian National University"','university: "Premier Australian University"')
$c = $c.Replace('university: "University of Technology Sydney"','university: "Premier Australian University"')
$c = $c.Replace('university: "Deakin University"','university: "Premier Australian University"')

# German and Irish universities
$c = $c.Replace('university: "Technical University of Munich"','university: "Top German University"')
$c = $c.Replace('university: "RWTH Aachen University"','university: "Top German University"')
$c = $c.Replace('university: "Technical University of Berlin"','university: "Top German University"')
$c = $c.Replace('university: "University of Mannheim"','university: "Top German University"')
$c = $c.Replace('university: "Trinity College Dublin"','university: "Leading Irish Institution"')
$c = $c.Replace('university: "University College Dublin"','university: "Leading Irish Institution"')
$c = $c.Replace('university: "University College Cork"','university: "Leading Irish Institution"')
$c = $c.Replace('university: "National University of Ireland, Galway"','university: "Leading Irish Institution"')

# Canadian Colleges
$c = $c.Replace('university: "George Brown College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Humber College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Centennial College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Seneca College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Conestoga College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Sheridan College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Algonquin College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Durham College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Lambton College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Georgian College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Fanshawe College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Mohawk College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Niagara College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "Confederation College"','university: "Leading Canadian College"')
$c = $c.Replace('university: "St. Lawrence College"','university: "Leading Canadian College"')

$c | Set-Content "programs.html"
Write-Host "✅ Completed! All university names replaced with generic institutional names."
