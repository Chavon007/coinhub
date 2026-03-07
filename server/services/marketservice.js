import dotenv from "dotenv";

import axios from "axios";
import { getCache, setCache } from "../utliz/cache.js";
import Balance from "../model/walletbalance.js";
import { coinGeckoLimiter } from "../utliz/rateLimiter.js";
import { groqLimiter } from "../utliz/rateLimiter.js";
import OpenAI from "openai";

dotenv.config();
const COINGECKO_API_URL = "https://api.coingecko.com/api/v3";
const groqai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const fetchMarketMovers = async () => {
  const cacheKey = "marketMovers";
  const cached = getCache(cacheKey);
  if (cached) {
    return cached;
  }

  try {
    const { data } = await coinGeckoLimiter.execute(() =>
      axios.get(`${COINGECKO_API_URL}/coins/markets`, {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 10,
          page: 1,
          price_change_percentage: "24h",
          // sparkline: true,
        },
        timeout: 30000,
      }),
    );

    const result = data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
    }));
    setCache(cacheKey, result, 3 * 60 * 1000);
    console.log("Market movers cache updated");
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
    `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds}&vs_currencies=usd`,
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
      `https://api.coingecko.com/api/v3/coins/${b.coin}/history?date=${date24hAgo}`,
    );
    const oldPrice = historicalResp.data.market_data?.current_price?.usd || 0;

    const change = oldPrice ? ((currentPrice - oldPrice) / oldPrice) * 100 : 0;

    results.push({
      coin: b.coin,
      amount: b.amount,
      currentPrice,
      oldPrice,
      change: change.toFixed(2),
      value: (b.amount * currentPrice).toFixed(2),
    });
  }
  const totalValue = results.reduce((acc, c) => acc + parseFloat(c.value), 0);

  return { totalValue, coins: results };
};

//  fetch exchange rate
export const fetchExchangeRate = async () => {
  const { data } = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: {
        ids: "bitcoin,ethereum,solana,ripple",
        vs_currencies: "usd",
      },
    },
  );
  return data;
};

// exchange rate for each coin
export const calculateExchageRate = (prices, fromCoin, toCoin) => {
  if (!prices || !prices[fromCoin] || !prices[toCoin]) {
    throw new Error(`Invalid prices for ${fromCoin} -> ${toCoin}`);
  }
  const fromPriceUSD = prices[fromCoin].usd;
  const toPriceUSD = prices[toCoin].usd;
  // how many tocoin you get for 1 fromcoin

  const rate = fromPriceUSD / toPriceUSD;

  return rate;
};

// fetch top market mover whale activity

