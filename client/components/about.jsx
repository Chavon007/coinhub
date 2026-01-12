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
    <div className="max-w-[1200px] mx-auto p-[5px]">
      {/* header */}
      <div className="text-center gap-4 flex flex-col h-[50vh] item-center justify-center mt-[10px] p-4">
        <h2 className="font-outfit font-bold text-text-primary text-5xl">
          TRADE
        </h2>
        <h2 className="font-outfit font-semibold text-text-secondary text-3xl">
          THE FUTURE
        </h2>
        <p className="text-text-primary font-nunito-sans text-sm font-medium italic max-w-[600px] mx-auto">
          We're not just building a platform. We're engineering the
          infrastructure for the next financial revolution.
        </p>
        <Link
          className="bg-accent-green w-[150px] mx-auto rounded rounded-1xl p-[8px] text-[#E5E7EB] font-outfit text-sm  hover:bg-green-700 hover:scale-[1.05] cursor-pointer"
          href="/"
        >
          Start Trading
        </Link>
      </div>

      {/* usage */}
      <div className="grid grid-cols-2 gap-4 w-[98%] mx-auto">
        {usage.map((u, index) => (
          <div
            className="bg-surface rounded-2xl  p-4 transition cursor-pointer hover:scale-[1.03]
                 flex flex-col items-center justify-center h-[150px]"
            key={index}
          >
            <h4 className="text-3xl font-roboto text-center font-bold text-text-secondary">
              {u.data}
            </h4>
            <p className="text-base mt-[5px] text-center italic font-outfit text-text-primary ">
              {u.text}
            </p>
          </div>
        ))}
      </div>

      {/* story */}
      <div>
        <div>
          <h2>OUR STORY</h2>
          <p>
            Born in 2025 from a simple idea: trading shouldn't be complicated,
            expensive, or exclusive. We set out to build something different, a
            platform that combines enterprise-grade technology with
            consumer-friendly design.
          </p>
          <p>
            Today, we're proud to serve hundreds of thousands of traders across
            the globe, processing billions in transactions every month. But
            we're just getting started.
          </p>
        </div>

        <div>
          <Image src="" alt="" width={50} height={50} />
        </div>
      </div>

      {/* powered */}

      <div>
        <div>
          <h3>POWERED BY</h3>
          <h3>TECHNOLOGY</h3>
          <p>
            Cutting-edge infrastructure built for speed, security, and
            scalability
          </p>
        </div>

        <div>
          {technology.map((t, index) => (
            <div key={index}>
              <p>{t.icon}</p>
              <h5>{t.title}</h5>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
