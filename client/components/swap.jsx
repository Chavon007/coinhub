import { useState, useEffect } from "react";
import Image from "next/image";
import { LuRefreshCw } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import { useBalance } from "@/context/balanceContext";

const avaliableCoin = [
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

  useEffect(() => {
    fetchBalances();
  }, []);

  // fetch all balance
  const fetchBalances = async () => {
    try {
      const data = await getEachBalance();
      setCoinBalnce(data.balanceCoin || []);
    } catch (err) {
      console.error(err);
    }
  };

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
                onChange={(e) => setFromCoin(e.target.value)}
              >
                {avaliableCoin.map((c, index) => (
                  <option key={index} value={c.value}>
                    <span>{c.image}</span>
                    <span>{c.symbol}</span>
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
                <span>{getCoinBalance(fromCoin).toFixed(6)}</span>
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
                {avaliableCoin.map((a, index) => (
                  <option key={index} value={a.value}>
                    <span>{a.image}</span> <span>{a.symbol}</span>
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
            <p>{estimateRateModal ? "Enter Amount" : "Swap"}</p>
          </div>
        </form>
      </div>

      {/*  */}
      <div></div>
    </div>
  );
}

export default Swap;
