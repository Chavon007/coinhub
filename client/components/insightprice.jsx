"use client";

import { useState } from "react";

function PriceInsight({
  coin,
  currentPrice,
  percent,
  timeFrameTabs,
  confidence,
  target,
  volatility,
}) {
  return (
    <div className="w-[95%] mx-auto md:mx-0  md:w-[62%] bg-surface rounded-2xl border border-gray-700">
      <div className=" flex flex-col p-3">
        <h5 className="mx-5 uppercase text-xl md:text-base font-bold text-text-secondary font-roboto">
          {coin}
        </h5>
        <div className="flex justify-between items-center mx-5">
          {/* price */}
          <div className="flex gap-3 items-center py-1 ">
            <p className="text-text-primary text-2xl font-bold font-orbitron">
              {currentPrice}
            </p>
            <small className="text-accent-green text-sm font-nunito-sans font-light">
              {percent}
            </small>
          </div>

          <div className="w-[35%] md:w-[25%] bg-background p-2 rounded-xl flex justify-between items-center">
            {timeFrameTabs?.map((t) => (
              <button
                className="text-text-primary font-bold font-outfit text-sm"
                key={t}
              >
                {" "}
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="w-[70%] text-center text-2xl text-accent-blue uppercase">
            graph here
          </div>

          <div className="w-[140px]   h-auto flex flex-col gap-2 p-3 mt-2">
            <p className="p-3 flex flex-col">
              <span className="text-text-secondary font-roboto font-light text-xl md:text-base uppercase">
                Confidence
              </span>
              <span className="text-accent-green font-orbitron text-xl font-bold">
                {confidence}
              </span>
            </p>
            <p className="p-3 flex flex-col">
              <span className="text-text-secondary font-roboto font-light text-xl md:text-base uppercase">
                Target
              </span>
              <span className="font-orbitron text-xl font-bold text-text-primary">
                {target}
              </span>
            </p>
            <p className="p-3 flex flex-col">
              <span className="text-text-secondary font-roboto font-light text-xl md:text-base uppercase">
                Volatility
              </span>{" "}
              <span className="font-orbitron text-xl font-bold text-text-primary">
                {volatility}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceInsight;
