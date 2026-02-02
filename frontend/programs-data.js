// Clean programs data - 125 programs total
const programsData = [
  // Bachelor's - Canada (12)
  { id: 1, title: "Bachelor of Engineering - Software", university: "University of Waterloo", location: "Waterloo, Canada", country: "canada", type: "Bachelor's", field: "engineering", icon: "⚙️", duration: "4 years", badge: "" },
  { id: 2, title: "Bachelor of Science - Biology", university: "University of Toronto", location: "Toronto, Canada", country: "canada", type: "Bachelor's", field: "science", icon: "🔬", duration: "4 years", badge: "" },
  { id: 3, title: "Bachelor of Data Science", university: "University of British Columbia", location: "Vancouver, Canada", country: "canada", type: "Bachelor's", field: "computer", icon: "📈", duration: "4 years", badge: "New" },
  { id: 4, title: "Bachelor of Commerce", university: "York University", location: "Toronto, Canada", country: "canada", type: "Bachelor's", field: "business", icon: "💼", duration: "4 years", badge: "" },
  { id: 5, title: "BSc Nursing", university: "McMaster University", location: "Hamilton, Canada", country: "canada", type: "Bachelor's", field: "health", icon: "🏥", duration: "4 years", badge: "" },
  { id: 6, title: "Bachelor of Arts - Psychology", university: "McGill University", location: "Montreal, Canada", country: "canada", type: "Bachelor's", field: "arts", icon: "🧠", duration: "3 years", badge: "" },
  { id: 7, title: "Bachelor of Computer Science", university: "University of Alberta", location: "Edmonton, Canada", country: "canada", type: "Bachelor's", field: "computer", icon: "💻", duration: "4 years", badge: "" },
  { id: 8, title: "Bachelor of Environmental Science", university: "Dalhousie University", location: "Halifax, Canada", country: "canada", type: "Bachelor's", field: "science", icon: "🌱", duration: "4 years", badge: "" },
  { id: 9, title: "Bachelor of Mechanical Engineering", university: "Queen's University", location: "Kingston, Canada", country: "canada", type: "Bachelor's", field: "engineering", icon: "⚙️", duration: "4 years", badge: "" },
  { id: 10, title: "Bachelor of Business Administration", university: "Western University", location: "London, Canada", country: "canada", type: "Bachelor's", field: "business", icon: "💼", duration: "4 years", badge: "" },
  { id: 11, title: "Bachelor of Health Sciences", university: "Simon Fraser University", location: "Burnaby, Canada", country: "canada", type: "Bachelor's", field: "health", icon: "⚕️", duration: "4 years", badge: "" },
  { id: 12, title: "Bachelor of Architecture", university: "Carleton University", location: "Ottawa, Canada", country: "canada", type: "Bachelor's", field: "engineering", icon: "🏛️", duration: "5 years", badge: "" },
  
  // Bachelor's - UK (8)
  { id: 13, title: "BSc Computer Science", university: "Imperial College London", location: "London, UK", country: "uk", type: "Bachelor's", field: "computer", icon: "💻", duration: "3 years", badge: "Featured" },
  { id: 14, title: "BSc Nursing", university: "King's College London", location: "London, UK", country: "uk", type: "Bachelor's", field: "health", icon: "🏥", duration: "3 years", badge: "" },
  { id: 15, title: "BA in Economics", university: "London School of Economics", location: "London, UK", country: "uk", type: "Bachelor's", field: "business", icon: "📊", duration: "3 years", badge: "" },
  { id: 16, title: "BSc Mathematics", university: "University of Cambridge", location: "Cambridge, UK", country: "uk", type: "Bachelor's", field: "science", icon: "➗", duration: "3 years", badge: "" },
  { id: 17, title: "BEng Electrical Engineering", university: "University of Edinburgh", location: "Edinburgh, UK", country: "uk", type: "Bachelor's", field: "engineering", icon: "⚡", duration: "4 years", badge: "" },
  { id: 18, title: "BA in English Literature", university: "University of Oxford", location: "Oxford, UK", country: "uk", type: "Bachelor's", field: "arts", icon: "📚", duration: "3 years", badge: "" },
  { id: 19, title: "BSc Psychology", university: "University of Manchester", location: "Manchester, UK", country: "uk", type: "Bachelor's", field: "arts", icon: "🧠", duration: "3 years", badge: "" },
  { id: 20, title: "BSc Physics", university: "University of Bristol", location: "Bristol, UK", country: "uk", type: "Bachelor's", field: "science", icon: "⚛️", duration: "3 years", badge: "" },
  
  // Bachelor's - USA (8)
  { id: 21, title: "BA in Psychology", university: "UC Berkeley", location: "Berkeley, USA", country: "usa", type: "Bachelor's", field: "arts", icon: "🧠", duration: "4 years", badge: "" },
  { id: 22, title: "Bachelor of Architecture", university: "Cornell University", location: "Ithaca, USA", country: "usa", type: "Bachelor's", field: "engineering", icon: "🏛️", duration: "5 years", badge: "" },
  { id: 23, title: "BS in Computer Science", university: "Stanford University", location: "Stanford, USA", country: "usa", type: "Bachelor's", field: "computer", icon: "💻", duration: "4 years", badge: "Featured" },
  { id: 24, title: "Bachelor of Business Administration", university: "New York University", location: "New York, USA", country: "usa", type: "Bachelor's", field: "business", icon: "💼", duration: "4 years", badge: "" },
  { id: 25, title: "BS in Mechanical Engineering", university: "Georgia Tech", location: "Atlanta, USA", country: "usa", type: "Bachelor's", field: "engineering", icon: "⚙️", duration: "4 years", badge: "" },
  { id: 26, title: "BS in Environmental Science", university: "University of Michigan", location: "Ann Arbor, USA", country: "usa", type: "Bachelor's", field: "science", icon: "🌱", duration: "4 years", badge: "" },
  { id: 27, title: "Bachelor of Fine Arts", university: "RISD", location: "Providence, USA", country: "usa", type: "Bachelor's", field: "arts", icon: "🎨", duration: "4 years", badge: "" },
  { id: 28, title: "BS in Data Science", university: "Carnegie Mellon", location: "Pittsburgh, USA", country: "usa", type: "Bachelor's", field: "computer", icon: "📊", duration: "4 years", badge: "New" },
  
  // Bachelor's - Australia (12)
  { id: 29, title: "Bachelor of Commerce", university: "University of Melbourne", location: "Melbourne, Australia", country: "australia", type: "Bachelor's", field: "business", icon: "💼", duration: "3 years", badge: "" },
  { id: 30, title: "Bachelor of Laws (LLB)", university: "University of Sydney", location: "Sydney, Australia", country: "australia", type: "Bachelor's", field: "business", icon: "⚖️", duration: "4 years", badge: "" },
  { id: 31, title: "BA in International Relations", university: "University of Melbourne", location: "Melbourne, Australia", country: "australia", type: "Bachelor's", field: "arts", icon: "🌍", duration: "3 years", badge: "" },
  { id: 32, title: "Bachelor of Engineering (Honors)", university: "UNSW", location: "Sydney, Australia", country: "australia", type: "Bachelor's", field: "engineering", icon: "⚙️", duration: "4 years", badge: "" },
  { id: 33, title: "Bachelor of Information Technology", university: "QUT", location: "Brisbane, Australia", country: "australia", type: "Bachelor's", field: "computer", icon: "💻", duration: "3 years", badge: "" },
  { id: 34, title: "Bachelor of Science - Marine Biology", university: "James Cook University", location: "Townsville, Australia", country: "australia", type: "Bachelor's", field: "science", icon: "🐠", duration: "3 years", badge: "" },
  { id: 35, title: "Bachelor of Nursing", university: "Monash University", location: "Melbourne, Australia", country: "australia", type: "Bachelor's", field: "health", icon: "🏥", duration: "3 years", badge: "" },
  { id: 36, title: "Bachelor of Design", university: "RMIT University", location: "Melbourne, Australia", country: "australia", type: "Bachelor's", field: "arts", icon: "🎨", duration: "3 years", badge: "" },
  { id: 37, title: "Bachelor of Business", university: "University of Adelaide", location: "Adelaide, Australia", country: "australia", type: "Bachelor's", field: "business", icon: "💼", duration: "3 years", badge: "" },
  { id: 38, title: "Bachelor of Environmental Science", university: "ANU", location: "Canberra, Australia", country: "australia", type: "Bachelor's", field: "science", icon: "🌱", duration: "3 years", badge: "" },
  { id: 39, title: "Bachelor of Computer Science", university: "UTS", location: "Sydney, Australia", country: "australia", type: "Bachelor's", field: "computer", icon: "💻", duration: "3 years", badge: "" },
  { id: 40, title: "Bachelor of Education", university: "Deakin University", location: "Melbourne, Australia", country: "australia", type: "Bachelor's", field: "arts", icon: "📚", duration: "4 years", badge: "" },
  
  // Bachelor's - Germany (4)
  { id: 41, title: "BSc Civil Engineering", university: "TU Munich", location: "Munich, Germany", country: "germany", type: "Bachelor's", field: "engineering", icon: "🏗️", duration: "3 years", badge: "" },
  { id: 42, title: "BSc Computer Science", university: "RWTH Aachen", location: "Aachen, Germany", country: "germany", type: "Bachelor's", field: "computer", icon: "💻", duration: "3 years", badge: "" },
  { id: 43, title: "BSc Mechanical Engineering", university: "TU Berlin", location: "Berlin, Germany", country: "germany", type: "Bachelor's", field: "engineering", icon: "⚙️", duration: "3 years", badge: "" },
  { id: 44, title: "BA in International Business", university: "University of Mannheim", location: "Mannheim, Germany", country: "germany", type: "Bachelor's", field: "business", icon: "🌐", duration: "3 years", badge: "" },
  
  // Bachelor's - Ireland (4)
  { id: 45, title: "BA in Digital Media & Design", university: "Trinity College Dublin", location: "Dublin, Ireland", country: "ireland", type: "Bachelor's", field: "arts", icon: "🎨", duration: "4 years", badge: "" },
  { id: 46, title: "BSc Environmental Science", university: "UCD", location: "Dublin, Ireland", country: "ireland", type: "Bachelor's", field: "science", icon: "🌱", duration: "4 years", badge: "" },
  { id: 47, title: "Bachelor of Engineering", university: "UCC", location: "Cork, Ireland", country: "ireland", type: "Bachelor's", field: "engineering", icon: "⚙️", duration: "4 years", badge: "" },
  { id: 48, title: "Bachelor of Business Studies", university: "NUI Galway", location: "Galway, Ireland", country: "ireland", type: "Bachelor's", field: "business", icon: "💼", duration: "3 years", badge: "" },
  
  // Master's - Canada (9)
  { id: 49, title: "MBA", university: "Rotman School - UofT", location: "Toronto, Canada", country: "canada", type: "Master's", field: "business", icon: "🎓", duration: "2 years", badge: "Featured" },
  { id: 50, title: "Master of Finance", university: "McGill University", location: "Montreal, Canada", country: "canada", type: "Master's", field: "business", icon: "💰", duration: "1.5 years", badge: "" },
  { id: 51, title: "Master of Social Work", university: "University of Toronto", location: "Toronto, Canada", country: "canada", type: "Master's", field: "arts", icon: "🤝", duration: "2 years", badge: "" },
  { id: 52, title: "MS in Aerospace Engineering", university: "University of Toronto", location: "Toronto, Canada", country: "canada", type: "Master's", field: "engineering", icon: "🚀", duration: "2 years", badge: "" },
  { id: 53, title: "Master of Computer Science", university: "UBC", location: "Vancouver, Canada", country: "canada", type: "Master's", field: "computer", icon: "💻", duration: "2 years", badge: "" },
  { id: 54, title: "Master of Engineering - Civil", university: "University of Waterloo", location: "Waterloo, Canada", country: "canada", type: "Master's", field: "engineering", icon: "🏗️", duration: "2 years", badge: "" },
  { id: 55, title: "Master of Public Health", university: "University of Alberta", location: "Edmonton, Canada", country: "canada", type: "Master's", field: "health", icon: "⚕️", duration: "2 years", badge: "" },
  { id: 56, title: "Master of Data Science", university: "SFU", location: "Burnaby, Canada", country: "canada", type: "Master's", field: "computer", icon: "📊", duration: "1.5 years", badge: "New" },
  { id: 57, title: "Master of Environmental Studies", university: "York University", location: "Toronto, Canada", country: "canada", type: "Master's", field: "science", icon: "🌱", duration: "2 years", badge: "" },
  
  // Master's - UK (5)
  { id: 58, title: "MSc in Artificial Intelligence", university: "University of Edinburgh", location: "Edinburgh, UK", country: "uk", type: "Master's", field: "computer", icon: "🤖", duration: "1 year", badge: "Featured" },
  { id: 59, title: "MSc in Cybersecurity", university: "University of Oxford", location: "Oxford, UK", country: "uk", type: "Master's", field: "computer", icon: "🔒", duration: "1 year", badge: "New" },
  { id: 60, title: "Master of Public Policy", university: "LSE", location: "London, UK", country: "uk", type: "Master's", field: "business", icon: "📜", duration: "1 year", badge: "" },
  { id: 61, title: "MSc in Data Science", university: "Imperial College London", location: "London, UK", country: "uk", type: "Master's", field: "computer", icon: "📊", duration: "1 year", badge: "" },
  { id: 62, title: "Master of Finance", university: "University of Cambridge", location: "Cambridge, UK", country: "uk", type: "Master's", field: "business", icon: "💰", duration: "1 year", badge: "" },
  
  // Master's - USA (8)
  { id: 63, title: "Master of Engineering", university: "MIT", location: "Boston, USA", country: "usa", type: "Master's", field: "engineering", icon: "⚙️", duration: "2 years", badge: "" },
  { id: 64, title: "MS in Computer Science", university: "Stanford University", location: "Stanford, USA", country: "usa", type: "Master's", field: "computer", icon: "💻", duration: "2 years", badge: "Featured" },
  { id: 65, title: "MBA", university: "Harvard Business School", location: "Boston, USA", country: "usa", type: "Master's", field: "business", icon: "🎓", duration: "2 years", badge: "Featured" },
  { id: 66, title: "Master of Public Health", university: "Johns Hopkins", location: "Baltimore, USA", country: "usa", type: "Master's", field: "health", icon: "⚕️", duration: "2 years", badge: "" },
  { id: 67, title: "MS in Data Science", university: "Columbia University", location: "New York, USA", country: "usa", type: "Master's", field: "computer", icon: "📊", duration: "1.5 years", badge: "New" },
  { id: 68, title: "Master of Architecture", university: "Yale University", location: "New Haven, USA", country: "usa", type: "Master's", field: "engineering", icon: "🏛️", duration: "3 years", badge: "" },
  { id: 69, title: "Master of Finance", university: "NYU Stern", location: "New York, USA", country: "usa", type: "Master's", field: "business", icon: "💰", duration: "1 year", badge: "" },
  { id: 70, title: "MS in Biotechnology", university: "UC San Diego", location: "San Diego, USA", country: "usa", type: "Master's", field: "science", icon: "🧬", duration: "2 years", badge: "" },
  
  // Master's - Australia (8)
  { id: 71, title: "Master of Architecture", university: "University of Melbourne", location: "Melbourne, Australia", country: "australia", type: "Master's", field: "engineering", icon: "🏢", duration: "2 years", badge: "" },
  { id: 72, title: "Master of Marketing", university: "University of Sydney", location: "Sydney, Australia", country: "australia", type: "Master's", field: "business", icon: "📱", duration: "1.5 years", badge: "" },
  { id: 73, title: "Master of Information Technology", university: "ANU", location: "Canberra, Australia", country: "australia", type: "Master's", field: "computer", icon: "💻", duration: "2 years", badge: "" },
  { id: 74, title: "Master of Engineering", university: "UNSW", location: "Sydney, Australia", country: "australia", type: "Master's", field: "engineering", icon: "⚙️", duration: "2 years", badge: "" },
  { id: 75, title: "MBA", university: "Monash University", location: "Melbourne, Australia", country: "australia", type: "Master's", field: "business", icon: "🎓", duration: "1.5 years", badge: "" },
  { id: 76, title: "Master of Data Science", university: "UTS", location: "Sydney, Australia", country: "australia", type: "Master's", field: "computer", icon: "📊", duration: "1.5 years", badge: "New" },
  { id: 77, title: "Master of Environmental Management", university: "UQ", location: "Brisbane, Australia", country: "australia", type: "Master's", field: "science", icon: "🌱", duration: "1.5 years", badge: "" },
  { id: 78, title: "Master of International Business", university: "RMIT", location: "Melbourne, Australia", country: "australia", type: "Master's", field: "business", icon: "🌐", duration: "2 years", badge: "" },
  
  // Master's - Germany (3)
  { id: 79, title: "MSc in Biotechnology", university: "TU Berlin", location: "Berlin, Germany", country: "germany", type: "Master's", field: "science", icon: "🧬", duration: "2 years", badge: "" },
  { id: 80, title: "MSc in Mechanical Engineering", university: "TU Munich", location: "Munich, Germany", country: "germany", type: "Master's", field: "engineering", icon: "⚙️", duration: "2 years", badge: "" },
  { id: 81, title: "MSc in Computer Science", university: "RWTH Aachen", location: "Aachen, Germany", country: "germany", type: "Master's", field: "computer", icon: "💻", duration: "2 years", badge: "" },
  
  // Master's - Ireland (3)
  { id: 82, title: "Master of International Business", university: "Trinity College Dublin", location: "Dublin, Ireland", country: "ireland", type: "Master's", field: "business", icon: "🌐", duration: "1 year", badge: "" },
  { id: 83, title: "MSc in Climate Change", university: "UCD", location: "Dublin, Ireland", country: "ireland", type: "Master's", field: "science", icon: "🌡️", duration: "1 year", badge: "" },
  { id: 84, title: "MSc in Data Analytics", university: "NUI Galway", location: "Galway, Ireland", country: "ireland", type: "Master's", field: "computer", icon: "📊", duration: "1 year", badge: "" },
  
  // PhD - Canada (4)
  { id: 85, title: "PhD in Environmental Engineering", university: "University of Toronto", location: "Toronto, Canada", country: "canada", type: "PhD", field: "engineering", icon: "🌍", duration: "4 years", badge: "Funded" },
  { id: 86, title: "PhD in Civil Engineering", university: "UBC", location: "Vancouver, Canada", country: "canada", type: "PhD", field: "engineering", icon: "🏗️", duration: "4 years", badge: "" },
  { id: 87, title: "PhD in Computer Science", university: "University of Waterloo", location: "Waterloo, Canada", country: "canada", type: "PhD", field: "computer", icon: "💻", duration: "5 years", badge: "Funded" },
  { id: 88, title: "PhD in Neuroscience", university: "McGill University", location: "Montreal, Canada", country: "canada", type: "PhD", field: "science", icon: "🧠", duration: "5 years", badge: "" },
  
  // PhD - UK (3)
  { id: 89, title: "PhD in Economics", university: "University of Cambridge", location: "Cambridge, UK", country: "uk", type: "PhD", field: "business", icon: "📈", duration: "4 years", badge: "" },
  { id: 90, title: "PhD in Literature", university: "University of Oxford", location: "Oxford, UK", country: "uk", type: "PhD", field: "arts", icon: "📚", duration: "3 years", badge: "" },
  { id: 91, title: "PhD in Artificial Intelligence", university: "University of Edinburgh", location: "Edinburgh, UK", country: "uk", type: "PhD", field: "computer", icon: "🤖", duration: "4 years", badge: "" },
  
  // PhD - USA (3)
  { id: 92, title: "PhD in Computer Science", university: "Stanford University", location: "Stanford, USA", country: "usa", type: "PhD", field: "computer", icon: "💻", duration: "5 years", badge: "Funded" },
  { id: 93, title: "PhD in Physics", university: "MIT", location: "Boston, USA", country: "usa", type: "PhD", field: "science", icon: "⚛️", duration: "5 years", badge: "Funded" },
  { id: 94, title: "PhD in Psychology", university: "Harvard University", location: "Boston, USA", country: "usa", type: "PhD", field: "arts", icon: "🧠", duration: "5 years", badge: "" },
  
  // PhD - Australia (2)
  { id: 95, title: "PhD in Environmental Science", university: "ANU", location: "Canberra, Australia", country: "australia", type: "PhD", field: "science", icon: "🌱", duration: "4 years", badge: "" },
  { id: 96, title: "PhD in Biomedical Engineering", university: "University of Melbourne", location: "Melbourne, Australia", country: "australia", type: "PhD", field: "engineering", icon: "🔬", duration: "4 years", badge: "" },
  
  // PhD - Germany (1)
  { id: 97, title: "PhD in Biomedical Sciences", university: "TU Berlin", location: "Berlin, Germany", country: "germany", type: "PhD", field: "science", icon: "🔬", duration: "4 years", badge: "" },
  
  // Certificates - Canada (12)
  { id: 98, title: "Graduate Certificate in Project Management", university: "George Brown College", location: "Toronto, Canada", country: "canada", type: "Certificate", field: "business", icon: "📋", duration: "8 months", badge: "" },
  { id: 99, title: "Certificate in Digital Marketing", university: "Humber College", location: "Toronto, Canada", country: "canada", type: "Certificate", field: "business", icon: "📱", duration: "6 months", badge: "New" },
  { id: 100, title: "Graduate Certificate in Web Development", university: "Centennial College", location: "Toronto, Canada", country: "canada", type: "Certificate", field: "computer", icon: "🌐", duration: "1 year", badge: "" },
  { id: 101, title: "Certificate in Data Analytics", university: "Seneca College", location: "Toronto, Canada", country: "canada", type: "Certificate", field: "computer", icon: "📊", duration: "1 year", badge: "Featured" },
  { id: 102, title: "Graduate Certificate in Healthcare Management", university: "Conestoga College", location: "Kitchener, Canada", country: "canada", type: "Certificate", field: "health", icon: "🏥", duration: "1 year", badge: "" },
  { id: 103, title: "Certificate in UX/UI Design", university: "Sheridan College", location: "Oakville, Canada", country: "canada", type: "Certificate", field: "arts", icon: "🎨", duration: "8 months", badge: "" },
  { id: 104, title: "Graduate Certificate in Cybersecurity", university: "Algonquin College", location: "Ottawa, Canada", country: "canada", type: "Certificate", field: "computer", icon: "🔒", duration: "1 year", badge: "" },
  { id: 105, title: "Certificate in Supply Chain Management", university: "Durham College", location: "Oshawa, Canada", country: "canada", type: "Certificate", field: "business", icon: "📦", duration: "8 months", badge: "" },
  { id: 106, title: "Graduate Certificate in Cloud Computing", university: "Lambton College", location: "Sarnia, Canada", country: "canada", type: "Certificate", field: "computer", icon: "☁️", duration: "1 year", badge: "New" },
  { id: 107, title: "Certificate in Hospitality Management", university: "Georgian College", location: "Barrie, Canada", country: "canada", type: "Certificate", field: "business", icon: "🏨", duration: "1 year", badge: "" },
  { id: 108, title: "Graduate Certificate in AI", university: "George Brown College", location: "Toronto, Canada", country: "canada", type: "Certificate", field: "computer", icon: "🤖", duration: "1 year", badge: "New" },
  { id: 109, title: "Certificate in International Business", university: "Humber College", location: "Toronto, Canada", country: "canada", type: "Certificate", field: "business", icon: "🌐", duration: "8 months", badge: "" },
  
  // Diplomas - Canada (8)
  { id: 110, title: "Diploma in Business Administration", university: "Fanshawe College", location: "London, Canada", country: "canada", type: "Diploma", field: "business", icon: "💼", duration: "2 years", badge: "" },
  { id: 111, title: "Advanced Diploma in Software Engineering", university: "Mohawk College", location: "Hamilton, Canada", country: "canada", type: "Diploma", field: "computer", icon: "💻", duration: "3 years", badge: "" },
  { id: 112, title: "Diploma in Culinary Arts", university: "Niagara College", location: "Niagara, Canada", country: "canada", type: "Diploma", field: "arts", icon: "👨‍🍳", duration: "2 years", badge: "" },
  { id: 113, title: "Advanced Diploma in Nursing", university: "Confederation College", location: "Thunder Bay, Canada", country: "canada", type: "Diploma", field: "health", icon: "🏥", duration: "3 years", badge: "" },
  { id: 114, title: "Diploma in Graphic Design", university: "St. Lawrence College", location: "Kingston, Canada", country: "canada", type: "Diploma", field: "arts", icon: "🎨", duration: "2 years", badge: "" },
  { id: 115, title: "Advanced Diploma in Mechanical Engineering", university: "Seneca College", location: "Toronto, Canada", country: "canada", type: "Diploma", field: "engineering", icon: "⚙️", duration: "3 years", badge: "" },
  { id: 116, title: "Diploma in Digital Marketing", university: "George Brown College", location: "Toronto, Canada", country: "canada", type: "Diploma", field: "business", icon: "📱", duration: "2 years", badge: "" },
  { id: 117, title: "Advanced Diploma in Network Engineering", university: "Centennial College", location: "Toronto, Canada", country: "canada", type: "Diploma", field: "computer", icon: "🌐", duration: "3 years", badge: "" }
];
