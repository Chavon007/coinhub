// "use client";
// import { useState } from "react";
// import { FaBitcoin, FaEthereum, FaDownload, FaChartLine, FaWallet } from "react-icons/fa";
// import { SiSolana, SiCardano, SiPolkadot } from "react-icons/si";

// // Sample portfolio data
// const portfolioData = {
//   totalValue: 45678.92,
//   totalInvested: 38500.00,
//   totalPnL: 7178.92,
//   pnlPercentage: 18.65,
//   holdings: [
//     {
//       id: 1,
//       symbol: "BTC",
//       name: "Bitcoin",
//       icon: <FaBitcoin className="text-orange-500" />,
//       amount: 0.5432,
//       currentPrice: 43250.00,
//       totalValue: 23489.20,
//       invested: 20000.00,
//       pnl: 3489.20,
//       pnlPercentage: 17.45,
//       allocation: 51.4,
//       avgBuyPrice: 36825.00,
//     },
//     {
//       id: 2,
//       symbol: "ETH",
//       name: "Ethereum",
//       icon: <FaEthereum className="text-blue-500" />,
//       amount: 3.2145,
//       currentPrice: 2285.50,
//       totalValue: 7347.13,
//       invested: 6500.00,
//       pnl: 847.13,
//       pnlPercentage: 13.03,
//       allocation: 16.1,
//       avgBuyPrice: 2022.00,
//     },
//     {
//       id: 3,
//       symbol: "SOL",
//       name: "Solana",
//       icon: <SiSolana className="text-purple-500" />,
//       amount: 85.42,
//       currentPrice: 98.75,
//       totalValue: 8435.09,
//       invested: 7000.00,
//       pnl: 1435.09,
//       pnlPercentage: 20.50,
//       allocation: 18.5,
//       avgBuyPrice: 81.95,
//     },
//     {
//       id: 4,
//       symbol: "ADA",
//       name: "Cardano",
//       icon: <SiCardano className="text-blue-600" />,
//       amount: 5420.00,
//       currentPrice: 0.52,
//       totalValue: 2818.40,
//       invested: 2500.00,
//       pnl: 318.40,
//       pnlPercentage: 12.74,
//       allocation: 6.2,
//       avgBuyPrice: 0.46,
//     },
//     {
//       id: 5,
//       symbol: "DOT",
//       name: "Polkadot",
//       icon: <SiPolkadot className="text-pink-500" />,
//       amount: 425.30,
//       currentPrice: 8.25,
//       totalValue: 3509.10,
//       invested: 2500.00,
//       pnl: 1009.10,
//       pnlPercentage: 40.36,
//       allocation: 7.7,
//       avgBuyPrice: 5.88,
//     },
//   ],
//   historicalPnL: [
//     { date: "Jan", value: -500 },
//     { date: "Feb", value: 1200 },
//     { date: "Mar", value: 2400 },
//     { date: "Apr", value: 1800 },
//     { date: "May", value: 3500 },
//     { date: "Jun", value: 4200 },
//     { date: "Jul", value: 5100 },
//     { date: "Aug", value: 4800 },
//     { date: "Sep", value: 6200 },
//     { date: "Oct", value: 6800 },
//     { date: "Nov", value: 7000 },
//     { date: "Dec", value: 7178.92 },
//   ],
// };

// function Portfolio() {
//   const [selectedToken, setSelectedToken] = useState(null);
//   const [view, setView] = useState("overview"); // overview or details

//   const exportToCSV = () => {
//     const headers = ["Symbol", "Name", "Amount", "Current Price", "Total Value", "Invested", "P&L", "P&L %", "Allocation %"];
//     const rows = portfolioData.holdings.map(h => [
//       h.symbol,
//       h.name,
//       h.amount,
//       h.currentPrice,
//       h.totalValue,
//       h.invested,
//       h.pnl,
//       h.pnlPercentage,
//       h.allocation,
//     ]);
    
//     const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");
//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "portfolio_export.csv";
//     a.click();
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto p-3 sm:p-6 min-h-screen">
//       {/* Header Section */}
//       <div className="mb-6 sm:mb-8">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//           <div>
//             <h1 className="font-outfit font-bold text-text-primary text-2xl sm:text-3xl md:text-4xl mb-2">
//               My Portfolio
//             </h1>
//             <p className="text-text-secondary text-sm sm:text-base font-nunito-sans">
//               Track your crypto investments and performance
//             </p>
//           </div>
//           <button
//             onClick={exportToCSV}
//             className="bg-accent-green hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-outfit text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-[1.02]"
//           >
//             <FaDownload />
//             Export CSV
//           </button>
//         </div>

//         {/* Portfolio Summary Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
//           <div className="bg-surface rounded-2xl p-4 sm:p-6">
//             <div className="flex items-center gap-2 mb-2">
//               <FaWallet className="text-accent-green text-lg sm:text-xl" />
//               <p className="text-text-secondary text-xs sm:text-sm font-outfit">Total Value</p>
//             </div>
//             <h3 className="text-text-primary font-bold text-2xl sm:text-3xl font-roboto">
//               ${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//             </h3>
//           </div>

