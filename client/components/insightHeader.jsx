import { WiStars } from "react-icons/wi";

function InsightHeader({ title, message }) {
  return (
    <div className="w-[35%] p-3 border-l-4 border-accent-green rounded-2xl bg-surface">
      <div className="my-3 w-[90%]">
        <h4 className="flex items-center gap-1 text-base text-accent-green font-nunito-sans">
          <span>
            <WiStars />
          </span>
          <span>{title}</span>
        </h4>
        <p className="mt-4 w-[320px] text-text-secondary text-base leading-[35px] font-light font-outfit">{message}</p>
      </div>
    </div>
  );
}

export default InsightHeader;
