import Card from "./card";
import InsightHeader from "./insightHeader";
import PriceInsight from "./insightprice";
import ScenarioSimulator from "./ScenarioSimulator";
import SentimentInsight from "./SentimentSection";
import SignalInsight from "./Signalinsight";

function MainCard({ data }) {
  return (
    <Card className="flex flex-col ">
      <div className=" grid grid-cols-1 gap-7 md:flex md:justify-between mt-5">
        <InsightHeader {...data.header} />
        <PriceInsight {...data.price} />
      </div>

      <div className="mt-5 grid grid-cols-1 md:grid md:grid-cols-3 gap-3">
        <SentimentInsight {...data.sentiment} />
        <SignalInsight {...data.signal} />
        <ScenarioSimulator {...data.scenario} />
      </div>
    </Card>
  );
}

export default MainCard;
