"use client";

import { FaDownload } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { usePortfolio } from "@/context/portfolioContext";
import { FaWallet } from "react-icons/fa";
function MainPort() {
  const { loading, error, portfolio } = usePortfolio();

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
    </div>
  );
}
export default MainPort;
