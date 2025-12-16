"use client";
import dynamic from "next/dynamic";

const WalletCreation = dynamic(() => import("@/components/walletcreator"), {
  ssr: false,
  loading: () => <div>Loading wallet generator...</div>,
});
function Newwallet() {
  return (
    <div className="container mx-auto bg-background w-[100%]  min-h-screen p-[10px]">
      <WalletCreation />
    </div>
  );
}

export default Newwallet;
