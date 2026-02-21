function ScenarioSimulator({
  forecast,
  forecastPercent,
  portfolioImpact,
  correlation,
}) {
  return (
    <div>
      <div>
        <h5>SCENARIO SIMULATOR</h5>

        <div>
          <p>{forecast}</p>
          <p>{forecastPercent}</p>
        </div>

        <div>
          <div>
            <h6>Portfolio Impact</h6>
            <p>{portfolioImpact}</p>
          </div>

          <div>
            <h6>Correlation</h6>
            <p>{correlation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScenarioSimulator;
