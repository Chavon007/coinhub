import { useState, useEffect } from "react";

import { LuRefreshCw } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import { useBalance } from "@/context/balanceContext";

const availableCoin = [
  {
    value: "ethereum",
    label: "Ethereum",
    symbol: "ETH",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    value: "bitcoin",
    label: "Bitcoin",
    symbol: "BTC",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    value: "solana",
    label: "Solana",
    symbol: "SOL",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    value: "ripple",
    label: "Ripple",
    symbol: "XRP",
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
];

function Swap() {
  const { getEachBalance } = useBalance();

  const [fromCoin, setFromCoin] = useState("ethereum");
  const [toCoin, setToCoin] = useState("bitcoin");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [coinBalance, setCoinBalnce] = useState([]);
  const [estimateRateModal, setEstimateRateModal] = useState(false);

  // fetch all balance
  const fetchBalances = async () => {
    try {
      const data = await getEachBalance();
      setCoinBalnce(data.balanceCoin || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [getEachBalance]);

  useEffect(() => {
    if (!fromAmount) {
      setToAmount("");
      return;
    }
    const rate = 0.98;

    setToAmount((Number(fromAmount) * rate).toFixed(6));
  }, [fromAmount, fromCoin, toCoin]);

  // filter the balance
  const getCoinBalance = (coinName) => {
    const balance = coinBalance.find((b) => b.coin === coinName);
    return balance ? balance.amount : 0;
  };
  return (
    <div>
      {/* SWAP FORM */}
      <div>
        <form>
          {/* header */}
          <div>
            <h3>Swap</h3>
            <p>
              <span>
                <LuRefreshCw />
              </span>
              <span>
                <VscSettings />
              </span>
            </p>
          </div>

          {/* You pay */}
          <div>
            {/* header & balance */}
            <div>
              <h4>You Pay</h4>

              <p>
                <span>Balance:</span>{" "}
                <span>{getCoinBalance(fromCoin).toFixed(6)}</span>
              </p>
            </div>

            {/* input fields */}
            <div>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => setFromAmount(e.target.value)}
                placeholder="0.0"
              />

              <select
                value={fromCoin}
                onChange={(e) => {
                  const value = e.target.value;
                  setFromCoin(value);

                  if (fromCoin === toCoin) {
                    setToCoin(fromCoin === "ethereum" ? "bitcoin" : "ethereum");
                    return;
                  }
                }}
              >
                {availableCoin.map((c, index) => (
                  <option key={index} value={c.value}>
                    {c.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* you receive */}

          <div>
            {/* header & balance */}
            <div>
              <h4>You Receve</h4>

              <p>
                <span>Balance:</span>{" "}
                <span>{getCoinBalance(toCoin).toFixed(6)}</span>
              </p>
            </div>

            {/* input fields */}
            <div>
              <input
                type="number"
                placeholder="0.0"
                value={toAmount}
                readOnly
              />

              <select
                value={toCoin}
                onChange={(e) => setToCoin(e.target.value)}
              >
                {availableCoin.map((a, index) => (
                  <option key={index} value={a.value}>
                    {a.symbol}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* estimateRateModal */}

          {estimateRateModal && (
            <div>
              <div>
                <p>
                  <span>Rate</span>
                  <span></span>
                </p>
                <p>
                  <span>Pricte Impact</span>
                  <span></span>
                </p>
                <p>
                  <span>Minimum received</span>
                  <span></span>
                </p>
                <p>
                  <span>Slippage tolerance</span>
                  <span></span>
                </p>
                <p>
                  <span>Network fee</span>
                  <span></span>
                </p>
              </div>
            </div>
          )}

          <div>
            <p>{fromAmount ? "Swap" : "Enter Amount"}</p>
          </div>
        </form>
      </div>

      {/*  */}
      <div></div>
    </div>
  );
}

export default Swap;
