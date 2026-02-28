import { useEffect } from "react";
import MainCard from "./maininsightcard";
import useAllCoinInsight from "@/hook/aicoininsighthook";
function Bitcoin() {
  const { loading, error, selectedCoin, selectCoin } = useAllCoinInsight();

  useEffect(() => {
    selectCoin("bitcoin");
  }, [selectCoin]);

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;
  if (!selectedCoin) return null;
  return <MainCard data={selectedCoin} />;
}

export default Bitcoin;
