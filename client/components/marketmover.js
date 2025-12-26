import { useState, useEffect } from "react";
import { useMarket } from "@/context/marketmoverContext";
import Image from "next/image";
function MarketMover() {
  const { getMarketMover } = useMarket();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [movers, setMovers] = useState([]);

  const marketMover = async () => {
    setLoading(true);
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
    <div>
      <div>
        <h4>Market Movers (24h)</h4>

        {error && <p>{error}</p>}
        {movers.map((m, i) => (
          <div key={i}>
            <h3>
              <span>
                <Image src={m.image} alt={m.name} width={24} height={24} />
              </span>
              <span>
                {m.name} {m.symbol}
              </span>
            </h3>
            <p>{m.price}</p>
            <p>
              <span>Market Cap:{m.marketCap}</span>
              <span>{m.change24h}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MarketMover;