export const fetchTopCoinMover = async () => {
  const cacheKey = "topCoinMovers";
  const cached = getCache(cacheKey);

  if (cached) return cached;

  try {
    const { data } = await axios.get(`${COINGECKO_API_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
        price_change_percentage: "24h",
      },
    });

    // Use change24h & marketCap as whale proxy

    const results = data.map((coin) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
      currentPrice: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      whaleProxy: coin.market_cap * Math.abs(coin.price_change_percentage_24h),
    }));

    setCache(cacheKey, results, 3 * 6 * 1000);

    return results;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// fetch sentiment from crypto newws Api

export const fetchSentiment = async (ticker = "BTC") => {
  try {
    const { data } = await axios.get("https://cryptopanic.com/api/v1/posts/", {
      params: {
        currencies: ticker,

        auth_token: process.env.CRYPTOPANIC_API_KEY,
      },
    });

    // calculate simple sentiment score

    const sentimentScore = data.results?.reduce((acc, a) => {
      const bullish = a.votes?.positive || 0;
      const bearish = a.votes?.negative || 0;

      return acc + bullish - bearish;
    }, 0);

    return { score: sentimentScore || 0, articles: data.results || [] };
  } catch (err) {
    console.error(err);
    return { score: 0, article: [] };
  }
};

// AI prediction with groq ai

export const fetchPrediction = async (coinData) => {
  const { name, currentPrice, change24h, whaleProxy, sentimentScore } =
    coinData;

  const prompt = `You are a crypto market analyst. Analyze this crypto data and return JSON only. 
  Coin:${name}
  Price: ${currentPrice},
  24h Change:${change24h},
  Whale Activity: ${whaleProxy},
  Sentiment Score:${sentimentScore} (positive = bullish news, negative = bearish news, 0 = neutral),
 
  Return only in JSON array with a single object:[{
  "prediction": "expected % move in the next 24h",
  "advice": "1-2 sentence advice for the traders",
  "sentimentRadius": "one word: BULLISH, BEARISH, or NEUTRAL",
  "sentimentRadiusMessage": "1 sentence explaining the market mood based on the data",
  "institutionalFlow": "HIGH, MODERATE, or LOW based on market cap and whale activity",
  "momentumScore": "a score from 0-100 based on price change and whale activity",
  "confidence": "percentage e.g 72%",
  "target": "price target in next 24h e.g 95.00",
  "volatility": "LOW, MEDIUM, or HIGH based on 24h change magnitude"
}]`;

  try {
    const res = await groqLimiter.execute(() =>
      groqai.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a JSON-only API. Return valid JSON arrays with no markdown, no code blocks, no extra text.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.3,
      }),
    );

    const content = res.choices[0].message.content.trim();
    const clean = content.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);

    return parsed[0] || { prediction: "0%", advice: "No advice available" };
  } catch (err) {
    console.error("❌ GROQ ERROR:", err.message);
    return { prediction: "0%", advice: "Prediction temporarily unavailable" };
  }
};

// combine the prediction, sentiment and top coin movers
export const fetchCoinInsight = async (coinId, ticker) => {
  const cacheKey = `coinInsight${coinId}`;

  const cached = getCache(cacheKey);
  if (cached) {
    console.log(" cache hit", coinId);
    return cached;
  }

  console.log("Generating insight", coinId);

  const movers = await fetchTopCoinMover();
  const coin = movers.find((c) => c.id === coinId);
  if (!coin) return null;

  const sentiment = await fetchSentiment(ticker);
  const aiPrediction = await fetchPrediction({
    ...coin,
    sentimentScore: sentiment.score,
  });

  const generateCorridorData = (
    currentPrice,
    predictionPercent,
    volatility,
  ) => {
    const predNum = parseFloat(predictionPercent?.replace("%", "") || "0");
    const band =
      { LOW: 0.008, MEDIUM: 0.015, HIGH: 0.025 }[volatility] ?? 0.015;

    return ["1H", "4H", "8H", "12H", "16H", "20H", "24H"].map((time, i) => {
      const progress = i / 6;
      const price = currentPrice * (1 + (predNum / 100) * progress);
      return {
        time,
        price: +price.toFixed(2),
        upper: +(price * (1 + band)).toFixed(2),
        lower: +(price * (1 - band)).toFixed(2),
      };
    });
  };

  const insight = {
    header: {
      title: "LIVE INTELLIGENCE",
      message: `${coin.name} is moving ${coin.change24h.toFixed(2)}% in the last 24h. We’re analyzing whale movements, sentiment trends, and AI signals to uncover where the market could head next.`,
    },
    price: {
      coin: coin.name,
      currentPrice: `$${coin.currentPrice}`,
      percent: `${coin.change24h.toFixed(2)}%`,
      marketCap: coin.marketCap,
      whaleActivity: coin.whaleProxy.toFixed(2),
      timeFrameTabs: ["1H", "24H", "7D"],
      confidence: aiPrediction.confidence,
      target: aiPrediction.target,
      volatility: aiPrediction.volatility,
      corridor: generateCorridorData(
        coin.currentPrice,
        aiPrediction.prediction,
        aiPrediction.volatility,
      ),
    },
    sentiment: {
      score: sentiment.score,
      sentimentRadius: aiPrediction.sentimentRadius,
      sentimentRadiusMessage: aiPrediction.sentimentRadiusMessage,
    },
    signal: {
      aiPrediction: aiPrediction.prediction,
      advice: aiPrediction.advice,
      institutionalFlow: aiPrediction.institutionalFlow,
      momentumScore: aiPrediction.momentumScore,
      whaleActivity: coin.whaleProxy.toFixed(2),
    },
    scenario: {
      forecast: "Groq AI Prediction",
      forecastPercent: aiPrediction.prediction,
      portfolioImpact: "N/A",
      correlation: "N/A",
    },
  };

  // cache for 5 mins
  setCache(cacheKey, insight, 5 * 60 * 1000);

  return insight;
};

//  preload all coin insight

export const preloaderAllInsight = async () => {
  const movers = await fetchTopCoinMover();

  const results = await Promise.allSettled(
    movers.map((coin) => fetchCoinInsight(coin.id, coin.symbol)),
  );

  return results
    .filter((r) => r.status === "fulfilled" && r.value)
    .map((r) => r.value);
};

// ai caht with groq

export const buildSystemPrompt = async (coinContext) => {
  let base = `You are a professional crypto market analyst and assistant.
You help users understand cryptocurrency markets, prices, trends, and investment strategies.
Be concise, clear, and always remind users that crypto is volatile and nothing is financial advice.`;

  if (coinContext) {
    base += `\n\nCurrent coin context:
- Coin: ${coinContext.coin}
- Current Price: $${coinContext.price}
- Market Cap: ${coinContext.marketCap}
- 24h Change: ${coinContext.change24h}%
- Analysis Summary: ${coinContext.analysis}
Use this data to give grounded, real-time answers.`;
  }

  return base;
};
