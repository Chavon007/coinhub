import { useEffect } from "react";

import MainCard from "./maininsightcard";
import useAllCoinInsight from "@/hook/aicoininsighthook";
function Ripple() {
  const { loading, error, selectCoin, selectedCoin } = useAllCoinInsight();

  useEffect(() => {
    selectCoin("ripple");
  }, [selectCoin]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p> {error}</p>;
  if (!selectedCoin) return null;

  return <MainCard data={selectedCoin} />;
}

export default Ripple;
