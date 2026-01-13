import { usePortfolio } from "@/context/portfolioContext";

function Holdings() {
  const { loading, portfolio } = usePortfolio();
  const theHolding = portfolio?.holdings?.map((h) => ({
    asset: h.coin,
    amount: h.amount,
    price: h.currentValue,
    value: h.totalValue,
    pnl: h.pnl,
    pnlPercentage: h.pnlPercentage,
  }));

  if (loading) return <p>loading.....</p>;
  return (
    <div>
      <h3>Holding</h3>

      <thead>
        <tr>
          <th>Asset</th>
          <th>Amount</th>
          <th>Price</th>
          <th>Value</th>
          <th>P&L</th>
          <th>P&L percentage</th>
        </tr>
      </thead>

      <tbody>
        {theHolding.map((holding, index) ? =>  (<div>
            <p>You currently do not have any holdinhgs</p>
        </div>) : (
          <tr key={index}>
            <td>{holding.asset}</td>
            <td>{holding.amount}</td>
            <td>{holding.currentValue}</td>
            <td>{holding.totalValue}</td>
            <td>
              {holding.pnl >= 0 ? "text-accent-green" : "text-accent-red"}
            </td>
            <td>
              {holding.pnlPercentage >= 0
                ? "text-accent-green"
                : "text-accent-red"}
            </td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default Holdings;
