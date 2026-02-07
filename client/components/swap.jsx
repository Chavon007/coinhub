import { useState, useEffect } from "react";

import { fetchCoinPrice, calculateExchageRate } from "../hook/coinupadte";
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
  const [coinPrices, setCoinPrices] = useState(null);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const fetchPrice = async () => {
    setIsLoadingPrices(true);
    try {
      const data = await fetchCoinPrice();
      setCoinPrices(data);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsLoadingPrices(false);
    }
  };
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

  useEffect(() => {
    fetchBalances();
    fetchPrice();
  }, []);

  // Fetches price of coin every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchPrice();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // calculate exchange rate when coin change

  useEffect(() => {
    if (coinPrices) {
      const rate = calculateExchageRate(coinPrices, fromCoin, toCoin);
      setExchangeRate(rate);
    }
  }, [coinPrices, fromCoin, toCoin]);

  // calculate toAmount when from Amount or rate changes
  useEffect(() => {
    if (!fromAmount || !exchangeRate) {
      setToAmount("");
      return;
    }

    setToAmount((Number(fromAmount) * exchangeRate).toFixed(6));
  }, [fromAmount, fromCoin, toCoin]);

  useEffect(() => {
    if (fromAmount && toAmount && exchangeRate) {
      setEstimateRateModal(true);
    } else {
      setEstimateRateModal(false);
    }
  }, [fromAmount, toAmount, exchangeRate]);

  // Validaton check

  const validateSwap = () => {
    setError("");

    if (!fromAmount || Number(fromAmount) <= 0) {
      setError("please enter a valid amoount");
      return false;
    }

    const currentBalance = getCoinBalance(fromCoin);
    if (fromAmount > currentBalance) {
      setError(`Insufficient ${fromCoin.toUpperCase()} balance`);
      return false;
    }
    if (!exchangeRate || exchangeRate === 0) {
      setError("Exchange rate not available. Please try again");
      return false;
    }

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSwap()) {
      return;
    }
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("url for swap", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fromCoin,
          toCoin,
          fromAmount,
          toAmount,
          exchangeRate,
        }),
      });
      if (!res.ok) {
        setError("Failed to Swap coin");
        return;
      }

      const data = await res.json();
      setSuccess("Swap successful");

      await fetchBalances();

      setFromAmount("");
      setToAmount("");

      console.log(data);

      setTimeout(() => {
        setSuccess("");
      }, 5000);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* SWAP FORM */}
      <div>
        <form onSubmit={handleSubmit}>
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
                  <span>
                    1 {availableCoin.find((c) => c.value === fromCoin)?.symbol}{" "}
                    = {exchangeRate.toFixed(6)}{" "}
                    {availableCoin.find((c) => c.value === toCoin)?.symbol}
                  </span>
                </p>
                <p>
                  <span>Pricte Impact</span>
                  <span>{"<0.01%"}</span>
                </p>
                <p>
                  <span>Minimum received</span>
                  <span>
                    {(Number(toAmount) * 0.995).toFixed(5)}{" "}
                    {availableCoin.find((c) => c.value === toCoin)?.symbol}
                  </span>
                </p>
                <p>
                  <span>Slippage tolerance</span>
                  <span>0.5%</span>
                </p>
                <p>
                  <span>Network fee</span>
                  <span>~$2.50</span>
                </p>
              </div>
            </div>
          )}

          <div>
            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || !fromAmount || Number(fromAmount) <= 0}
          >
            <p>
              {loading
                ? "Swapping..."
                : fromAmount && Number(fromAmount) > 0
                  ? "Swap"
                  : "Enter Amount"}
            </p>
          </button>
        </form>
      </div>

      {/*  */}
      <div></div>
    </div>
  );
}

export default Swap;
