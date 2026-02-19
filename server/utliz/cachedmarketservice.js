import { getCache, setCache } from "./cache.js"; 
import {
  fetchExchangeRate as _fetchExchangeRate,
  calculateExchangeRate,
} from "../services/marketservice.js";

const CACHE_KEY = "exchange_prices";
const CACHE_TTL = 30_000; 

export async function getCachedExchangeRate() {
  const cached = getCache(CACHE_KEY);
  if (cached) return cached;

  const prices = await _fetchExchangeRate();
  setCache(CACHE_KEY, prices, CACHE_TTL);
  return prices;
}

export { calculateExchangeRate };