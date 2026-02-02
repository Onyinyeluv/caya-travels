// Caya.ai - Intelligent Travel & Education Assistant
// Comprehensive Knowledge Base and AI Chatbot System

const cayaAI = {
  knowledgeBase: {
    // Company Information
    companyInfo: {
      name: "CAYA EXPRESS TRAVEL",
      phone1: "+234 810 154 9916",
      phone2: "+234 916 000 3177",
      email: "cayaexpresstravels@gmail.com"
    },

    // Study Abroad - Comprehensive Information
    studyAbroad: {
      canada: {
        name: "Canada",
        programs: "150+ programs available across 50+ institutions",
        tuition: "CAD $12,000 - $35,000 per year",
        advantages: [
          "Post-Graduation Work Permit (PGWP) up to 3 years",
          "Clear pathway to permanent residence",
          "High quality education system",
          "Affordable compared to US/UK",
          "Safe, multicultural society",
          "Work 20-24 hours/week while studying",
          "Spouse can get open work permit"
        ],
        popularPrograms: [
          "Business Administration & Management",
          "Computer Science & IT",
          "Engineering (Civil, Mechanical, Electrical)",
          "Healthcare & Nursing",
          "Accounting & Finance",
          "Hospitality & Tourism Management",
          "Data Analytics & Business Intelligence"
        ],
        cities: [
          "Toronto - Business hub, diverse",
          "Vancouver - Coastal, mild climate",
          "Montreal - European charm, bilingual",
          "Calgary - Oil & gas, mountains",
          "Ottawa - Capital city, government jobs"
        ]
      },
      usa: {
        name: "United States",
        programs: "200+ programs available",
        tuition: "$20,000 - $55,000 per year",
        advantages: [
          "World-renowned universities (Harvard, MIT, Stanford)",
          "OPT work authorization (1-3 years)",
          "STEM OPT extension up to 3 years",
          "Cutting-edge research opportunities",
          "Strong alumni networks",
          "Campus employment opportunities"
        ],
        popularPrograms: [
          "Computer Science & Software Engineering",
          "Business Administration (MBA)",
          "Data Science & Analytics",
          "Engineering (Electrical, Mechanical, Aerospace)",
          "Finance & Investment Banking",
          "Artificial Intelligence & Machine Learning"
        ]
      },
      uk: {
        name: "United Kingdom",
        programs: "125+ programs available",
        tuition: "£12,000 - £35,000 per year",
        advantages: [
          "Shorter programs (1-year Master's)",
          "Graduate Route visa - 2 years work rights",
          "Prestigious universities (Oxford, Cambridge, Imperial)",
          "Rich cultural heritage",
          "Gateway to Europe",
          "Part-time work 20 hours/week"
        ],
        popularPrograms: [
          "Business & Management (MBA, MSc)",
          "Finance & Banking",
          "Law (LLM)",
          "Computer Science",
          "International Relations",
          "Marketing & Communications"
        ]
      },
      australia: {
        name: "Australia",
        programs: "100+ programs available",
        tuition: "AUD $20,000 - $45,000 per year",
        advantages: [
          "Post-study work visa (2-4 years)",
          "High quality of life",
          "Excellent weather",
          "Work up to 48 hours per fortnight",
          "Pathway to permanent residence",
          "Safe environment"
        ],
        popularPrograms: [
          "Nursing & Healthcare",
          "Engineering (Mining, Civil, Mechanical)",
          "Information Technology",
          "Business & Commerce",
          "Hospitality & Tourism"
        ]
      }
    },

    // Transit Visa Information
    transitVisa: {
      definition: "A transit visa allows you to pass through a country on your way to another destination. Usually valid for 24-72 hours.",
      
      requiresVisa: [
        "🇺🇸 United States - C-1 Transit Visa required (even for short layovers)",
        "🇬🇧 United Kingdom - Direct Airside Transit Visa (DATV) required",
        "🇨🇦 Canada - Transit visa required (unless you have valid US visa)",
        "🇦🇺 Australia - Transit Visa (subclass 771) required",
        "🇨🇳 China - Required for layovers over 24 hours",
        "🇮🇳 India - Required for layovers over 24 hours"
      ],
      
      noVisaNeeded: [
        "🇦🇪 UAE (Dubai) - 96 hours visa-free transit",
        "🇹🇷 Turkey - Up to 24 hours without visa",
        "🇸🇬 Singapore - 96 hours visa-free transit",
        "🇶🇦 Qatar - 96 hours visa-free with Qatar Airways",
        "🇪🇹 Ethiopia - Transit without visa if not leaving airport",
        "🇰🇪 Kenya - Transit without visa (72 hours max)",
        "🇿🇦 South Africa - Transit without visa if staying in airport"
      ]
    },

    // Tour Packages
    tours: [
      {
        name: "Dubai Experience",
        duration: "5-7 days",
        price: "From ₦550,000",
        highlights: "Burj Khalifa, Desert Safari, Dubai Mall, Palm Jumeirah, Gold Souk"
      },
      {
        name: "London & Paris Romance",
        duration: "8-10 days",
        price: "From ₦1,450,000",
        highlights: "Eiffel Tower, Big Ben, Louvre, Versailles, Thames Cruise"
      },
      {
        name: "Kenya Safari Adventure",
        duration: "7-10 days",
        price: "From ₦980,000",
        highlights: "Masai Mara, Big Five wildlife, Nairobi Park, Cultural villages"
      },
      {
        name: "Egypt Historical Tour",
        duration: "7-9 days",
        price: "From ₦850,000",
        highlights: "Pyramids, Sphinx, Nile Cruise, Luxor temples, Cairo Museum"
      },
      {
        name: "South Africa Explorer",
        duration: "7-10 days",
        price: "From ₦920,000",
        highlights: "Table Mountain, Kruger Safari, Wine tasting, Cape Point"
      },
      {
        name: "Maldives Paradise",
        duration: "5-7 days",
        price: "From ₦1,800,000",
        highlights: "Overwater villas, Pristine beaches, Snorkeling, Spa treatments"
      }
    ],

    // Flight Information
    flights: {
      airlines: [
        "Emirates - Dubai hub",
        "Qatar Airways - Doha hub",
        "Turkish Airlines - Istanbul hub",
        "Ethiopian Airlines - African carrier",
        "British Airways - London routes",
        "KLM - Amsterdam hub",
        "Air Peace - Nigerian carrier"
      ],
      popularRoutes: [
        "Lagos to London - from ₦650,000",
        "Lagos to Toronto - from ₦850,000",
        "Lagos to Dubai - from ₦420,000",
        "Lagos to New York - from ₦1,200,000",
        "Lagos to Johannesburg - from ₦380,000"
      ]
    }
  },

  // AI Response Generator
  generateResponse(query) {
    const q = query.toLowerCase();
    
    // Greetings
    if (q.match(/^(hi|hello|hey|good morning|good afternoon|good evening)$/)) {
      return {
        response: `👋 Hello! I'm **Caya.ai**, your intelligent travel assistant!

I can help you with:
🎓 **Study Abroad** (Canada, USA, UK, Australia)
✈️ **Flight Bookings**
🛂 **Transit Visa Information**
🌍 **Tour Packages**

What would you like to know about?`
      };
    }

    // Study Abroad - Canada
    if (q.includes('canada') || q.includes('study') && q.includes('canada')) {
      const canada = this.knowledgeBase.studyAbroad.canada;
      return {
        response: `🍁 **Study in ${canada.name}**

📚 ${canada.programs}
💰 Tuition: ${canada.tuition}

**Why Canada?**
${canada.advantages.map(a => `✓ ${a}`).join('\n')}

**Popular Programs:**
${canada.popularPrograms.map(p => `• ${p}`).join('\n')}

**Top Cities:**
${canada.cities.map(c => `• ${c}`).join('\n')}

📞 Call us: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Study Abroad - USA
    if (q.includes('usa') || q.includes('america') || q.includes('united states')) {
      const usa = this.knowledgeBase.studyAbroad.usa;
      return {
        response: `🇺🇸 **Study in ${usa.name}**

📚 ${usa.programs}
💰 Tuition: ${usa.tuition}

**Why USA?**
${usa.advantages.map(a => `✓ ${a}`).join('\n')}

**Popular Programs:**
${usa.popularPrograms.map(p => `• ${p}`).join('\n')}

📞 Call us: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Study Abroad - UK
    if (q.includes('uk') || q.includes('united kingdom') || q.includes('britain') || q.includes('england') || q.includes('london')) {
      const uk = this.knowledgeBase.studyAbroad.uk;
      return {
        response: `🇬🇧 **Study in ${uk.name}**

📚 ${uk.programs}
💰 Tuition: ${uk.tuition}

**Why UK?**
${uk.advantages.map(a => `✓ ${a}`).join('\n')}

**Popular Programs:**
${uk.popularPrograms.map(p => `• ${p}`).join('\n')}

📞 Call us: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Study Abroad - Australia
    if (q.includes('australia') || q.includes('aussie')) {
      const aus = this.knowledgeBase.studyAbroad.australia;
      return {
        response: `🇦🇺 **Study in ${aus.name}**

📚 ${aus.programs}
💰 Tuition: ${aus.tuition}

**Why Australia?**
${aus.advantages.map(a => `✓ ${a}`).join('\n')}

**Popular Programs:**
${aus.popularPrograms.map(p => `• ${p}`).join('\n')}

📞 Call us: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Study Abroad - General
    if (q.includes('study') || q.includes('university') || q.includes('abroad') || q.includes('education')) {
      return {
        response: `🎓 **Study Abroad with CAYA EXPRESS**

We help you study in:
🍁 **Canada** - PGWP, PR pathway, affordable
🇺🇸 **USA** - Top universities, OPT work permit
🇬🇧 **UK** - 1-year Master's, Graduate visa
🇦🇺 **Australia** - Great weather, work rights

**Our Services:**
✓ University application assistance
✓ Program selection counseling
✓ Document preparation
✓ Visa application support
✓ Pre-departure orientation
✓ Accommodation assistance

**Which country interests you?** Ask me about Canada, USA, UK, or Australia!

📞 Call us: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Transit Visa
    if (q.includes('transit') || q.includes('layover') || q.includes('connecting')) {
      if (q.includes('what') || q.includes('definition')) {
        return {
          response: `🛂 **Transit Visa Explained**

${this.knowledgeBase.transitVisa.definition}

**Countries Requiring Transit Visa:**
${this.knowledgeBase.transitVisa.requiresVisa.join('\n')}

**Visa-Free Transit Countries:**
${this.knowledgeBase.transitVisa.noVisaNeeded.join('\n')}

Need help with transit visa? 
📞 ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
        };
      }
      return {
        response: `🛂 **Transit Visa Information**

**Countries Requiring Transit Visa:**
${this.knowledgeBase.transitVisa.requiresVisa.join('\n')}

**Visa-Free Transit:**
${this.knowledgeBase.transitVisa.noVisaNeeded.join('\n')}

📞 Need assistance? Call ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Tours
    if (q.includes('tour') || q.includes('package') || q.includes('vacation') || q.includes('holiday')) {
      const tours = this.knowledgeBase.tours;
      return {
        response: `🌍 **Tour Packages Available**

${tours.map((t, i) => `${i + 1}. **${t.name}** (${t.duration})
   ${t.price}
   ${t.highlights}`).join('\n\n')}

**We also offer:**
✓ Custom tour packages
✓ Group bookings
✓ Honeymoon specials
✓ Safari adventures
✓ Religious pilgrimages

📞 Book now: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
      };
    }

    // Flights
    if (q.includes('flight') || q.includes('ticket') || q.includes('book') || q.includes('airline')) {
      return {
        response: `✈️ **International Flight Bookings**

**Airlines We Work With:**
${this.knowledgeBase.flights.airlines.map(a => `• ${a}`).join('\n')}

**Popular Routes & Prices:**
${this.knowledgeBase.flights.popularRoutes.map(r => `• ${r}`).join('\n')}

**Services:**
✓ International & domestic flights
✓ Best price guarantee
✓ Group bookings
✓ Travel insurance
✓ Visa flight itinerary
✓ 24/7 support

📞 Book now: ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}
📧 ${this.knowledgeBase.companyInfo.email}`
      };
    }

    // Contact
    if (q.includes('contact') || q.includes('phone') || q.includes('call') || q.includes('email')) {
      return {
        response: `📞 **Contact CAYA EXPRESS TRAVEL**

**Phone Numbers:**
📱 ${this.knowledgeBase.companyInfo.phone1}
📱 ${this.knowledgeBase.companyInfo.phone2}

**Email:**
📧 ${this.knowledgeBase.companyInfo.email}

**Available:** 24/7 Support

We're here to help with:
✓ Study abroad consultancy
✓ Flight bookings
✓ Transit visas
✓ Tour packages
✓ Travel insurance`
      };
    }

    // Default response
    return {
      response: `👋 **Hi! I'm Caya.ai**

I can help you with:

🎓 **Study Abroad** - Ask me about Canada, USA, UK, or Australia
✈️ **Flight Bookings** - Get best prices on international flights
🛂 **Transit Visas** - Know which countries require transit visas
🌍 **Tour Packages** - Dubai, Paris, Safari, Egypt & more

**Try asking:**
• "Tell me about studying in Canada"
• "What tour packages do you have?"
• "Do I need a transit visa for Dubai?"
• "Book a flight to London"
• "Contact information"

📞 ${this.knowledgeBase.companyInfo.phone1} | ${this.knowledgeBase.companyInfo.phone2}`
    };
  }
};

// Make available globally
window.cayaAI = cayaAI;
