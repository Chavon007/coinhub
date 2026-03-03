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
    <div>
      {/* button for new chat */}
      <div>
        <button>New Chat</button>
      </div>

      {/* Save Queries */}
      <div>
        <h5>Saved Queries</h5>
        <div>
          {savedQueries.map((q, index) => (
            <button key={index}>{q}</button>
          ))}
        </div>
      </div>

      {/* Recent Chat */}

      <div>
        <h5>Recent Conversations</h5>
        <div>
          {recentChat.map((c, index) => (
            <button key={index}>{c}</button>
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
