import { useState, useEffect } from "react";
import { useMarket } from "@/context/marketmoverContext";
import { FaArrowTrendUp } from "react-icons/fa6";

import Image from "next/image";
function MarketMover() {
  const { getMarketMover } = useMarket();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [movers, setMovers] = useState([]);

  const marketMover = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getMarketMover();
      setMovers(data.slice(0, 4));
    } catch (err) {
      setError("Can't fetch market now");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    marketMover();
  }, [getMarketMover]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-surface mt-[30px] w-[98%] mx-auto p-[10px] rounded rounded-2 border border-1 border-border">
      <div className="flex flex-col p-2">
        <h4 className="lg:w-[20%]  flex items-center gap-2 p-[10px] ">
          <span className="text-accent-green text-1xl">
            <FaArrowTrendUp />
          </span>
          <span className="text-text-secondary text-1xl font-roboto font-bold">
            Market Movers (24h)
          </span>
        </h4>

        {error && <p className="text-error p-1 text-xs">{error}</p>}
        <div className="grid md:grid-cols-2 gap-3">
          {movers.map((m, i) => (
            <div
              key={i}
              className="bg-background rounded-2xl p-4 transition-transform cursor-pointer hover:scale-[1.03] flex flex-col gap-3"
            >
              {/* Header with image and name */}
              <h3 className="flex gap-2 items-center font-semibold text-sm sm:text-base">
                <span>
                  <Image src={m.image} alt={m.name} width={24} height={24} />
                </span>
                <span className="text-text-primary font-roboto text-1xl">
                  {m.name}{" "}
                  <span className="uppercase text-gray-500">({m.symbol})</span>
                </span>
              </h3>

              {/* Price */}
              <p className="font-outfit text-text-secondary font-medium text-sm sm:text-2xl">
                ${m.price.toLocaleString()}
              </p>

              {/* Market Cap and 24h change */}
              <p className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-text-secondary text-xs font-nunito-sans italic">
                  Market Cap: ${m.marketCap.toLocaleString()}
                </span>
                <span
                  className={`${
                    m.change24h >= 0 ? "text-green-500" : "text-red-500"
                  }  italic font-outfit italic`}
                >
                  {m.change24h?.toFixed(2)}%
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default MarketMover;
