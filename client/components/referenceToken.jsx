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
    title: "$48,230",
    value: "+$1,420",
    assets: 7,
  },
];

function ReferenceToken() {
  return (
    <div className="w-[20%] shadow-2xl flex flex-col gap-2 p-4 shadow-gray-500">
      {/* Referenced Tokens */}
      <div className=" border-b border-b-gray-500 px-2 pt-2 pb-7  flex flex-col gap-2">
        <h4 className="text-text-secondary font-outfit font-light text-sm">
          Referenced Tokens
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {coin.map((c, index) => (
            <div
              className="flex justify-between bg-surface rounded border border-gray-300 p-2 items-center"
              key={index}
            >
              <p className="flex flex-col">
                <span className="text-base font-roboto font-bold text-text-primary">
                  {c.name}
                </span>
                <span className="text-xs italic font-nunito-sans font-light text-text-secondary">
                  {c.price}
                </span>
              </p>
              <p
                className={`${c.value?.startsWith("-") ? "text-red-500" : "text-accent-green"} font-light font-outfit text-sm`}
              >
                {c.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Confidence */}

      <div className=" border-b border-b-gray-500 px-2 pt-2 pb-7  flex flex-col gap-2">
        <h4 className="text-text-secondary font-outfit font-light text-sm">
          AI Confidence
        </h4>
        <div className="grid grid-cols-1 gap-2">
          {aiConfeidence.map((a, index) => (
            <div className="" key={index}>
              <p className="flex justify-between items-center">
                <span className="text-text-primary text-xs font-outfit font-bold">
                  {a.title}
                </span>{" "}
                <span
                  className={`${a.level?.startsWith("-") ? "text-red-500" : "text-accent-green"} font-light text-xs font-outfit`}
                >
                  {a.level}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Portfolio Snapshot */}

      <div className="px-2 pt-2 pb-7  flex flex-col gap-2">
        <h4 className="text-text-secondary font-outfit font-light text-sm">
          Portfolio Snapshot
        </h4>
        <div className="grid grid-cols-1 gap-3">
          {portfolioSnapShot.map((p, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <p className="flex items-center gap-2">
                <span className="text-text-primary font-outfit text-xs font-light">
                  Value:
                </span>{" "}
                <span className="text-text-secondary text-xs font-bold font-nunito-sans">
                  {p.title}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-text-primary font-outfit text-xs font-light">
                  24h P&L:
                </span>{" "}
                <span
                  className={`${p.value?.startsWith("-") ? "text-red-500" : "text-accent-green"} text-sm font-nunito-sans font-bold`}
                >
                  {p.value}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-text-primary font-outfit text-xs font-light">
                  Assets:
                </span>{" "}
                <span className="text-text-secondary text-xs font-bold font-nunito-sans">
                  {p.assets}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReferenceToken;
