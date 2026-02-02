#!/usr/bin/env python3
"""Script to replace specific university names with generic ones"""

# Read the file
with open('programs.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Define replacements - format: (search_text, replacement_text)
replacements = [
    # Canadian Universities
    ('university: "University of Waterloo"', 'university: "Top Canadian University"'),
    ('university: "University of Toronto - Rotman School"', 'university: "Top Canadian Business School"'),
    ('university: "University of Toronto"', 'university: "Top Canadian University"'),
    ('university: "University of British Columbia"', 'university: "Top Canadian University"'),
    ('university: "York University"', 'university: "Top Canadian University"'),
    ('university: "McMaster University"', 'university: "Top Canadian University"'),
    ('university: "McGill University"', 'university: "Top Canadian University"'),
    ('university: "University of Alberta"', 'university: "Top Canadian University"'),
    ('university: "Dalhousie University"', 'university: "Top Canadian University"'),
    ('university: "Queen\'s University"', 'university: "Top Canadian University"'),
    ('university: "Western University"', 'university: "Top Canadian University"'),
    ('university: "Simon Fraser University"', 'university: "Top Canadian University"'),
    ('university: "Carleton University"', 'university: "Top Canadian University"'),
    
    # Canadian Colleges
    ('university: "George Brown College"', 'university: "Leading Canadian College"'),
    ('university: "Humber College"', 'university: "Leading Canadian College"'),
    ('university: "Centennial College"', 'university: "Leading Canadian College"'),
    ('university: "Seneca College"', 'university: "Leading Canadian College"'),
    ('university: "Conestoga College"', 'university: "Leading Canadian College"'),
    ('university: "Sheridan College"', 'university: "Leading Canadian College"'),
    ('university: "Algonquin College"', 'university: "Leading Canadian College"'),
    ('university: "Durham College"', 'university: "Leading Canadian College"'),
    ('university: "Lambton College"', 'university: "Leading Canadian College"'),
    ('university: "Georgian College"', 'university: "Leading Canadian College"'),
    ('university: "Fanshawe College"', 'university: "Leading Canadian College"'),
    ('university: "Mohawk College"', 'university: "Leading Canadian College"'),
    ('university: "Niagara College"', 'university: "Leading Canadian College"'),
    ('university: "Confederation College"', 'university: "Leading Canadian College"'),
    ('university: "St. Lawrence College"', 'university: "Leading Canadian College"'),
    
    # UK Universities  
    ('university: "Imperial College London"', 'university: "Top UK University"'),
    ('university: "King\'s College London"', 'university: "Top UK University"'),
    ('university: "London School of Economics"', 'university: "Top UK University"'),
    ('university: "University of Cambridge"', 'university: "Top UK University"'),
    ('university: "University of Edinburgh"', 'university: "Top UK University"'),
    ('university: "University of Oxford"', 'university: "Top UK University"'),
    ('university: "University of Manchester"', 'university: "Top UK University"'),
    ('university: "University of Bristol"', 'university: "Top UK University"'),
    
    # US Universities
    ('university: "University of California, Berkeley"', 'university: "Leading US Institution"'),
    ('university: "Cornell University"', 'university: "Leading US Institution"'),
    ('university: "Stanford University"', 'university: "Leading US Institution"'),
    ('university: "New York University"', 'university: "Leading US Institution"'),
    ('university: "Georgia Institute of Technology"', 'university: "Leading US Institution"'),
    ('university: "University of Michigan"', 'university: "Leading US Institution"'),
    ('university: "Rhode Island School of Design"', 'university: "Leading US Art School"'),
    ('university: "Carnegie Mellon University"', 'university: "Leading US Institution"'),
    
    # Australian Universities
    ('university: "University of Melbourne"', 'university: "Premier Australian University"'),
    ('university: "University of Sydney"', 'university: "Premier Australian University"'),
    ('university: "University of New South Wales"', 'university: "Premier Australian University"'),
    ('university: "Queensland University of Technology"', 'university: "Premier Australian University"'),
    ('university: "James Cook University"', 'university: "Premier Australian University"'),
    ('university: "Monash University"', 'university: "Premier Australian University"'),
    ('university: "RMIT University"', 'university: "Premier Australian University"'),
    ('university: "University of Adelaide"', 'university: "Premier Australian University"'),
    ('university: "Australian National University"', 'university: "Premier Australian University"'),
    ('university: "University of Technology Sydney"', 'university: "Premier Australian University"'),
    ('university: "Deakin University"', 'university: "Premier Australian University"'),
    
    # German Universities
    ('university: "Technical University of Munich"', 'university: "Top German University"'),
    ('university: "RWTH Aachen University"', 'university: "Top German University"'),
    ('university: "Technical University of Berlin"', 'university: "Top German University"'),
    ('university: "University of Mannheim"', 'university: "Top German University"'),
    
    # Irish Universities
    ('university: "Trinity College Dublin"', 'university: "Leading Irish Institution"'),
    ('university: "University College Dublin"', 'university: "Leading Irish Institution"'),
    ('university: "University College Cork"', 'university: "Leading Irish Institution"'),
    ('university: "National University of Ireland, Galway"', 'university: "Leading Irish Institution"'),
]

# Apply all replacements
for old_text, new_text in replacements:
    content = content.replace(old_text, new_text)

# Write back to file
with open('programs.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"✅ Successfully replaced {len(replacements)} university name patterns!")
print("All specific university names have been replaced with generic institutional names.")
