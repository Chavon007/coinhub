import MainCard from "./maininsightcard";
import useCoinInsight from "@/hook/aicoininsighthook";
function Ethereum() {
  const { loading, error, coinInsight } = useCoinInsight("ethereum", "ETH");
  if (loading) return <p>loading...</p>;
  if (error) return <p> {error}</p>;
  if (!coinInsight) return null;
  return <MainCard data={coinInsight} />;
}
export default Ethereum;
