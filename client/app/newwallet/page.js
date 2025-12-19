"use client";
import dynamic from "next/dynamic";
import WalletProvider from "@/context/walletContext";

const WalletCreation = dynamic(() => import("@/components/walletcreator"), {
  ssr: false,
  loading: () => <div>Loading wallet generator...</div>,
});
function Newwallet() {
  return (
    <WalletProvider>
      <div className="container mx-auto bg-background w-[100%]  min-h-screen p-[10px]">
        <WalletCreation />
      </div>
    </WalletProvider>
  );
}

export default Newwallet;
