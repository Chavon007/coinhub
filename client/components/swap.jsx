"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { VscSettings } from "react-icons/vsc";
import { useBalance } from "@/context/balanceContext";
import useSwap from "../hook/swaphook";
import { IoSwapVertical } from "react-icons/io5";

const availableCoin = [
  { value: "ethereum", symbol: "ETH" },
  { value: "bitcoin", symbol: "BTC" },
  { value: "solana", symbol: "SOL" },
  { value: "ripple", symbol: "XRP" },
];

const SLIPPAGE_PRESETS = [0.1, 0.5, 1.0];
const DEBOUNCE_MS = 500;

function getCoinSymbol(value) {
  return availableCoin.find((c) => c.value === value)?.symbol ?? value;
}
function Swap() {
  const { getEachBalance } = useBalance();
  const {
    handleSwap,
    fetchPreview,
    loading,
    previewLoading,
    preview,
    error: swapError,
    success,
    clearStatus,
  } = useSwap();

  const [fromCoin, setFromCoin] = useState("ethereum");
  const [toCoin, setToCoin] = useState("bitcoin");
  const [fromAmount, setFromAmount] = useState("");
  // const [toAmount, setToAmount] = useState("");
  const [coinBalance, setCoinBalance] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [slippage, setslippage] = useState(0.5);
  const [customSlippage, setCustomSlippage] = useState("");
  const [validationError, setValidationError] = useState("");
  const debounceRef = useRef(null);
  // Fetch balances
  const fetchBalances = useCallback(async () => {
    try {
      const data = await getEachBalance();
      setCoinBalance(data.balanceCoin ?? []);
    } catch (err) {
      console.error(err);
    }
  }, [getEachBalance]);

  const getCoinBalance = useCallback(
    (coinName) => {
      const balance = coinBalance.find((b) => b.coin === coinName);
      return balance ? balance.amount : 0;
    },
    [coinBalance],
  );

  useEffect(() => {
    fetchBalances();
  }, [fetchBalances]);

  // Debounced preview fetch

  useEffect(() => {
    clearStatus();
    setValidationError("");

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      fetchPreview({ fromCoin, toCoin, fromAmount });
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
  }, [fromCoin, toCoin, fromAmount]);

  // handlers

  const handleFlip = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    setFromAmount("");
  };

  const handleFromCoinChange = (e) => {
    const value = e.target.value;
    setFromCoin(value);

    // prevent same coin selection

    if (value === toCoin) {
      setToCoin(availableCoin.find((c) => c.value !== value).value);
    }
  };

  const handleToChange = (e) => {
    const value = e.target.value;
    setToCoin(value);

    if (value === fromCoin) {
      setFromCoin(availableCoin.find((c) => c.value !== value).value);
    }
  };

  const handleSlippagePreset = (val) => {
    setslippage(val);
    setCustomSlippage("");
  };

  const handleCustomSlippage = (e) => {
    const val = e.target.value;
    setCustomSlippage(val);
    const num = parseFloat(val);

    if (!isNaN(num) && num > 0 && num <= 50) setslippage(num);
  };

  const handleMaxAmount = () => {
    const bal = getCoinBalance(fromCoin);
    setFromAmount(bal > 0 ? String(bal) : "");
  };

  // Validation
  const validateSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      setValidationError("Enter valid amount");
      return false;
    }

    const balance = getCoinBalance(fromCoin);
    if (Number(fromAmount) > balance) {
      alert("Insufficient balance");
      return false;
    }

    if (fromCoin === toCoin) {
      setValidationError("Cannot swap a coin for itself");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");

    if (!validateSwap()) return;

    try {
      await handleSwap({
        fromCoin,
        toCoin,
        fromAmount,
        slippage,
      });

      await fetchBalances();
      setFromAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  // derived display values

  const displayError = validationError || swapError;
  const toAmountDisplay = preview?.toAmount?.toFixed(8) ?? "-";
  const rateDisplay = preview?.exchangeRate
    ? `1 ${getCoinSymbol(fromCoin)} = ${preview.exchangeRate.toFixed(6)} ${getCoinSymbol(toCoin)}`
    : null;
  const priceImpact = preview?.priceImpact;

  const submitDisabled =
    loading || !fromAmount || (Number(fromAmount) <= 0) | previewLoading;

  return (
    <form
      className=" w-[40%] mx-auto p-6 rounded-3xl shadow  bg-surface  border border-gray-600 flex flex-col  h-auto"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between items-center">
        <span className="text-base font-orbitron font-bold text-accent-green">
          Swap
        </span>{" "}
        <div className="flex justify-between gap-2 items-center  p-2 w-20">
          <button
            type="button"
            onClick={fetchBalances}
            title="Refresh balances"
            className="bg-background p-2 rounded-2xl"
          >
            <LuRefreshCw className="text-text-secondary text-base font-bold" />
          </button>{" "}
          <button
            type="button"
            onClick={() => setShowSettings((v) => !v)}
            title="Swap Settings"
            className={`bg-background p-2 rounded-2xl hover:bg-gray-700 transition-colors ${
              showSettings ? "ring-1 ring-accent-green" : ""
            }`}
          >
            <VscSettings className="text-text-secondary text-base font-bold" />
          </button>
        </div>
      </div>

      {/* setting modal */}

      {showSettings && (
        <div>
          <p> Slippage Tolerance</p>

          <div>
            {SLIPPAGE_PRESETS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleSlippagePreset(val)}
              >
                {val}%
              </button>
            ))}

            <div>
              <input
                type="number"
                min="0.01"
                max="50"
                step="0.01"
                placeholder="Custom"
                value={customSlippage}
                onChange={handleCustomSlippage}
              />{" "}
              <span>%</span>
            </div>
          </div>
          {slippage > 5 && (
            <p>High slippage — your trade may be frontrun</p>
          )}
        </div>
      )}

      {/* FROM */}
      <div className="bg-background  mt-4 flex  flex-col gap-2 p-5 rounded-2xl border-gray-300">
        <p className="font-nunito-sans text-text-secondary font-medium text-sm">
          YOU PAY
        </p>

        <div className="flex justify-between items-center">
          <input
            className=" border-none text-2xl font-roboto text-text-primary placeholder:text-text-primary placeholder:border-none focus:outline-none"
            type="number"
            min="0"
            step="any"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />

          <select
            className="bg-surface p-1 rounded-2xl text-text-secondary font-roboto text-base font-bold focus:outline-none"
            value={fromCoin}
            onChange={handleFromCoinChange}
          >
            {availableCoin.map((c) => (
              <option
                className="text-text-primary font-roboto text-base font-light"
                key={c.value}
                value={c.value}
              >
                {c.symbol}
              </option>
            ))}
          </select>
        </div>
        <p className="flex items-center  gap-1">
          <span className="text-text-secondary font-bold font-nunito-sans text-sm">
            Balance:
          </span>{" "}
          <span className="text-accent-green text-base font-roboto font-light">
            {getCoinBalance(fromCoin).toFixed(6)} {getCoinSymbol(fromCoin)}
          </span>
        </p>
      </div>
     <button
        type="button"
        onClick={handleFlip}
        title="Flip pair"
        className="flex text-text-secondary justify-center items-center text-2xl hover:text-accent-green transition-colors"
      >
        <IoSwapVertical />
      </button>
      {/* TO */}
      <div className="bg-background flex  flex-col gap-2 p-5 rounded-2xl border-gray-300">
        <p className="font-nunito-sans text-text-secondary font-medium text-sm">
          You Recieve
        </p>

        <div className="flex justify-between items-center">
          <input
            className="border-none text-2xl font-roboto text-text-primary placeholder:text-text-primary placeholder:border-none focus:outline-none"
            type="number"
            value={toAmount}
            readOnly
          />

          <select
            className="bg-surface p-1 rounded-2xl text-text-secondary font-roboto text-base font-bold focus:outline-none"
            value={toCoin}
            onChange={(e) => setToCoin(e.target.value)}
          >
            {availableCoin.map((c) => (
              <option
                className="text-text-primary font-roboto text-base font-light"
                key={c.value}
                value={c.value}
              >
                {c.symbol}
              </option>
            ))}
          </select>
        </div>

        <p className="flex items-center  gap-1">
          <span className="text-text-secondary font-bold font-nunito-sans text-sm">
            Balance:
          </span>{" "}
          <span className="text-accent-green text-base font-roboto font-light">
            {getCoinBalance(toCoin).toFixed(6)}
          </span>
        </p>
      </div>

      {/* STATUS */}
      {error && <p className="text-base font-outfit text-red-500">{error}</p>}
      {success && (
        <p className="text-base font-outfit text-green-500">{success}</p>
      )}

      <button
        className="bg-accent-blue w-[180px] mt-7 rounded-2xl p-2 mx-auto  hover:bg-blue-400 text-base font-roboto text-text-primary font-bold"
        type="submit"
        disabled={loading || !fromAmount}
      >
        {loading ? "SWAPPING..." : "SWAP"}
      </button>
    </form>
  );
}

export default Swap;
