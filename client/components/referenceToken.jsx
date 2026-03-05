const coin = [
  {
    name: "BTC",
    price: "$94,210",
    value: "+1.2%",
  },
  {
    name: "SOL",
    price: "$142.50",
    value: "+3.8%",
  },
  {
    name: "ETH",
    price: "80,125",
    value: "-1.5%",
  },
  {
    name: "XRP",
    price: "$1.3",
    value: "-0.6%",
  },
];

const aiConfeidence = [
  {
    title: "Data freshness",
    level: "96%",
  },
  {
    title: "On-chain",
    level: "88%",
  },
  {
    title: "Sentiment",
    level: "84%",
  },
];

const portfolioSnapShot = [
  {
    title: "",
    value: "",
    assets: 7,
  },
];

function ReferenceToken() {
  return (
    <div className="w-[20%]">
      {/* Referenced Tokens */}
      <div>
        <h4>Referenced Tokens</h4>
        <div>
          {coin.map((c, index) => (
            <div key={index}>
              <p>
                <span>{c.name}</span>
                <span>{c.price}</span>
              </p>
              <p>{c.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Confidence */}

      <div>
        <div>
          <h4>AI Confidence</h4>
          {aiConfeidence.map((a, index) => (
            <div key={index}>
              <p>
                <span>{a.title}</span> <span>{a.level}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Snapshot */}

      <div>
        <h4>Portfolio Snapshot</h4>
        <div>
          {portfolioSnapShot.map((p, index) => (
            <div key={index}>
              <p>
                <span>Value:</span> <span>{p.title}</span>
              </p>
              <p>
                <span>24h P&L:</span> <span>{p.value}</span>
              </p>
              <p>
                <span>Assets:</span> <span>{p.assets}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReferenceToken;
