import MainCard from "./maininsightcard";
import useCoinInsight from "@/hook/aicoininsighthook";
function Ripple() {
  const { loading, error, coinInsight } = useCoinInsight("ripple", "XRP");

  if (loading) return <p>Loading...</p>;
  if (error) return <p> {error}</p>;
  if (!coinInsight) return null;

  return <MainCard data={coinInsight} />;
}

export default Ripple;
