import axios from "axios";
// import { getCache, setCache} from "../utliz/cache.js";
import Balance from "../model/walletbalance.js";

const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";

export const fetchMarketMovers = async () => {
  // const cacheKey = "marketMovers";
  // const cached = getCache(cacheKey);
  // if (cached) {
   
  //   return cached;
  // }

  try {
    const { data } = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        price_change_percentage: "24h",
        // sparkline: true,
      },
      timeout: 30000,
    });

    const result = data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
    }));
    // setCache(cacheKey, result, 60 * 1000);
    // console.log("Market movers cache updated");
    return result;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.message || "Failed to fetch market movers");
  }
};

//Get  holdings rate

export const getPortfolioChangeService = async (walletId) => {
  const balances = await Balance.find({ walletId });
  if (!balances.length) throw new Error("No balances found");

  const coinIds = balances.map((b) => b.coin).join(",");
  const todayPricesResp = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`
  );

  const todayPrices = todayPricesResp.data;

  const getData24hAgo = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const date24hAgo = getData24hAgo();
  const results = [];

  for (let b of balances) {
    const currentPrice = todayPrices[b.coin]?.usd || 0;

    const historicalResp = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${b.coin}/history?date=${date24hAgo}`
    );
    const oldPrice = historicalResp.data.market_data?.current_price?.usd || 0;

    const change = oldPrice ? ((currentPrice - oldPrice) / oldPrice) * 100 : 0;

    results.push({
      coin: b.coin,
      amount: b.amount,
      currentPrice,
      oldPrice,
      change: change.toFixed(2), // percentage
      value: (b.amount * currentPrice).toFixed(2),
    });
  }
  const totalValue = results.reduce((acc, c) => acc + parseFloat(c.value), 0);

  return { totalValue, coins: results };
};
