"use client";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { useBalance } from "@/context/balanceContext";
import { FaAngleDoubleDown } from "react-icons/fa";
import Link from "next/link";

function TotalBalance() {
  const { totalBalance } = useBalance;
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState("");

  const fetchTotalBalance = async () => {
    setLoading(true);
    try {
      const data = await totalBalance();
      setBalance(data.totalAmount);
    } catch (err) {
      setError("Can't fetch balance now");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h6>Total Portfolio Value</h6>
        <div>
          <p>{error}</p>
          {loading && (
            <div>
              <h5>{balance}</h5>
              <p>
                <span></span> <span>Last 24h</span>
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
