// server.js
import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const BTC_WALLET = "39zC2iwMf6qzmVVEcBdfXG6WpVn84Mwxzv"; // your BTC wallet

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
    res.json(data); // contains redirect_url
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Deposit with Stripe Onramp</h1>
    <input id="amount" type="number" min="10" placeholder="Enter amount in USD"/>
    <button onclick="deposit()">Deposit</button>

    <script>
      async function deposit() {
        const amount = document.getElementById("amount").value;
        const resp = await fetch("/create-onramp-session", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({ amount })
        });
        const data = await resp.json();
        if (data.redirect_url) {
          window.location.href = data.redirect_url; // take user to Stripe's hosted page
        } else {
          alert("Error: " + JSON.stringify(data));
        }
      }
    </script>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
