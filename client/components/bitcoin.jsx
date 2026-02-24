import MainCard from "./maininsightcard";
import useCoinInsight from "@/hook/aicoininsighthook";
function Bitcoin() {
  const { coinInsight, loading, error } = useCoinInsight("bitcoin", "BTC");

  if (loading) return <p>Loading....</p>;
  if (error) return <p>{error}</p>;
  if (!coinInsight) return null;
  return <MainCard data={coinInsight} />;
}

export default Bitcoin;
