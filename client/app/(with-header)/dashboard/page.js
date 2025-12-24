"use client";

import TotalBalance from "@/components/totalbalance";
import { useWallet } from "@/context/walletContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Dashboard() {
  const router = useRouter();
  const { getWallet } = useWallet();

  useEffect(() => {
    const checkWallet = async () => {
      try {
        await getWallet();
      } catch (err) {
        if (err.message === "Wallet does not exist") {
          router.push("/choosewallet");
        }
      }
    };
    checkWallet();
  }, []);

  return (
    <div className="bg-background  w-full h-auto p-[10px]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-3xl w-[98%] mx-auto font-roboto text-text-primary font-bold">
          Dashboard
        </h2>
        <TotalBalance />
      </div>
    </div>
  );
}

export default Dashboard;
