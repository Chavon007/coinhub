function SignalItems({ label, value }) {
  return (
    <div>
      <h3>{label}</h3>
      <p>{value}</p>
    </div>
  );
}

function SignalInsight({ institutionalFlow, momentumScore, whaleActivity }) {
  return (
    <div>
      <h5>SIGNAL STRENGTH</h5>

      <div>
        <SignalItems label="Institutional Flow" value={institutionalFlow} />
        <SignalItems label="Momentum Score" value={momentumScore} />
        <SignalItems label="Whale Activity" value={whaleActivity} />
      </div>
    </div>
  );
}

export default SignalInsight;
