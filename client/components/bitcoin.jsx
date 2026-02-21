import MainCard from "./maininsightcard";

function Bitcoin() {
  return (
    <MainCard
      data={{
        header: {
          title: "LIVE INTELLIGENCE",
          message:
            "BTC is consolidating near key resistance at $68K. AI momentum models show decreasing volatility but rising institutional inflows. A breakout above resistance could trigger a +6% move within 24–48 hours.",
        },
        price: {
          coin: "Bitcoin",
          currentPrice: "$67,850",
          percent: "+1.8%",
          timeframeTabs: ["1D", "1W", "1M"],
        },
        sentiment: {
          sentimentRadius: "Moderate Bullish",
          sentimentRadiusMessage:
            "ETF inflows stabilizing, long-term sentiment remains positive",
        },
        signal: {
          institutionalFlow: "Very Strong",
          momentumScore: "76/100",
          whaleActivity: "Accumulating",
        },
        scenario: {
          forecast: "Resistance Breakout",
          forecastPercent: "+9%",
          portfolioImpact: "Very High",
          correlation: "1.00 Market Leader",
        },
      }}
    />
  );
}

export default Bitcoin;
