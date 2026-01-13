import { usePortfolio } from "@/context/portfolioContext";
import { FaWallet } from "react-icons/fa";
function Holdings() {
  const { loading, portfolio } = usePortfolio();

  const seedHoldings = [
    {
      asset: "Bitcoin",
      amount: 0.45,
      price: 42500,
      value: 19125,
      invested: 16000,
      pnl: 3125,
      pnlPercentage: 19.5,
    },
    {
      asset: "Ethereum",
      amount: 3.2,
      price: 2300,
      value: 7360,
      invested: 8000,
      pnl: -640,
      pnlPercentage: -8,
    },
    {
      asset: "Solana",
      amount: 120,
      price: 98,
      value: 11760,
      invested: 9000,
      pnl: 2760,
      pnlPercentage: 30.6,
    },
  ];

  const realHolding = portfolio?.holdings?.map((h) => ({
    asset: h.coin,
    amount: h.amount,
    price: h.currentPrice,
    value: h.totalValue,
    invested: h.invested,
    pnl: h.pnl,
    pnlPercentage: parseFloat(h.pnlPercentage),
  }));

  const theHolding =
    realHolding && realHolding > 0 ? realHolding : seedHoldings;
  if (loading) return <p>loading.....</p>;

  if (!theHolding || theHolding.length === 0)
    return (
      <p className=" flex flex-col gap-2 justify-center items-center text-text-primary h-[40vh] font-outfit italic text-1xl">
        <span className="text-5xl animate-bounce [animation-duration:0.8s]">
          <FaWallet />
        </span>
        <span>You currently do not have any holdings.</span>
      </p>
    );
  return (
    <div className="w-[98%] flex justify-between items-center h-auto">
      <div className="bg-surface w-[75%]   p-[10px]">
        <h4 className="text-text-primary ml-[20px] font-nunito-sans text-1xl font-semibold">
          Holdings
        </h4>

        <table className="p-2 w-full border-collapse">
          <thead className=" bg-surface border-b border-gray-200 ">
            <tr className="text-left text-sm text-text-secondary">
              <th className="py-3 px-4 font-semibold">Asset</th>
              <th className="py-3 px-4 font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold">Price</th>
              <th className="py-3 px-4 font-semibold">Value</th>
              <th className="py-3 px-4 font-semibold">Invested</th>
              <th className="py-3 px-4 font-semibold">P&amp;L</th>
              <th className="py-3 px-4 font-semibold">P&amp;L %</th>
            </tr>
          </thead>

          <tbody>
            {theHolding.map((h, index) => (
              <tr
                className="border-b border-gray-100 hover:bg-gray-50 transition "
                key={index}
              >
                <td className="p-6 font-medium">{h.asset}</td>
                <td className="p-6">{h.amount}</td>
                <td className="p-6 ">{h.price}</td>
                <td className="p-6">{h.value}</td>
                <td className="p-6">{h.invested}</td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    h.pnl >= 0 ? "text-accent-green" : "text-accent-red"
                  }`}
                >
                  {h.pnl}
                </td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    h.pnlPercentage >= 0
                      ? "text-accent-green"
                      : "text-accent-red"
                  }`}
                >
                  {h.pnlPercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        <h2>Token Allocation</h2>

        {theHolding.map((t, index) => (
          <div key={index}>
            <p>
              <span>{t.asset}</span> <span>{t.pnlPercentage}</span>
            </p>
            <p
              className="text-accent-green h-2 rounded-full transition-all"
              style={{ width: `${t.pnlPercentage}` }}
            ></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Holdings;
