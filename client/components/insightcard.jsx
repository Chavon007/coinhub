"use client";
import { useAiInsight } from "@/context/aiinsightContext";
import { FaNewspaper } from "react-icons/fa";

function AiInsightCard() {
  const { news } = useAiInsight();
  const topNews = news?.slice(0, 3) || [];

  return (
    <div className="bg-surface mt-[30px] w-[98%] mx-auto p-[10px] rounded rounded-2 border border-1 border-border">
      <div className="flex flex-col p-2">
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
          {topNews.map((n, index) => (
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
