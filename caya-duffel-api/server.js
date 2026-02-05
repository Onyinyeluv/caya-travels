import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Duffel } from "@duffel/api";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const duffel = new Duffel({
  token: process.env.DUFFEL_API_KEY
});

// Flight search endpoint
app.post("/search-flights", async (req, res) => {
  try {
    const slices = [
      {
        origin: req.body.origin,
        destination: req.body.destination,
        departure_date: req.body.date
      }
    ];

    const isReturnTrip = req.body.returnDate ? true : false;

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

    // USD to Naira conversion rate
    const USD_TO_NGN = 1650;
    // $200 markup on every fare
    const FARE_MARKUP = 200;

    // Add markup to every fare and convert to Naira
    const offersWithMarkup = response.data.offers.map(offer => {
      const totalPrice = Number(offer.total_amount);
      const markupAmount = FARE_MARKUP;
      const finalPrice = totalPrice + markupAmount;
      const finalPriceNGN = finalPrice * USD_TO_NGN;

      return {
        ...offer,
        airline_price_usd: totalPrice,
        markup_usd: markupAmount,
        final_price_usd: finalPrice,
        final_price_ngn: finalPriceNGN,
        exchange_rate: USD_TO_NGN
      };
    });

    res.json(offersWithMarkup);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("Duffel server running on http://localhost:3000");
});
