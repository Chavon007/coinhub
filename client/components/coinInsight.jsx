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
    <div>
      {/*  */}
      <div>
        {coinSelection.map((c, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(c.name.toLowerCase())}
          >
            <Image src={c.image} alt={c.name} width={50} height={50} />
            <p>{c.name}</p>
          </button>
        ))}
      </div>

      <div>
        {activeTab === "ethereum" && <Ethereum />}
        {activeTab === "bitcoin" && <Bitcoin />}
        {activeTab === "solana" && <Solana />}
        {activeTab === "ripple" && <Ripple />}
      </div>
    </div>
  );
}

export default MainAiInsight;
