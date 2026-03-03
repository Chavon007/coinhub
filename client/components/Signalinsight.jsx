import { IoIosTrendingUp } from "react-icons/io";

const formatCryptoNumber = (num, isCurrency = false) => {
  if (num === null || num === "undefined") return "-";
  let formatted;
  const number = Number(num);

  if (number >= 1_000_000_000)
    formatted = (number / 1_000_000_000).toFixed(1) + "B";
  else if (number >= 1_000_000)
    formatted = (number / 1_000_000).toFixed(1) + "M";
  else if (number >= 1_000) formatted = (number / 1_000).toFixed(1) + "K";
  else formatted = number.toString();

  return isCurrency ? `$${formatted}` : formatted;
};

function SignalItems({ label, value }) {
  return (
    <div className="flex  justify-between items-center">
      <h3 className="text-text-secondary uppercase font-light text-sm font-roboto">
        {label}
      </h3>
      <p className="md:w-[30%] lg:w-[35%] text-center  text-accent-green text-sm font-bold  font-nunito-sans italic">
        {value}
      </p>
    </div>
  );
}

function SignalInsight({
  institutionalFlow,
  momentumScore,
  whaleActivity,
  aiPrediction,
  advice,
}) {
  return (
    <div className="bg-surface rounded-2xl border p-4 border-gray-600 h-[300px] flex flex-col gap-5">
      <h5 className="flex items-center gap-2">
        <span className="text-accent-green text-base">
          <IoIosTrendingUp />
        </span>{" "}
        <span className="text-text-primary font-bold uppercase font-nunito-sans text-sm">
          SIGNAL STRENGTH
        </span>
      </h5>

      <div className="flex flex-col gap-4 justify-center ">
        <SignalItems label="Institutional Flow" value={institutionalFlow} />
        <SignalItems label="Momentum Score" value={momentumScore} />
        <SignalItems
          label="Whale Activity"
          value={formatCryptoNumber(whaleActivity, true)}
        />
      </div>

      <div className="">
        <h5
          className={`text-2xl md:text-base font-roboto ${aiPrediction?.startsWith("-") ? "text-red-500" : "text-accent-green"}`}
        >
          {aiPrediction}
        </h5>
        <p className="text-text-secondary font-outfit text-base md:text-sm  md:w-[230px] md:mx-auto lg:w-[280px]">
          {advice}
        </p>
      </div>
    </div>
  );
}

export default SignalInsight;
