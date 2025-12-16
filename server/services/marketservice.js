import axios from "axios";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export const fetchMarketMovers = async () => {
  try {
    const { data } = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        price_change_percentage: "24h",
      },
      timeout: 10000,
    });

    return data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
    }));
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message || "Failed to fetch market movers");
  }
};
