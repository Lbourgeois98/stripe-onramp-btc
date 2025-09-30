// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const BTC_WALLET = "39zC2iwMf6qzmVVEcBdfXG6WpVn84Mwxzv"; // your BTC wallet

// Create Stripe Onramp session and redirect immediately
app.get("/deposit", async (req, res) => {
  try {
    const params = new URLSearchParams();
    params.append("destination_currency", "btc");
    params.append("destination_network", "bitcoin");
    params.append(`wallet_addresses[bitcoin]`, BTC_WALLET);
    params.append("lock_wallet_address", "true");

    const response = await fetch("https://api.stripe.com/v1/crypto/onramp_sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();

    if (data.redirect_url) {
      res.redirect(data.redirect_url); // send user to Stripe hosted onramp
    } else {
      res.status(400).send("Error creating session: " + JSON.stringify(data));
    }
  } catch (err) {
    res.status(500).send("Server error: " + err.message);
  }
});

// Simple homepage with one deposit button
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align:center; padding:50px; font-family:sans-serif;">
        <h1>Deposit with Crypto</h1>
        <a href="/deposit" style="
            display:inline-block;
            padding:15px 30px;
            background:#635bff;
            color:#fff;
            font-size:18px;
            border-radius:8px;
            text-decoration:none;">
          Deposit Now
        </a>
      </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
