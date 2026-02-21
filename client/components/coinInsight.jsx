"use client";

import Image from "next/image";
import { useState } from "react";
import Ethereum from "../components/ethereum"
import Bitcoin from "../components/bitcoin"
import Solana from "../components/solana"
import Ripple from "../components/xrp"

const coinSelection = [
  {
    name: "Ethereum",
    image: "",
  },
  {
    name: "Bitcoin",
    image: "",
  },
  {
    name: "Solana",
    image: "",
  },
  {
    name: "ripple",
    image: "",
  },
];

function CoinInsightCard() {
  const [activeTab, setActiveTab] = useState("ethereum");
  return (
    <div>
      {/*  */}
      <div>
        {coinSelection.map((c, index) => (
          <button key={index} onClick={() => setActiveTab(c.name.toLocaleLowerCase)}>
            <Image src={c.image} alt={c.name} width={50} height={50} />
            <p>{c.name}</p>
          </button>
        ))}
      </div>

      <div>
        {activeTab === "ethereum" && <Ethereum/>}
        {activeTab === "bitcoin" && <Bitcoin/>}
        {activeTab === "solana" && <Solana/>}
        {activeTab === "ripple" && <Ripple/>}
      </div>
    </div>
  );
}

export default CoinInsightCard;
