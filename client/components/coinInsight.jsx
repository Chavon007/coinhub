"use client";

import Image from "next/image";
import { useState } from "react";
import Ethereum from "../components/ethereum";
import Bitcoin from "../components/bitcoin";
import Solana from "../components/solana";
import Ripple from "../components/xrp";

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
    name: "ripple",
    image: "https://cryptologos.cc/logos/xrp-xrp-logo.png",
  },
];

function MainAiInsight() {
  const [activeTab, setActiveTab] = useState("ethereum");
  return (
    <div className="bg-background h-auto md:h-screen  p-2 lg:p-7  lg:flex lg:justify-between ">
      {/*  */}
      <div className="w-[98%] p-2 mx-auto lg:w-[20%] flex  lg:flex-col gap-5 lg:gap-7 lg:py-8 mt-2.5 shadow-2xl shadow-gray-900 border-gray-500 ">
        {coinSelection.map((c, index) => (
          <button
            className="flex justify-between w-30  mx-auto"
            key={index}
            onClick={() => setActiveTab(c.name.toLowerCase())}
          >
            <Image src={c.image} alt={c.name} width={20} height={20} />
            <p className="text-text-secondary font-bold text-base font-roboto cursor-pointer w-[80%] text-center hover:text-text-primary">
              {c.name}
            </p>
          </button>
        ))}
      </div>

      <div className=" w-[98%] mx-auto  lg:w-[80%] lg:px-[30px]">
        {activeTab === "ethereum" && <Ethereum />}
        {activeTab === "bitcoin" && <Bitcoin />}
        {activeTab === "solana" && <Solana />}
        {activeTab === "ripple" && <Ripple />}
      </div>
    </div>
  );
}

export default MainAiInsight;
