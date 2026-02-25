import { useEffect } from "react";
import MainCard from "./maininsightcard";
import useCoinInsight from "@/hook/aicoininsighthook";
import useAllCoinInsight from "@/hook/aicoininsighthook";
function Solana() {
  const { loading, error, selectCoin, selectedCoin } = useAllCoinInsight();

  useEffect(() => {
    selectCoin("solana");
  }, [selectCoin]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!selectedCoin) return null;

  return <MainCard data={selectedCoin} />;
}

export default Solana;
