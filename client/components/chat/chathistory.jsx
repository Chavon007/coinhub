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
      <div>
        <h5>Saved Queries</h5>
        <div>
          {savedQueries.map((q, index) => (
            <button key={index}>{q.title}</button>
          ))}
        </div>
      </div>

      {/* Recent Chat */}

      <div>
        <h5>Recent Conversations</h5>
        <div>
          {recentChat.map((c, index) => (
            <button key={index}>{c.title}</button>
          ))}
        </div>
      </div>

      {/* AI MODEL */}

      <div>
        <h5>AI MODEL</h5>
        <p>CryptoSense v2.1</p>
      </div>
    </div>
  );
}

export default ChatHistory;
