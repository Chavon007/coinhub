"use client";
import FormatAmount from "./formatamount";
import Holdings from "./holdings";
import { FaDownload } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { usePortfolio } from "@/context/portfolioContext";
import { FaWallet } from "react-icons/fa";
import { useState } from "react";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { MdOutlinePercent } from "react-icons/md";
// import History from "./history";

function MainPort() {
  const { loading, error, portfolio } = usePortfolio();
  const [activeTab, setActiveTab] = useState("overview");
  if (loading) return <p>loading....</p>;
  if (error) return <p>Error: {error}</p>;
  if (!portfolio) return <p>No portfolio data</p>;



  const totalDetails = [
    {
      icon: <FaWallet className="text-accent-green" />,
      title: "Total Value",
      amount: FormatAmount(portfolio?.totalValue || 0),
    },
    {
      icon: <FaMoneyBill1Wave className="text-accent-green" />,
      title: "Total Invested",
      amount: FormatAmount(portfolio?.totalInvested || 0),
    },
    {
      icon:
        (portfolio?.totalPnL || 0) >= 0 ? (
          <FaArrowTrendUp className="text-accent-green" />
        ) : (
          <FaArrowTrendDown className="text-accent-red" />
        ),
      title: "Total P&L",
      amount: FormatAmount(portfolio?.totalPnL || 0),
    },
    {
      icon: <MdOutlinePercent className="text-accent-green" />,
      title: "P&L Percentage %",
      amount: portfolio?.pnlPercentage || 0,
    },
  ];

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col gap-3">
      {/* header */}
      <div className=" w-[95%] mx-auto md:flex md:justify-between md:items-center">
        <div className="py-2 md:w-[50%]">
          <h3 className="text-2xl md:text-3xl font-orbitron text-text-primary font-bold">
            My Portfolio
          </h3>
          <p className="text-text-secondary font-nunito-sans font-semibold  text-xs md:text-sm py-1">
            Track your crypto investments and performance
          </p>
        </div>
        <div className=" py-2">
          <button className="flex bg-accent-green w-[130px] rounded-2xl p-2 justify-around items-center hover:bg-green-500 cursor-pointer">
            <span className="text-text-primary">
              <FaDownload />
            </span>
            <span className=" text-text-primary text-sm font-bold  font-nunito-sans">
              Export CSV
            </span>
          </button>
        </div>
      </div>

      {/* total details */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 w-[95%] md:w-[95%] mx-auto">
        {totalDetails.map((t, index) => (
          <div
            className="bg-surface border-1 border-border  rounded-[10px] md:rounded-2xl  p-3 h-[110px] md:h-[100px] flex flex-col  gap-3 md:gap-2"
            key={index}
          >
            <h4 className=" ml-[8px] flex items-center gap-2 ">
              <span className="text-2xl ">{t.icon}</span>
              <span className="text-text-secondary  font-outfit text-sm">
                {t.title}
              </span>
            </h4>
            <p className=" ml-[8px] text-text-primary font-semibold font-roboto text-2xl">
              {t.amount}
            </p>
          </div>
        ))}
      </div>

      {/* holdings and history tab */}

      <div className="flex flex-col gap-2 w-[95%] mx-auto">
        {/* holdings and history tab button */}

        <div className=" p-2 flex gap-2">
          <button
            className={`${
              activeTab === "overview"
                ? "bg-accent-green text-text-primary"
                : "bg-surface text-text-secondary"
            }  w-[130px] rounded-[8px] font-roboto font-bold p-2`}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>

          <button
            className={` ${
              activeTab === "history"
                ? "bg-accent-green text-text-primary"
                : "bg-surface text-text-secondary"
            } w-[180px] rounded-[10px] font-roboto font-bold p-2`}
            onClick={() => setActiveTab("history")}
          >
            Historical P&L
          </button>
        </div>

        {/* holdings and history tab details */}
        <div className="">
          {activeTab === "overview" && <Holdings />}
          {/* {activeTab === "history" && <History />} */}
        </div>
      </div>
    </div>
  );
}
export default MainPort;
