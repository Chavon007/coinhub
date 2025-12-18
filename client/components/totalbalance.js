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
    <div>
      <div>
        <h6>Total Portfolio Value</h6>
        <div>
          <p>{error}</p>
          {loadingBalance || loadingPortfolio ? (
            <p>Loading...</p>
          ) : (
            <div>
              <h5>{balance}</h5>
              <p>
                <span>{portfolio?.totalValue || 0}</span> <span>Last 24h</span>
              </p>
            </div>
          )}

          <div>
            <Link href="/send">
              <span>
                <IoIosSend />
              </span>
              <span>Send</span>
            </Link>
            <Link href="/send">
              <span>
                <FaAngleDoubleDown />
              </span>
              <span>Receive</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TotalBalance;
