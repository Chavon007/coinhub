import Header from "@/components/header";
import BalanceProvider from "@/context/balanceContext";
import WalletProvider from "@/context/walletContext";

export default function WithHeader({ children }) {
  return (
    <>
      <Header />
      <main>
        <WalletProvider>
          <BalanceProvider>{children}</BalanceProvider>
        </WalletProvider>
      </main>
    </>
  );
}
