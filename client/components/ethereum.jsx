import MainCard from "./maininsightcard";

function Ethereum() {
  return (
    <MainCard
      data={{
        header: {
          title: "LIVE INTELLIGENCE",
          message:
            "ETH is showing strong bullish divergence on the 4H timeframe. AI models predict a +4.2% breakout within 18 hours. Whale accumulation has increased by 12%.",
        },
        price: {
          coin: "Ethereum",
          currentPrice: "$3,245",
          percent: "+4.2%",
          timeframeTabs: ["1D", "1W", "1M"],
          conference: "94.8%",
          target: "$7,800",
          volatility: "Medium",
        },
        sentiment: {
          sentimentRadius: "High",
          sentimentRadiusMessage: "Institutional accumulation detected",
        },
        signal: {
          institutionalFlow: "Strong",
          momentumScore: "82/100",
          whaleActivity: "Rising",
        },
        scenario: {
          forecast: "Bullish Continuation",
          forecastPercent: "+12%",
          portfolioImpact: "High",
          correlation: "0.74 BTC",
        },
      }}
    />
  );
}
export default Ethereum;
