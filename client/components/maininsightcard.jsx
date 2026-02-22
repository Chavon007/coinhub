import Card from "./card";
import InsightHeader from "./insightHeader";
import PriceInsight from "./insightprice";
import ScenarioSimulator from "./ScenarioSimulator";
import SentimentInsight from "./SentimentSection";
import SignalInsight from "./Signalinsight";

function MainCard({ data }) {
  return (
    <Card className="flex flex-col gap-2">
      <div className="flex justify-between mt-[20px]">
        <InsightHeader {...data.header} />
        <PriceInsight {...data.price} />
      </div>

      <div className="flex">
        <SentimentInsight {...data.sentiment} />
        <SignalInsight {...data.signal} />
        <ScenarioSimulator {...data.scenario} />
      </div>
    </Card>
  );
}

export default MainCard;
