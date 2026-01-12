"use client";
import Link from "next/link";
import Image from "next/image";
import { FaNewspaper } from "react-icons/fa";
import { IoMdTimer } from "react-icons/io";
import { CiWallet } from "react-icons/ci";
import { IoScaleOutline } from "react-icons/io5";

const usage = [
  {
    data: "$2.5B+",
    text: "Trading Volume",
  },
  {
    data: "150+",
    text: "Countries",
  },
  {
    data: "500K+",
    text: "Transactions/Day",
  },
  {
    data: "0.01s",
    text: "Response Time",
  },
];

const technology = [
  {
    icon: <FaNewspaper />,
    title: "AI-Driven News Analysis",
    text: "Advanced AI analyzes crypto news from multiple sources, transforming raw information into meaningful insights you can trust.",
  },
  {
    icon: <IoMdTimer />,
    title: "Real-Time Market Data",
    text: "We connect to live cryptocurrency market APIs to deliver up-to-date price movements, market trends, and coin statistics in real time.",
  },
  {
    icon: <CiWallet />,
    title: "Simplified Wallet Experience",
    text: "Access Ethereum, Bitcoin, Solana, and more through an integrated wallet system built for speed and convenience.",
  },
  {
    icon: <IoScaleOutline />,
    title: "Built to Scale",
    text: "Our infrastructure handles millions of requests per second without breaking a sweat.",
  },
];

function About() {
  return (
    <div className="max-w-[1200px] mx-auto p-2 sm:p-4">
      {/* header */}
      <div className="text-center gap-3 sm:gap-4 flex flex-col min-h-[40vh] sm:min-h-[50vh] items-center justify-center mt-2 sm:mt-[10px] p-4">
        <h2 className="font-outfit font-bold text-text-primary text-3xl sm:text-4xl md:text-5xl">
          TRADE
        </h2>
        <h2 className="font-outfit font-semibold text-text-secondary text-2xl sm:text-3xl">
          THE FUTURE
        </h2>
        <p className="text-text-primary font-nunito-sans text-xs sm:text-sm font-medium italic max-w-[90%] sm:max-w-[600px] mx-auto">
          We're not just building a platform. We're engineering the
          infrastructure for the next financial revolution.
        </p>
        <Link
          className="bg-accent-green w-[150px] mx-auto rounded-xl px-4 py-2 sm:p-[8px] text-[#E5E7EB] font-outfit text-sm hover:bg-green-700 hover:scale-[1.05] focus:ring-2 focus:ring-green-500 focus:outline-none transition-all cursor-pointer"
          href="/"
        >
          Start Trading
        </Link>
      </div>

      {/* usage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-[98%] mx-auto mb-6 sm:mb-0">
        {usage.map((u, index) => (
          <div
            className="bg-surface rounded-2xl p-4 sm:p-6 transition cursor-pointer hover:scale-[1.03]
                 flex flex-col items-center justify-center min-h-[120px] sm:h-[150px]"
            key={index}
          >
            <h4 className="text-2xl sm:text-3xl font-roboto text-center font-bold text-text-secondary">
              {u.data}
            </h4>
            <p className="text-sm sm:text-base mt-[5px] text-center italic font-outfit text-text-primary">
              {u.text}
            </p>
          </div>
        ))}
      </div>

      {/* story */}
      <div className="flex flex-col md:flex-row justify-between items-center w-[98%] mx-auto h-auto mt-6 sm:mt-[30px] gap-6 md:gap-4">
        <div className="w-full md:w-[50%] flex flex-col gap-2 sm:gap-3 p-3 sm:p-[15px]">
          <h2 className="font-orbitron text-text-primary font-bold text-xl sm:text-2xl">
            OUR STORY
          </h2>
          <p className="max-w-full md:max-w-[500px] text-sm sm:text-base font-outfit text-text-secondary">
            Born in 2025 from a simple idea: trading shouldn't be complicated,
            expensive, or exclusive. We set out to build something different, a
            platform that combines enterprise-grade technology with
            consumer-friendly design.
          </p>
          <p className="max-w-full md:max-w-[500px] text-sm sm:text-base font-outfit text-text-secondary">
            Today, we're proud to serve hundreds of thousands of traders across
            the globe, processing billions in transactions every month. But
            we're just getting started.
          </p>
        </div>

        <div className="w-full md:w-[45%] flex justify-center">
          <Image 
            src="/mainlogo.svg" 
            alt="Company Logo" 
            width={400} 
            height={200}
            className="w-full max-w-[300px] sm:max-w-[400px] h-auto"
          />
        </div>
      </div>

      {/* powered */}
      <div className="flex flex-col w-[98%] mx-auto mb-[15px] h-auto">
        <div className="text-center gap-3 sm:gap-4 flex flex-col min-h-[35vh] sm:min-h-[45vh] items-center justify-center mt-2 sm:mt-[10px] p-4">
          <h3 className="font-outfit font-bold text-text-primary text-3xl sm:text-4xl md:text-5xl">
            POWERED BY
          </h3>
          <h3 className="font-outfit font-semibold text-text-secondary text-2xl sm:text-3xl">
            TECHNOLOGY
          </h3>
          <p className="text-text-primary font-nunito-sans text-xs sm:text-sm font-medium italic max-w-[90%] sm:max-w-[600px] mx-auto">
            Cutting-edge infrastructure built for speed, security, and
            scalability
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 w-[98%] mx-auto">
          {technology.map((t, index) => (
            <div
              className="bg-surface rounded-2xl p-4 sm:p-6 transition cursor-pointer hover:scale-[1.03]
                 flex flex-col justify-center min-h-[160px] sm:min-h-[180px]"
              key={index}
            >
              <p className="text-3xl sm:text-4xl text-text-secondary mb-2">{t.icon}</p>
              <h5 className="text-lg sm:text-xl font-roboto font-semibold text-text-secondary mb-1">
                {t.title}
              </h5>
              <p className="text-xs sm:text-sm mt-[5px] italic font-outfit text-text-primary leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;