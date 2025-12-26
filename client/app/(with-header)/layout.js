import Header from "@/components/header";
import BalanceProvider from "@/context/balanceContext";
import WalletProvider from "@/context/walletContext";
import AIinsightProvider from "@/context/aiinsightContent";
import MarketMoverProvider from "@/context/marketmoverContext";

export default function WithHeader({ children }) {
  return (
    <>
      <Header />
      <main>
        <MarketMoverProvider>
          <AIinsightProvider>
            <WalletProvider>
              <BalanceProvider>{children}</BalanceProvider>
            </WalletProvider>
          </AIinsightProvider>
        </MarketMoverProvider>
      </main>
    </>
  );
}
