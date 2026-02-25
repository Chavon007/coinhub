import { useEffect } from "react";

import MainCard from "./maininsightcard";
import useAllCoinInsight from "@/hook/aicoininsighthook";
function Ethereum() {
  const { loading, error, selectCoin, selectedCoin } = useAllCoinInsight();
  useEffect(() => {
    selectCoin("ethereum");
  }, [selectCoin]);

  if (loading) return <p>loading...</p>;
  if (error) return <p> {error}</p>;
  if (!selectedCoin) return null;
  return <MainCard data={selectedCoin} />;
}
export default Ethereum;
