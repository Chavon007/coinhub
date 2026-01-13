import Header from "@/components/header";
import BalanceProvider from "@/context/balanceContext";
import WalletProvider from "@/context/walletContext";
import AIinsightProvider from "@/context/aiinsightContext";
import MarketMoverProvider from "@/context/marketmoverContext";
import PortfolioProvider from "@/context/portfolioContext";

export default function WithHeader({ children }) {
  return (
    <>
      <Header />
      <main>
        <PortfolioProvider>
          <MarketMoverProvider>
            <AIinsightProvider>
              <WalletProvider>
                <BalanceProvider>{children}</BalanceProvider>
              </WalletProvider>
            </AIinsightProvider>
          </MarketMoverProvider>
        </PortfolioProvider>
      </main>
    </>
  );
}
