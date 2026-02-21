import MainCard from "./maininsightcard";

function Ripple() {
  return (
    <MainCard
      data={{
        header: {
          title: "LIVE INTELLIGENCE",
          message:
            "XRP is entering a low-volatility compression phase. AI liquidity models indicate a potential volatility expansion soon. Legal clarity and cross-border payment adoption continue to support long-term upside.",
        },
        price: {
          coin: "Ripple (XRP)",
          currentPrice: "$0.74",
          percent: "+0.9%",
          timeframeTabs: ["1D", "1W", "1M"],
        },
        sentiment: {
          sentimentRadius: "Neutral Bullish",
          sentimentRadiusMessage:
            "Market waiting for catalyst, sentiment slowly improving",
        },
        signal: {
          institutionalFlow: "Neutral",
          momentumScore: "61/100",
          whaleActivity: "Dormant but Watching",
        },
        scenario: {
          forecast: "Volatility Expansion",
          forecastPercent: "+14%",
          portfolioImpact: "Medium",
          correlation: "0.48 BTC",
        },
      }}
    />
  );
}

export default Ripple;
