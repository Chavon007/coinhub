import Header from "@/components/header";
import BalanceProvider from "@/context/balanceContext";
import WalletProvider from "@/context/walletContext";
import AIinsightProvider from "@/context/aiinsightContent";

export default function WithHeader({ children }) {
  return (
    <>
      <Header />
      <main>
        <AIinsightProvider>
          <WalletProvider>
            <BalanceProvider>{children}</BalanceProvider>
          </WalletProvider>
        </AIinsightProvider>
      </main>
    </>
  );
}
