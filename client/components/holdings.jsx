import Image from "next/image";
import { usePortfolio } from "@/context/portfolioContext";
import { FaWallet } from "react-icons/fa";
import FormatAmount from "./formatamount";
function Holdings() {
  const { loading, portfolio } = usePortfolio();

  const seedHoldings = [
    {
      image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
      abb: "BTC",
      asset: "Bitcoin",
      amount: 0.45,
      price: 42500,
      value: 19125,
      invested: 16000,
      pnl: 3125,
      pnlPercentage: 19.5,
    },
    {
      image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
      abb: "ETH",
      asset: "Ethereum",
      amount: 3.2,
      price: 2300,
      value: 7360,
      invested: 8000,
      pnl: -640,
      pnlPercentage: -8,
    },
    {
      image: "https://cryptologos.cc/logos/solana-sol-logo.png",
      abb: "SOL",
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
    realHolding && realHolding.length > 0 ? realHolding : seedHoldings;
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
    <div className="w-[98%] flex justify-between  gap-3 items-center h-auto">
      <div className="bg-surface w-[70%]  rounded-2xl p-[10px]">
        <h4 className="text-text-primary ml-[20px] font-nunito-sans text-1xl font-semibold">
          Holdings
        </h4>

        <table className="p-2 w-full border-collapse">
          <thead className=" bg-surface border-b border-gray-200 ">
            <tr className="text-left text-sm text-text-secondary">
              <th className="py-3 px-4  text-center font-outfit font-bold">
                Asset
              </th>
              <th className="py-3 px-4 text-center font-semibold">Amount</th>
              <th className="py-3 px-4 font-semibold text-center">Price</th>
              <th className="py-3 px-4 font-semibold text-center">Value</th>
              <th className="py-3 px-4 font-semibold text-center">Invested</th>
              <th className="py-3 px-4 font-semibold text-center">P&amp;L</th>
              <th className="py-3 px-4 text-center font-semibold">P&amp;L %</th>
            </tr>
          </thead>

          <tbody>
            {theHolding.map((h, index) => (
              <tr className=" border-b-1  border-border  " key={index}>
                <td className="p-6  flex items-center  gap-3 font-nunito-sans text-text-primary font-bold text-1xl">
                  <span>
                    <Image
                      src={h.image}
                      alt={h.asset}
                      width={20}
                      height={20}
                      className="rounded-2xl"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span>{h.abb}</span>
                    <span className="text-xs text-text-secondary">
                      {h.asset}
                    </span>
                  </span>
                </td>
                <td className="p-6 font-nunito-sans text-text-primary font-medium text-sm">
                  {h.amount}
                </td>
                <td className="p-6  font-nunito-sans text-text-primary font-medium text-sm">
                  {FormatAmount(h.price)}
                </td>
                <td className="p-6 font-nunito-sans text-text-primary font-medium text-sm">
                  {FormatAmount(h.value)}
                </td>
                <td className="p-6 font-nunito-sans text-text-primary font-medium text-sm">
                  {FormatAmount(h.invested)}
                </td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    h.pnl >= 0 ? "text-accent-green" : "text-red-500"
                  }`}
                >
                  {FormatAmount(h.pnl)}
                </td>

                <td
                  className={`py-3 px-4 font-semibold ${
                    h.pnlPercentage >= 0 ? "text-accent-green" : "text-red-500"
                  }`}
                >
                  {h.pnlPercentage}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-surface w-[40%] rounded-2xl h-[350px] p-[10px]">
        <h2 className="text-text-primary py-2 font-nunito-sans text-1xl font-bold">
          Token Allocation
        </h2>

        {theHolding.map((t, index) => (
          <div key={index}>
            <p className="flex p-4 justify-between items-center">
              <span className="flex items-center gap-3">
                <span>
                  <Image
                    src={t.image}
                    alt={t.abb}
                    width={20}
                    height={20}
                    className="rounded-2xl"
                  />
                </span>
                <span className="font-nunito-sans text-text-primary font-bold text-1xl">
                  {t.abb}
                </span>
              </span>{" "}
              <span className="text-text-secondary text-1xl font-outfit ">
                {t.pnlPercentage}%
              </span>
            </p>

            <div className="w-full bg-background  h-2 rounded-full">
              <div
                className={`h-2 rounded-full transition-all ${
                  t.pnlPercentage >= 0 ? "bg-accent-green" : "bg-red-500"
                }`}
                style={{ width: `${Math.abs(t.pnlPercentage)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Holdings;
