import { IoIosTrendingUp } from "react-icons/io";

function SignalItems({ label, value }) {
  return (
    <div className="flex  justify-between items-center">
      <h3 className="text-text-secondary uppercase font-light text-sm font-roboto">{label}</h3>
      <p className="md:w-[25%] lg:w-[35%]  text-accent-green text-sm font-bold  font-nunito-sans italic">{value}</p>
    </div>
  );
}

function SignalInsight({ institutionalFlow, momentumScore, whaleActivity }) {
  return (
    <div className="bg-surface rounded-2xl border p-4 border-gray-600 h-[300px]">
      <h5 className="flex items-center gap-2">
        <span className="text-accent-green text-base">
          <IoIosTrendingUp />
        </span>{" "}
        <span className="text-text-primary font-bold uppercase font-nunito-sans text-sm">
          SIGNAL STRENGTH
        </span>
      </h5>

      <div className="flex flex-col gap-4 justify-center h-[25vh] md:h-[25vh] lg:h-[35vh]">
        <SignalItems label="Institutional Flow" value={institutionalFlow} />
        <SignalItems label="Momentum Score" value={momentumScore} />
        <SignalItems label="Whale Activity" value={whaleActivity} />
      </div>
    </div>
  );
}

export default SignalInsight;
