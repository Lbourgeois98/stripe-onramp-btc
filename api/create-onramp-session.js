// api/create-onramp-session.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const STRIPE_SECRET = process.env.STRIPE_SECRET; // must be set in Vercel
    const STRIPE_API = "https://api.stripe.com/v1/crypto/onramp_sessions";

    const { amount } = await req.json(); // get amount from frontend

    const destination_currency = "btc";
    const destination_network = "bitcoin";
    const WALLET_ADDRESS = "39zC2iwMf6qzmVVEcBdfXG6WpVn84Mwxzv"; // 🔒 your BTC wallet

    const params = new URLSearchParams();
    params.append(
      "customer_ip_address",
      req.headers["x-forwarded-for"] || "127.0.0.1"
    );
    params.append("source_amount", amount);
    params.append("source_currency", "usd");
    params.append("destination_currency", destination_currency);
    params.append("destination_network", destination_network);
    params.append(`wallet_addresses[${destination_network}]`, WALLET_ADDRESS);
    params.append("lock_wallet_address", "true");

    const resp = await fetch(STRIPE_API, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + Buffer.from(`${STRIPE_SECRET}:`).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const data = await resp.json();
    if (!resp.ok) {
      return res.status(resp.status).json(data);
    }

    return res.status(200).json({
      redirect_url: data.redirect_url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
