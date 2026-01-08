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
    <div>
      {/* header */}
      <div>
        <h2>TRADE</h2>
        <h2>THE FUTURE</h2>
        <p>
          We're not just building a platform. We're engineering the
          infrastructure for the next financial revolution.
        </p>
        <Link href="/">Start Trading</Link>
      </div>

      {/* usage */}
      <div>
        {usage.map((u, index) => (
          <div key={index}>
            <h4>{u.data}</h4>
            <p>{u.text}</p>
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
