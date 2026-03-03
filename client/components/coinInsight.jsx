"use client";

import Image from "next/image";
import { useState } from "react";

import useAllCoinInsight from "@/hook/aicoininsighthook";
import MainCard from "./maininsightcard";
const coinSelection = [
  {
    name: "Ethereum",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "Bitcoin",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    name: "Solana",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    name: "XRP",
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
];

function MainAiInsight() {
  const { loading, error, selectCoin, selectedCoin } = useAllCoinInsight();
  const [activeTab, setActiveTab] = useState("ethereum");

  const handleTabChange = (id) => {
    setActiveTab(id);
    selectCoin(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div className="bg-background h-auto md:h-screen lg:h-auto  p-2 lg:p-7  lg:flex lg:justify-between ">
      {/*  */}
      <div className="w-[98%] p-2 mx-auto lg:w-[20%] flex  lg:flex-col gap-5 lg:gap-7 lg:py-8 mt-2.5 shadow-2xl   border-gray-900 ">
        {coinSelection.map((c, index) => (
          <button
            className={`flex justify-between w-30 mx-auto px-3 py-1 rounded-lg transition-colors
    ${
      activeTab === c.id
        ? "bg-gray-700 text-white"
        : "text-text-secondary hover:text-text-primary"
    }`}
            key={index}
            onClick={() => handleTabChange(c.name.toLowerCase())}
          >
            <Image src={c.image} alt={c.name} width={20} height={20} />
            <p className="text-text-secondary font-bold text-base font-roboto cursor-pointer w-[80%] text-center hover:text-text-primary">
              {c.name}
            </p>
          </button>
        ))}
      </div>

      <div className=" w-[98%] mx-auto  lg:w-[80%] lg:px-[30px]">
        {selectedCoin ? <MainCard data={selectedCoin} /> : <p>Select a coin</p>}
      </div>
    </div>
  );
}

export default MainAiInsight;
