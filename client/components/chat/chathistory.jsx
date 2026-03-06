import { FaPlus } from "react-icons/fa6";

const savedQueries = [
  {
    title: "What's driving BTC volatility?",
  },
  {
    title: "Compare ETH vs SOL on-chain",
  },
  {
    title: "Summarize my portfolio risk",
  },
  {
    title: "Best ARB entry points",
  },
];

const recentChat = [
  {
    title: "Portfolio review — today",
  },
  {
    title: "BTC macro outlook — yesterday",
  },
  {
    title: "DeFi yield scan — Mar 01",
  },
];

function ChatHistory() {
  return (
    <div className="w-[20%] shadow-2xl flex flex-col gap-2 p-4 shadow-gray-500">
      {/* button for new chat */}
      <div className="w-[200px] bg-accent-green rounded-xl p-2 hover:bg-green-400">
        <button className="flex justify-self-center gap-2 items-center text-text-primary">
          {" "}
          <span className="text-base font-nunito-sans font-bold">
            <FaPlus />
          </span>
          <span className="text-sm font-bold font-nunito-sans uppercase">
            New Chat
          </span>
        </button>
      </div>

      {/* Save Queries */}
      <div className=" border-b border-b-gray-500 px-2 pt-2 pb-7  flex flex-col gap-2">
        <h5 className="text-text-secondary font-outfit font-light text-sm">
          Saved Queries
        </h5>
        <div className=" grid grid-cols-1 gap-3">
          {savedQueries.map((q, index) => (
            <button
              className="bg-surface rounded border p-2 font-medium  font-nunito-sans text-xs text-text-primary"
              key={index}
            >
              {q.title}
            </button>
          ))}
        </div>
      </div>

      {/* Recent Chat */}

      <div className=" border-b border-b-gray-500 px-2 pt-2 pb-7  flex flex-col gap-2">
        <h5 className="text-text-secondary font-outfit font-light text-sm">
          Recent Conversations
        </h5>
        <div className=" grid grid-cols-1 gap-3">
          {recentChat.map((c, index) => (
            <button className="bg-surface rounded border-l p-2  font-medium  font-nunito-sans text-xs text-text-primary" key={index}>{c.title}</button>
          ))}
        </div>
      </div>

      {/* AI MODEL */}

      <div className="mt-auto">
        <h5 className="text-text-secondary font-orbitron font-bold text-sm">AI MODEL</h5>
        <p className="text-center mt-2 uppercase  bg-surface rounded border p-2  font-light  font-nunito-sans text-xs text-text-primary">CryptoSense v2.1</p>
      </div>
    </div>
  );
}

export default ChatHistory;
