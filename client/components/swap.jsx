"use client";

import { useState, useEffect } from "react";
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

function Swap() {
  const { getEachBalance } = useBalance();
  const { handleSwap, loading, error, success } = useSwap();

  const [fromCoin, setFromCoin] = useState("ethereum");
  const [toCoin, setToCoin] = useState("bitcoin");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [coinBalance, setCoinBalance] = useState([]);

  // Fetch balances
  const fetchBalances = async () => {
    try {
      const data = await getEachBalance();
      setCoinBalance(data.balanceCoin || []);
    } catch (err) {
      console.error(err);
    }
  };

  const getCoinBalance = (coinName) => {
    const balance = coinBalance.find((b) => b.coin === coinName);
    return balance ? balance.amount : 0;
  };

  useEffect(() => {
    fetchBalances();
  }, []);

  // Simple conversion preview (1:1 mock)
  useEffect(() => {
    if (!fromAmount) return setToAmount("");
    setToAmount(fromAmount);
  }, [fromAmount]);

  // Validation
  const validateSwap = () => {
    if (!fromAmount || Number(fromAmount) <= 0) {
      alert("Enter valid amount");
      return false;
    }

    const balance = getCoinBalance(fromCoin);
    if (Number(fromAmount) > balance) {
      alert("Insufficient balance");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateSwap()) return;

    try {
      await handleSwap({
        fromCoin,
        toCoin,
        amount: fromAmount,
      });

      await fetchBalances();
      setFromAmount("");
      setToAmount("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      className=" w-[40%] mx-auto p-6 rounded-3xl shadow  bg-surface  border border-gray-600 flex flex-col  h-auto"
      onSubmit={handleSubmit}
    >
      <h3 className="flex justify-between items-center">
        <span className="text-base font-orbitron font-bold text-accent-green">
          Swap
        </span>{" "}
        <span className="flex justify-between gap-2 items-center  p-2 w-20">
          <span className="bg-background p-2 rounded-2xl">
            <LuRefreshCw className="text-text-secondary text-base font-bold" />
          </span>{" "}
          <span className="bg-background p-2 rounded-2xl">
            <VscSettings className="text-text-secondary text-base font-bold" />
          </span>
        </span>
      </h3>

      {/* FROM */}
      <div className="bg-background  mt-4 flex  flex-col gap-2 p-5 rounded-2xl border-gray-300">
        <p className="font-nunito-sans text-text-secondary font-medium text-sm">
          YOU PAY
        </p>

        <div className="flex justify-between items-center">
          <input
            className=" border-none text-2xl font-roboto text-text-primary placeholder:text-text-primary placeholder:border-none focus:outline-none"
            type="number"
            placeholder="0.0"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
          />

          <select
            className="bg-surface p-1 rounded-2xl text-text-secondary font-roboto text-base font-bold focus:outline-none"
            value={fromCoin}
            onChange={(e) => {
              const value = e.target.value;
              setFromCoin(value);
              if (value === toCoin) setToCoin("bitcoin");
            }}
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
            {getCoinBalance(fromCoin).toFixed(6)}
          </span>
        </p>
      </div>
      <div className="flex my-2  text-text-secondary justify-center items-center text-2xl">
        <IoSwapVertical />
      </div>
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

          <select className="bg-surface p-1 rounded-2xl text-text-secondary font-roboto text-base font-bold focus:outline-none value={toCoin} onChange={(e) => setToCoin(e.target.value)}">
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
