"use client";
import { useAiInsight } from "@/context/aiinsightContent";
import { useState, useEffect } from "react";
import { FaNewspaper } from "react-icons/fa";

function AiInsightCard() {
  const { getNewsInsight } = useAiInsight();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [news, setNews] = useState([]);

  const getNews = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getNewsInsight();
      setNews(data.slice(0, 3));
    } catch (err) {
      setError("Can't fetch news now");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getNews();
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }
  return (
    <div className="bg-surface mt-[30px] w-[98%] mx-auto p-[10px] rounded rounded-2 border border-1 border-border">
      <div className="flex flex-col p-2">
        {error && <p className="text-accent-red">{error}</p>}
        {/* header */}
        <div className="lg:w-[20%] p-[5px] ">
          <h3 className="flex gap-3 items-center">
            <span className="text-text-secondary text-2xl">
              <FaNewspaper />
            </span>
            <span className="text-text-secondary text-2xl lg:text-1xl font-roboto font-bold">
              Ai Insights
            </span>
          </h3>
        </div>
        {/* news */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((n, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-4 transition cursor-pointer hover:scale-[1.03]
                 flex flex-col h-[180px]"
            >
              {/* Headline */}
              <h4 className="flex flex-col gap-1">
                <span className="block text-xs font-orbitron text-text-secondary">
                  Headline
                </span>

                <span
                  className="text-sm italic font-semibold font-outfit text-text-primary
                     line-clamp-2"
                >
                  {n.headline}
                </span>
              </h4>

              {/* Insight */}
              <p
                className="text-xs font-semibold font-nunito-sans text-text-secondary
                   line-clamp-4 mt-[20px]"
              >
                {n.insight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AiInsightCard;
