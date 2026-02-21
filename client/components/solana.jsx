import MainCard from "./maininsightcard";

function Solana() {
  return (
    <MainCard
      data={{
        header: {
          title: "LIVE INTELLIGENCE",
          message:
            "SOL is showing strong relative strength vs ETH and BTC. AI pattern recognition detects a continuation flag on the daily timeframe. Developer activity and DeFi volume spikes support bullish continuation.",
        },
        price: {
          coin: "Solana",
          currentPrice: "$182.40",
          percent: "+5.6%",
          timeframeTabs: ["1D", "1W", "1M"],
        },
        sentiment: {
          sentimentRadius: "Very High",
          sentimentRadiusMessage:
            "Retail and smart money alignment detected",
        },
        signal: {
          institutionalFlow: "Growing",
          momentumScore: "88/100",
          whaleActivity: "Aggressive Buying",
        },
        scenario: {
          forecast: "Bullish Expansion",
          forecastPercent: "+18%",
          portfolioImpact: "High Growth Asset",
          correlation: "0.62 BTC",
        },
      }}
    />
  );
}

export default Solana;