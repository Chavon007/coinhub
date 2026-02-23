import { PiGauge } from "react-icons/pi";

function SentimentInsight({ sentimentRadius, sentimentRadiusMessage }) {
  return (
    <div className="bg-surface rounded-2xl border border-gray-600 h-[300px]">
      <div className="p-4">
        <h5 className="flex items-center gap-2">
          <span className="text-accent-green text-base">
            <PiGauge />
          </span>
          <span className="text-text-primary font-bold uppercase font-nunito-sans text-sm">
            SENTIMENT RADIUS
          </span>
        </h5>
        <div className="flex flex-col justify-center items-center h-[35vh] md:h-[20vh] lg:h-[35vh] ">
          <p className=" text-accent-green font-outfit text-xl font-medium uppercase">
            {sentimentRadius}
          </p>
          <p className="text-text-secondary text-center italic font-outfit mt-2 font-light text-sm">
            {sentimentRadiusMessage}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SentimentInsight;
