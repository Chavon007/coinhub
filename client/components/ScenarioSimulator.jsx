import { DiAtom } from "react-icons/di";

function ScenarioSimulator({
  forecast,
  forecastPercent,
  portfolioImpact,
  correlation,
}) {
  return (
    <div className="bg-surface rounded-2xl border border-gray-600 h-[300px]">
      <div className="p-4">
        <h5 className="flex items-center gap-2">
          <span className="text-accent-green text-base">
            <DiAtom />
          </span>{" "}
          <span className="text-text-primary font-bold uppercase font-nunito-sans text-sm">
            SCENARIO SIMULATOR
          </span>
        </h5>

        <div className=" mt-4 flex items-center justify-between">
          <p className="text-text-secondary uppercase font-light text-sm font-roboto">
            {forecast}
          </p>
          <p className={` ${forecastPercent?.startsWith("-") ? "text-red-500" : "text-accent-green"} font-outfit text-xl font-medium uppercase`}>
            {forecastPercent}
          </p>
        </div>

        <div className="grid grid-cols-2 mt-7 gap-3 w-[98%] mx-auto">
          <div className="bg-surface shadow shadow-gray-800 p-2 rounded-2xl w-full h-[120px]">
            <h6 className="text-text-secondary uppercase font-light mt-3 text-xs font-roboto">
              Portfolio Impact
            </h6>
            <p className="text-text-primary font-outfit mt-3 text-base text-center font-bold ">
              {portfolioImpact}
            </p>
          </div>

          <div className="bg-surface shadow shadow-gray-800 p-2 rounded-2xl w-full h-[120px]">
            <h6 className="text-text-secondary uppercase font-light mt-3 text-xs font-roboto">
              Correlation
            </h6>
            <p className="text-accent-green font-outfit mt-3 text-sm text-center font-light ">
              {correlation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioSimulator;
