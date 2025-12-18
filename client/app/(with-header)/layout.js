import Header from "@/components/header";
import BalanceProvider from "@/context/balanceContext";

export default function WithHeader({ children }) {
  return (
    <>
      <Header />
      <main>
        <BalanceProvider>{children}</BalanceProvider>
      </main>
    </>
  );
}
