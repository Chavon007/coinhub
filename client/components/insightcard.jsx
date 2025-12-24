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
    <div>
      <div>
        {error && <p className="text-accent-red">{error}</p>}
        {/* header */}
        <div>
          <h3>
            <span>
              <FaNewspaper />
            </span>
            <span>Ai Insights</span>
          </h3>
        </div>
        {/* news */}

        <div>
          {news.map((n, index) => (
            <div key={index}>
              <h4>{n.headline}</h4>
              <p>{n.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AiInsightCard;
