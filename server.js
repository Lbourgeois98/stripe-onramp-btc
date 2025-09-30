// server.js
import express from "express";
import fetch from "node-fetch";
import path from "path";

const app = express();
app.use(express.json());

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY; // put in Fly.io secrets
const BTC_WALLET = "39zC2iwMf6qzmVVEcBdfXG6WpVn84Mwxzv"; // your BTC address

// Serve the deposit page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Deposit with Stripe</title>
      </head>
      <body style="font-family: sans-serif; text-align: center; padding: 50px;">
        <h1>Deposit</h1>
        <input id="depositAmount" type="number" placeholder="Enter amount (USD)" min="10"
          style="padding: 10px; font-size: 16px; width: 200px; text-align: center" />
        <br><br>
        <button id="depositBtn" style="padding: 12px 24px; font-size: 16px">Deposit</button>

        <script>
          document.getElementById("depositBtn").addEventListener("click", async () => {
            const amount = document.getElementById("depositAmount").value;
            if (!amount || amount <= 0) {
              alert("Please enter a valid amount.");
              return;
            }

            try {
              const resp = await fetch("/create-onramp-session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
              });
              const data = await resp.json();
              if (data.redirect_url) {
                window.location.href = data.redirect_url;
              } else {
                alert("Error: " + JSON.stringify(data));
              }
            } catch (err) {
              alert("Error: " + err.message);
            }
          });
        </script>
      </body>
    </html>
  `);
});

// Stripe Onramp session endpoint
app.post("/create-onramp-session", async (req, res) => {
  try {
    const { amount } = req.body;

    const params = new URLSearchParams();
    params.append("destination_currency", "btc");
    params.append("destination_network", "bitcoin");
    params.append(`wallet_addresses[bitcoin]`, BTC_WALLET);
    params.append("lock_wallet_address", "true");
    params.append("transaction_details[fiat_currency]", "usd");
    params.append("transaction_details[fiat_amount]", amount);

    const response = await fetch("https://api.stripe.com/v1/crypto/onramp_sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
