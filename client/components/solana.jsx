import MainCard from "./maininsightcard";
import useCoinInsight from "@/hook/aicoininsighthook";
function Solana() {
  const { loading, error, coinInsight } = useCoinInsight("solana", "SOL");
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!coinInsight) return null;

  return <MainCard data={coinInsight} />;
}

export default Solana;
