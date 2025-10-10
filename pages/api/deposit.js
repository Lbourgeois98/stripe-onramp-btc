module.exports = async (req, res) => {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  try {
    const BTC_WALLET = "39zC2iwMf6qzmVVEcBdfXG6WpVn84Mwxzv";

    const params = new URLSearchParams();
    params.append("destination_currency", "btc");
    params.append("destination_network", "bitcoin");
    params.append(`wallet_addresses[bitcoin]`, BTC_WALLET);
    params.append("lock_wallet_address", "true");

    const response = await fetch("https://api.stripe.com/v1/crypto/onramp_sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (data.redirect_url) {
      res.writeHead(302, { Location: data.redirect_url });
      res.end();
    } else {
      res.status(400).json({ error: data });
    }
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: err.message });
  }
};
