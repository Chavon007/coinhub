import { usePortfolio } from "@/context/portfolioContext";

function Holdings() {
  const { loading, portfolio } = usePortfolio();
  const theHolding = portfolio?.holdings?.map((h) => ({
    asset: h.coin,
    amount: h.amount,
    price: h.currentPrice,
    value: h.totalValue,
    invested: h.invested,
    pnl: h.pnl,
    pnlPercentage: parseFloat(h.pnlPercentage),
  }));

  if (loading) return <p>loading.....</p>;

  if (!theHolding || theHolding.length === 0)
    return <p>You currently do not have any holdings.</p>;
  return (
    <div>
      <h3>Holding</h3>

      <table>
        <thead>
          <tr>
            <th>Asset</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Value</th>
            <th>Invested</th>
            <th>P&L</th>
            <th>P&L percentage</th>
          </tr>
        </thead>

        <tbody>
          {theHolding.map((h, index) => (
            <tr key={index}>
              <td>{h.asset}</td>
              <td>{h.amount}</td>
              <td>{h.currentPrice}</td>
              <td>{h.totalValue}</td>
              <td>{h.invested}</td>
              <td>{h.pnl >= 0 ? "text-accent-green" : "text-accent-red"}</td>
              <td>
                {h.pnlPercentage >= 0 ? "text-accent-green" : "text-accent-red"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Holdings;
