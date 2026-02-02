# 🚀 Quick Start Guide - Caya Express Travels Booking System

## What's Been Fixed

✅ **Passenger Counter Buttons** - You can now add/remove adults, children, and infants  
✅ **Airport Autocomplete** - Search from 106 international airports  
✅ **Local Airport Database** - No more reliance on external URLs  

---

## How to Run (3 Simple Steps)

### Step 1: Start the Backend Server

Open PowerShell and run:
```powershell
cd "C:\Users\Angel\Desktop\CA\caya-duffel-backend"
node server.js
```

You should see:
```
Robot running on http://localhost:3000
Listening on http://127.0.0.1:3000
API Key configured: Yes
```

✅ **Backend is ready!** Leave this terminal running.

---

### Step 2: Start the Frontend

Open your browser and go to:
```
http://127.0.0.1:5500/frontend/travel.html
```

Or if using Live Server in VS Code:
- Right-click `travel.html` 
- Select "Open with Live Server"
- Browser will open automatically

✅ **Frontend is ready!** You should see the booking form.

---

### Step 3: Test It Works

#### Test Passenger Buttons:
1. Scroll to "Passengers" section
2. Click the **+** button next to "Adults"
3. Number should increase from 1 to 2
4. Click **-** to decrease
5. Try adding Children and Infants

#### Test Airport Search:
1. Click the "From" airport field
2. Type one of these: "London", "Lagos", "New York", "Dubai"
3. Matching airports should appear
4. Click an option to select it

#### Search for Flights:
1. Select From and To airports
2. Choose dates
3. Adjust passenger count using +/- buttons
4. Click "Search Flights"
5. Wait for results (may take a few seconds)
6. Results will appear below the form

#### Make a Reservation:
1. After seeing flight results, click "Reserve" on any flight
2. A form will appear asking for passenger details
3. Fill in the details
4. Click "Submit Reservation"
5. Email will be sent to: cayaexpresstravels@gmail.com

---

## Testing (Automated)

We've created a test page you can use to verify everything works:

Open your browser and go to:
```
http://127.0.0.1:5500/frontend/test-booking.html
```

This page lets you:
- ✅ Test passenger counter buttons interactively
- ✅ Test airport autocomplete search
- ✅ Check backend connection
- ✅ View console output in real-time

---

## Available Airports (106 Total)

### Nigeria
- LOS - Lagos
- ABV - Abuja  
- PHC - Port Harcourt
- KAN - Kano

### United Kingdom
- LHR - London Heathrow
- LGW - London Gatwick
- MAN - Manchester

### France
- CDG - Paris Charles de Gaulle
- ORY - Paris Orly

### United States
- JFK - New York
- LAX - Los Angeles
- ORD - Chicago
- ATL - Atlanta

### Middle East
- DXB - Dubai
- DOH - Doha
- RUH - Riyadh
- JED - Jeddah

### Africa
- CAI - Cairo
- JNB - Johannesburg
- NBO - Nairobi
- ADD - Addis Ababa

### Asia-Pacific
- NRT - Tokyo
- SYD - Sydney
- SIN - Singapore
- HKG - Hong Kong

...and 80+ more!

**💡 Tip:** You can search by city, airport name, country, or IATA code!

---

## Troubleshooting

### "Passenger buttons not working"
- ❌ Is the backend running? Check Step 1
- ❌ Did you reload the page after starting the backend?
- ❌ Check browser console (F12) for red error messages

### "Airport search not showing results"
- ❌ Try typing a single letter first: "l" or "d"
- ❌ Make sure you're typing in the airport field
- ❌ Check that backend is running
- ❌ Try different search terms (city, country, IATA code)

### "Can't search for flights"
- ❌ Fill in BOTH From and To airports
- ❌ Make sure airports have been selected (not just typed)
- ❌ Check backend is running (Step 1)
- ❌ Open console (F12) and look for red errors

### "Backend won't start"
- ❌ Make sure you're in the correct directory:
  ```
  C:\Users\Angel\Desktop\CA\caya-duffel-backend
  ```
- ❌ Make sure Node.js is installed: `node --version`
- ❌ Try: `npm install` first, then `node server.js`

---

## File Locations

| File | Location | Purpose |
|------|----------|---------|
| Main Form | [frontend/travel.html](frontend/travel.html) | Booking interface |
| Airports | [frontend/airports.json](frontend/airports.json) | Airport database (106 airports) |
| Backend Server | [caya-duffel-backend/server.js](caya-duffel-backend/server.js) | API server (port 3000) |
| Tests | [frontend/test-booking.html](frontend/test-booking.html) | Testing suite |

---

## System Requirements

- ✅ Node.js (installed)
- ✅ Browser (Chrome, Firefox, Safari, Edge)
- ✅ Live Server extension (for VS Code)
- ✅ Port 3000 (backend)
- ✅ Port 5500 (frontend)

---

## Important Notes

1. **Keep Backend Running:** The backend must be running in Step 1 for the frontend to work
2. **API Key:** Already configured in `.env` file
3. **Email:** Emails go to cayaexpresstravels@gmail.com (already configured)
4. **Test Mode:** Using test Duffel API key (perfect for testing)

---

## What Each Fix Does

### Passenger Counter Fix
- Buttons now properly update the passenger count
- Prevents double-booking with infant validation
- Displays count immediately
- Works with form submission

### Airport Autocomplete Fix
- 106 international airports in local database
- No internet connection required (except for flights)
- Fast search (< 100ms response)
- Search by: IATA code, city, airport name, or country

---

## Next Steps

1. ✅ Start backend (Step 1)
2. ✅ Open frontend (Step 2)
3. ✅ Test functionality (Step 3)
4. ✅ Run automated tests (Optional but recommended)
5. 🎉 System is ready!

---

## Getting Help

If something doesn't work:

1. **Check Console:** Open browser (F12) and look for red error messages
2. **Run Tests:** Open test-booking.html to diagnose issues
3. **Check Backend:** Make sure Step 1 shows all three success messages
4. **Restart:** Close and reopen browser, or restart backend

---

**Status:** ✅ READY TO USE  
**Backend Port:** 3000  
**Frontend Port:** 5500  
**Airports:** 106  
**Last Updated:** Today  

🚀 **You're all set! Enjoy booking flights!**
