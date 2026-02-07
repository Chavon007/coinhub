 export const fetchCoinPrice = async () => {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,ripple&vs_currencies=usd",
    );

    if (!res.ok) throw new Error("Failed to fetch price");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

//  excahange rate for each coin

export const calculateExchageRate = (prices, fromCoin, toCoin) => {
  if (!prices || !prices[fromCoin] || !prices[toCoin]) {
    return 0;
  }
  const fromPrice = prices[fromCoin].usd;
  const toPrice = prices[toCoin].uds;
  // how many tocoin you get for 1 fromcoin

  const rate = fromPrice / toPrice;

  return rate;
};

