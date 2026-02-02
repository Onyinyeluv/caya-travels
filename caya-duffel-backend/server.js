import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Duffel } from "@duffel/api";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();

// CORS configuration to allow both development and production origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'http://localhost:5500',
      'http://127.0.0.1:5500',
      'http://localhost:3001',
      'http://127.0.0.1:3001',
      // Add your production domain here (uncomment and update):
      // 'https://yourdomain.com',
      // 'https://www.yourdomain.com'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.warn('CORS blocked origin:', origin);
      callback(null, true); // For now, allow all origins during testing
      // callback(new Error('Not allowed by CORS')); // Uncomment in production for security
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || "cayaexpresstravels@gmail.com",
    pass: process.env.EMAIL_PASSWORD
  }
});

// Test endpoint to verify server is running
app.get("/", (req, res) => {
  res.json({ message: "Duffel API Backend is running!", status: "ok" });
});

app.post("/search-flights", async (req, res) => {
  console.log("Received request:", req.body);
  
  try {
    console.log("Calling Duffel API...");
    console.log("API Key:", process.env.DUFFEL_API_KEY ? "Configured" : "NOT SET");
    
    const slices = [
      {
        origin: req.body.origin,
        destination: req.body.destination,
        departure_date: req.body.date
      }
    ];

    if (req.body.returnDate) {
      slices.push({
        origin: req.body.destination,
        destination: req.body.origin,
        departure_date: req.body.returnDate
      });
    }

    const response = await duffel.offerRequests.create({
      slices,
      passengers: [{ type: "adult" }],
      cabin_class: req.body.cabinClass || "economy"
    });

    console.log(`Found ${response.data.offers.length} offers`);
    
    const offersWithDetails = response.data.offers.map(o => {
      const totalPrice = Number(o.total_amount);
      const markupAmount = 200 * (o.slices?.length || 1);
      const finalPrice = totalPrice + markupAmount;
      
      return {
        offer_id: o.id,
        airline_price: totalPrice,
        markup: markupAmount,
        final_price: finalPrice,
        currency: o.total_currency,
        slices: o.slices?.map(slice => ({
          origin_iata: slice.origin?.iata_code || slice.origin_iata,
          destination_iata: slice.destination?.iata_code || slice.destination_iata,
          origin: slice.origin?.iata_code || slice.origin_iata,
          destination: slice.destination?.iata_code || slice.destination_iata,
          departure_time: slice.departing_at || slice.departure_time,
          arrival_time: slice.arriving_at || slice.arrival_time,
          duration: slice.duration,
          stops: slice.segments?.length - 1 || 0,
          total_stops: slice.segments?.length - 1 || 0,
          segment_count: slice.segments?.length || 0,
          segments: slice.segments?.map((seg, idx) => ({
            segment_number: idx + 1,
            operating_airline: seg.operating_carrier?.iata_code || seg.operating_airline?.iata || "?",
            airline_name: seg.operating_carrier?.name || seg.operating_airline?.name || "Unknown Airline",
            aircraft_code: seg.aircraft?.iata_code || seg.aircraft?.iata || "?",
            aircraft_name: seg.aircraft?.name || "Unknown Aircraft",
            departure_time: seg.departing_at || seg.departure_time,
            arrival_time: seg.arriving_at || seg.arrival_time,
            origin_iata: seg.origin?.iata_code || seg.origin_iata,
            destination_iata: seg.destination?.iata_code || seg.destination_iata,
            origin: seg.origin?.iata_code || seg.origin_iata,
            destination: seg.destination?.iata_code || seg.destination_iata,
            flight_number: seg.flight_number || seg.operating_carrier_flight_number || "N/A",
            marketing_airline: seg.marketing_carrier?.iata_code || seg.marketing_airline?.iata || seg.operating_carrier?.iata_code || "?",
            marketing_airline_name: seg.marketing_carrier?.name || seg.marketing_airline?.name || seg.operating_carrier?.name || "Unknown"
          })) || []
        })) || []
      };
    });

    res.json(offersWithDetails);
  } catch (err) {
    console.error("\n=== DETAILED ERROR INFORMATION ===");
    console.error("Error Message:", err.message);
    console.error("Error Status:", err.status);
    console.error("Error Code:", err.code);
    
    if (err.errors) {
      console.error("Errors Array:", JSON.stringify(err.errors, null, 2));
    }
    
    if (err.response) {
      console.error("Response Status:", err.response.status);
      console.error("Response Data:", JSON.stringify(err.response.data, null, 2));
    }
    
    console.error("Full Error Object:", JSON.stringify(err, null, 2));
    console.error("=== END ERROR ===\n");
    
    res.status(500).json({ 
      error: err.message,
      details: err.errors || [],
      status: err.status
    });
  }
});

app.post("/submit-reservation", async (req, res) => {
  console.log("Reservation request:", req.body);
  
  try {
    const { passenger, flight } = req.body;
    
    const mailOptions = {
      from: process.env.EMAIL_USER || "cayaexpresstravels@gmail.com",
      to: "cayaexpresstravels@gmail.com",
      subject: `New Flight Reservation - ${passenger.surname}, ${passenger.given_names}`,
      html: `
        <h2>New Flight Reservation</h2>
        <h3>Passenger Details:</h3>
        <p><strong>Surname:</strong> ${passenger.surname}</p>
        <p><strong>Given Names:</strong> ${passenger.given_names}</p>
        <p><strong>Email:</strong> ${passenger.email}</p>
        <p><strong>Phone:</strong> ${passenger.phone}</p>
        <p><strong>Date of Birth:</strong> ${passenger.dob}</p>
        <p><strong>Nationality:</strong> ${passenger.nationality}</p>
        <p><strong>Passport Number:</strong> ${passenger.passport}</p>
        
        <h3>Flight Details:</h3>
        <p><strong>Offer ID:</strong> ${flight.offer_id}</p>
        <p><strong>Total Fare:</strong> ${flight.currency} ${flight.final_price.toFixed(2)}</p>
        <p><strong>Route:</strong> ${flight.origin} → ${flight.destination}</p>
        <p><strong>Departure:</strong> ${flight.departure_time}</p>
        <p><strong>Arrival:</strong> ${flight.arrival_time}</p>
        
        <p>Please confirm this reservation.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    
    res.json({ 
      success: true, 
      message: "Reservation submitted successfully. We will contact you shortly." 
    });
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ 
      error: "Failed to submit reservation. Please try again.",
      details: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0'; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
  console.log("Robot running on http://localhost:" + PORT);
  console.log("Listening on http://127.0.0.1:" + PORT);
  console.log(`Server accessible at http://${HOST}:${PORT}`);
  console.log("API Key configured:", process.env.DUFFEL_API_KEY ? "Yes" : "No");
});
