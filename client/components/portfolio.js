"use client";

import Holdings from "./holdings";
import { FaDownload } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { usePortfolio } from "@/context/portfolioContext";
import { FaWallet } from "react-icons/fa";
import { useState } from "react";
import History from "./history";

function MainPort() {
  const { loading, error, portfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState("overview");
  if (loading) return <p>loading....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!loading) return <p>No portfolio data</p>;

  const totalDetails = [
    {
      icon: <FaWallet className="text-accentgreen" />,
      title: "Total Value",
      amount: portfolio?.totalValue || 0,
    },
    {
      title: "Total Invested",
      amount: portfolio?.totalInvested || 0,
    },
    {
      icon:
        (portfolio?.totalPnL || 0) >= 0 ? (
          <FaArrowTrendUp className="text-accent-green" />
        ) : (
          <FaArrowTrendDown className="text-accent-red" />
        ),
      title: "Total P&L",
      amount: portfolio?.totalPnL || 0,
    },
    {
      title: "P&L Percentage",
      amount: portfolio?.pnlPercentage || 0,
    },
  ];

  return (
    <div>
      {/* header */}
      <div>
        <div>
          <h3>My Portfolio</h3>
          <p>Track your crypto investments and performance</p>
        </div>
        <div>
          <button>
            <span>
              <FaDownload />
            </span>
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* total details */}

      <div>
        {totalDetails.map((t, index) => (
          <div key={index}>
            <h4>
              <span>{t.icon}</span>
              <span>{t.title}</span>
            </h4>
            <p>{t.amount}</p>
          </div>
        ))}
      </div>

      {/* holdings and history tab */}

      <div>
        {/* holdings and history tab button */}

        <div>
          <button
            className={` ${activeTab === "overview"}`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={` ${activeTab === "history"}`}
            onClick={() => setActiveTab("history")}
          >
            Historical P&L
          </button>
        </div>

        {/* holdings and history tab details */}
        <div>
          {activeTab === "overview" && <Holdings />}
          {activeTab === "history" && <History />}
        </div>
      </div>
    </div>
  );
}
export default MainPort;
