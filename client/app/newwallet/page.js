"use client";
import dynamic from "next/dynamic";
import WalletProvider from "@/context/walletContext";
// import Swap from "@/components/swap";
// import BalanceProvider from "@/context/balanceContext";

const WalletCreation = dynamic(() => import("@/components/walletcreator"), {
  ssr: false,
  loading: () => <div>Loading wallet generator...</div>,
});
function Newwallet() {
  return (
    <WalletProvider>
      {/* <BalanceProvider> */}
      <div className="container mx-auto bg-background w-[100%]  min-h-screen p-[10px]">
        <WalletCreation />
        {/* <Swap /> */}
      </div>
      {/* </BalanceProvider> */}
    </WalletProvider>
  );
}

export default Newwallet;
