"use client";

import {
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Line,
  Area,
  ComposedChart,
} from "recharts";

function PriceInsight({
  coin,
  currentPrice,
  percent,
  timeFrameTabs,
  confidence,
  target,
  volatility,
  corridor,
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
            <small
              className={` ${percent?.startsWith("-") ? "text-red-500" : "text-accent-green"} text-sm font-nunito-sans font-light`}
            >
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
          <div className="w-[70%] ">
            <h6 className=" text-sm text-accent-green font-bold font-roboto uppercase">
              AI CORRIDOR
            </h6>
            <div>
              <ResponsiveContainer width="100%" height={180}>
                <ComposedChart data={corridor}>
                  <defs>
                    <linearGradient id="priceGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00e5a0" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#00e5a0" stopOpacity={0} />
                    </linearGradient>
                  </defs>

                  <XAxis
                    dataKey="time"
                    tick={{ fill: "#4a7060", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide domain={["auto", "auto"]} />
                  <Tooltip
                    formatter={(val) => `$${val.toLocaleString()}`}
                    contentStyle={{
                      background: "#0d1512",
                      border: "1px solid #1a2e25",
                    }}
                  />
                  <Line
                    dataKey="upper"
                    stroke="#00e5a0"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={false}
                    opacity={0.4}
                  />
                  <Line
                    dataKey="lower"
                    stroke="#00e5a0"
                    strokeWidth={1}
                    strokeDasharray="4 4"
                    dot={false}
                    opacity={0.4}
                  />
                  <Area
                    dataKey="price"
                    stroke="#00e5a0"
                    strokeWidth={2.5}
                    fill="url(#priceGrad)"
                    dot={false}
                    animationDuration={2000}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="w-[180px] h-auto flex flex-col gap-2 p-3 mt-2">
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