//           <div className="bg-surface rounded-2xl p-4 sm:p-6">
//             <p className="text-text-secondary text-xs sm:text-sm font-outfit mb-2">Total Invested</p>
//             <h3 className="text-text-primary font-bold text-2xl sm:text-3xl font-roboto">
//               ${portfolioData.totalInvested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//             </h3>
//           </div>

//           <div className="bg-surface rounded-2xl p-4 sm:p-6">
//             <div className="flex items-center gap-2 mb-2">
//               <FaChartLine className="text-green-500 text-lg sm:text-xl" />
//               <p className="text-text-secondary text-xs sm:text-sm font-outfit">Total P&L</p>
//             </div>
//             <h3 className={`font-bold text-2xl sm:text-3xl font-roboto ${portfolioData.totalPnL >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               {portfolioData.totalPnL >= 0 ? '+' : ''}${portfolioData.totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//             </h3>
//           </div>

//           <div className="bg-surface rounded-2xl p-4 sm:p-6">
//             <p className="text-text-secondary text-xs sm:text-sm font-outfit mb-2">P&L Percentage</p>
//             <h3 className={`font-bold text-2xl sm:text-3xl font-roboto ${portfolioData.pnlPercentage >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//               {portfolioData.pnlPercentage >= 0 ? '+' : ''}{portfolioData.pnlPercentage.toFixed(2)}%
//             </h3>
//           </div>
//         </div>
//       </div>

//       {/* View Toggle */}
//       <div className="flex gap-2 sm:gap-4 mb-4 sm:mb-6">
//         <button
//           onClick={() => setView("overview")}
//           className={`px-4 sm:px-6 py-2 rounded-lg font-outfit text-sm sm:text-base transition-all ${
//             view === "overview"
//               ? "bg-accent-green text-white"
//               : "bg-surface text-text-secondary hover:bg-surface/80"
//           }`}
//         >
//           Overview
//         </button>
//         <button
//           onClick={() => setView("chart")}
//           className={`px-4 sm:px-6 py-2 rounded-lg font-outfit text-sm sm:text-base transition-all ${
//             view === "chart"
//               ? "bg-accent-green text-white"
//               : "bg-surface text-text-secondary hover:bg-surface/80"
//           }`}
//         >
//           Historical P&L
//         </button>
//       </div>

//       {/* Main Content Area */}
//       {view === "overview" ? (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
//           {/* Holdings Table */}
//           <div className="lg:col-span-2 bg-surface rounded-2xl p-4 sm:p-6">
//             <h2 className="font-outfit font-bold text-text-primary text-lg sm:text-xl mb-4">
//               Holdings
//             </h2>
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead>
//                   <tr className="border-b border-gray-700">
//                     <th className="text-left text-text-secondary text-xs sm:text-sm font-outfit py-3 px-2">Asset</th>
//                     <th className="text-right text-text-secondary text-xs sm:text-sm font-outfit py-3 px-2">Amount</th>
//                     <th className="text-right text-text-secondary text-xs sm:text-sm font-outfit py-3 px-2 hidden sm:table-cell">Price</th>
//                     <th className="text-right text-text-secondary text-xs sm:text-sm font-outfit py-3 px-2">Value</th>
//                     <th className="text-right text-text-secondary text-xs sm:text-sm font-outfit py-3 px-2">P&L</th>
//                     <th className="text-right text-text-secondary text-xs sm:text-sm font-outfit py-3 px-2 hidden md:table-cell">Allocation</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {portfolioData.holdings.map((holding) => (
//                     <tr
//                       key={holding.id}
//                       onClick={() => setSelectedToken(holding)}
//                       className="border-b border-gray-800 hover:bg-surface/50 cursor-pointer transition-all"
//                     >
//                       <td className="py-4 px-2">
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className="text-xl sm:text-2xl">{holding.icon}</div>
//                           <div>
//                             <p className="font-bold text-text-primary text-sm sm:text-base">{holding.symbol}</p>
//                             <p className="text-text-secondary text-xs hidden sm:block">{holding.name}</p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="text-right text-text-primary text-xs sm:text-sm py-4 px-2">
//                         {holding.amount.toFixed(4)}
//                       </td>
//                       <td className="text-right text-text-primary text-xs sm:text-sm py-4 px-2 hidden sm:table-cell">
//                         ${holding.currentPrice.toLocaleString()}
//                       </td>
//                       <td className="text-right text-text-primary font-semibold text-xs sm:text-sm py-4 px-2">
//                         ${holding.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                       </td>
//                       <td className={`text-right font-semibold text-xs sm:text-sm py-4 px-2 ${holding.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                         {holding.pnl >= 0 ? '+' : ''}${holding.pnl.toFixed(2)}
//                         <br />
//                         <span className="text-xs">({holding.pnlPercentage >= 0 ? '+' : ''}{holding.pnlPercentage.toFixed(2)}%)</span>
//                       </td>
//                       <td className="text-right text-text-secondary text-xs sm:text-sm py-4 px-2 hidden md:table-cell">
//                         {holding.allocation}%
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Allocation Pie Chart (Placeholder) */}
//           <div className="bg-surface rounded-2xl p-4 sm:p-6">
//             <h2 className="font-outfit font-bold text-text-primary text-lg sm:text-xl mb-4">
//               Token Allocation
//             </h2>
//             <div className="space-y-3 sm:space-y-4">
//               {portfolioData.holdings.map((holding) => (
//                 <div key={holding.id}>
//                   <div className="flex justify-between items-center mb-2">
//                     <div className="flex items-center gap-2">
//                       <div className="text-lg sm:text-xl">{holding.icon}</div>
//                       <span className="text-text-primary font-outfit text-sm sm:text-base">{holding.symbol}</span>
//                     </div>
//                     <span className="text-text-secondary font-outfit text-sm sm:text-base">{holding.allocation}%</span>
//                   </div>
//                   <div className="w-full bg-gray-700 rounded-full h-2">
//                     <div
//                       className="bg-accent-green h-2 rounded-full transition-all"
//                       style={{ width: `${holding.allocation}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Historical P&L Chart */
//         <div className="bg-surface rounded-2xl p-4 sm:p-6">
//           <h2 className="font-outfit font-bold text-text-primary text-lg sm:text-xl mb-6">
//             Historical P&L (Last 12 Months)
//           </h2>
//           <div className="h-64 sm:h-80 flex items-end justify-between gap-1 sm:gap-2">
//             {portfolioData.historicalPnL.map((item, index) => {
//               const maxValue = Math.max(...portfolioData.historicalPnL.map(d => Math.abs(d.value)));
//               const height = (Math.abs(item.value) / maxValue) * 100;
//               const isPositive = item.value >= 0;

