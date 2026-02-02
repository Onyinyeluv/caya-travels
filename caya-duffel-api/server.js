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
    const response = await duffel.offerRequests.create({
      slices: [
        {
          origin: req.body.origin,
          destination: req.body.destination,
          departure_date: req.body.date
        }
      ],
      passengers: [{ type: "adult" }],
      cabin_class: "economy"
    });

    // ADD $200 MARKUP HERE
    const offersWithMarkup = response.data.offers.map(offer => {
      return {
        ...offer,
        marked_up_price:
          Number(offer.total_amount) + 200
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
