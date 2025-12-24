"use client";
import { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import { useBalance } from "@/context/balanceContext";
import { FaAngleDoubleDown } from "react-icons/fa";
import Link from "next/link";

function TotalBalance() {
  const { totalBalance, portfolioChange } = useBalance();
  const [loadingBalance, setLoadingBalance] = useState(false);
  const [loadingPortfolio, setLoadingPortfolio] = useState(false);
  const [balance, setBalance] = useState(0);
  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState("");

  const fetchTotalBalance = async () => {
    setLoadingBalance(true);
    try {
      const data = await totalBalance();
      setBalance(data.totalAmount);
    } catch (err) {
      setError("Can't fetch balance now");
    } finally {
      setLoadingBalance(false);
    }
  };

  const portfolioRate = async () => {
    setLoadingPortfolio(true);
    try {
      const data = await portfolioChange();
      setPortfolio(data);
    } catch (err) {
      setError("Can't fetch portfolio change");
    } finally {
      setLoadingPortfolio(false);
    }
  };

  useEffect(() => {
    fetchTotalBalance();
    portfolioRate();
  }, []);

  return (
    <div className="bg-surface mt-[10px] w-[98%] mx-auto p-[10px] rounded rounded-1 border border-1 border-border">
      <div>
        <h6 className="text-text-secondary text-xs italic font-nunito-sans">
          Total Portfolio Value
        </h6>
        <div>
          <p className="text-error text-xs font-outfit italic">{error}</p>
          {loadingBalance || loadingPortfolio ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h5 className=" p-[5px] font-roboto text-text-primary text-5xl">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(balance)}
              </h5>
              <p className=" p-[1px]">
                <span className="text-accent-green text-xs font-outfit">
                  {portfolio?.totalValue || 0}
                </span>{" "}
                <span className="text-text-secondary text-xs italic font-nunito-sans">
                  Last 24h
                </span>
              </p>
            </div>
          )}

          <div className=" flex gap-2  w-[40%] md:w-[20%] justify-between items-center p-[5px]">
            <Link
              className="flex items-center  bg-accent-blue w-[100px] rounded hover:bg-blue-700 rounded-1xl p-[5px] justify-center gap-1"
              href="/send"
            >
              <span className="text-text-primary text-2xl ">
                <IoIosSend />
              </span>
              <span className="text-1xl text-text-primary font-bold font-roboto">
                Send
              </span>
            </Link>
            <Link
              className="flex items-center  bg-accent-green w-[100px] rounded hover:bg-green-700 rounded-1xl p-[5px] justify-center gap-1"
              href="/send"
            >
              <span className="text-text-primary text-2xl ">
                <FaAngleDoubleDown />
              </span>
              <span className="text-1xl text-text-primary font-bold font-roboto">
                Receive
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalance;