//               return (
//                 <div key={index} className="flex-1 flex flex-col items-center gap-2">
//                   <div className="w-full flex items-end justify-center" style={{ height: "240px" }}>
//                     <div
//                       className={`w-full rounded-t transition-all hover:opacity-80 ${
//                         isPositive ? "bg-green-500" : "bg-red-500"
//                       }`}
//                       style={{ height: `${height}%` }}
//                       title={`${item.date}: ${item.value >= 0 ? '+' : ''}$${item.value.toFixed(2)}`}
//                     ></div>
//                   </div>
//                   <span className="text-text-secondary text-xs font-outfit">{item.date}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       )}

//       {/* Token Detail Modal */}
//       {selectedToken && (
//         <div
//           className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
//           onClick={() => setSelectedToken(null)}
//         >
//           <div
//             className="bg-surface rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-between items-start mb-6">
//               <div className="flex items-center gap-3">
//                 <div className="text-3xl sm:text-4xl">{selectedToken.icon}</div>
//                 <div>
//                   <h2 className="font-outfit font-bold text-text-primary text-xl sm:text-2xl">
//                     {selectedToken.name}
//                   </h2>
//                   <p className="text-text-secondary text-sm sm:text-base">{selectedToken.symbol}</p>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setSelectedToken(null)}
//                 className="text-text-secondary hover:text-text-primary text-2xl"
//               >
//                 ×
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Holdings</p>
//                 <p className="text-text-primary text-xl sm:text-2xl font-bold">{selectedToken.amount}</p>
//               </div>
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Current Price</p>
//                 <p className="text-text-primary text-xl sm:text-2xl font-bold">
//                   ${selectedToken.currentPrice.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Total Value</p>
//                 <p className="text-text-primary text-xl sm:text-2xl font-bold">
//                   ${selectedToken.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Avg Buy Price</p>
//                 <p className="text-text-primary text-xl sm:text-2xl font-bold">
//                   ${selectedToken.avgBuyPrice.toLocaleString()}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Total Invested</p>
//                 <p className="text-text-primary text-xl sm:text-2xl font-bold">
//                   ${selectedToken.invested.toLocaleString('en-US', { minimumFractionDigits: 2 })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Profit/Loss</p>
//                 <p className={`text-xl sm:text-2xl font-bold ${selectedToken.pnl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
//                   {selectedToken.pnl >= 0 ? '+' : ''}${selectedToken.pnl.toFixed(2)}
//                   <span className="text-base ml-2">
//                     ({selectedToken.pnlPercentage >= 0 ? '+' : ''}{selectedToken.pnlPercentage.toFixed(2)}%)
//                   </span>
//                 </p>
//               </div>
//               <div>
//                 <p className="text-text-secondary text-sm font-outfit mb-1">Portfolio Allocation</p>
//                 <p className="text-text-primary text-xl sm:text-2xl font-bold">{selectedToken.allocation}%</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Portfolio;


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