"use client"

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
    <div>
      <div>
        <div>
          <h2>Dashboard</h2>
          <TotalBalance />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
