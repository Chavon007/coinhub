import { useAiInsight } from "@/context/aiinsightContent";
import { useState } from "react";
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
      setNews(data);
    } catch (err) {
      setError("Can't fetch news now");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div>
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
                    
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
