function SentimentInsight({ sentimentRadius, sentimentRadiusMessage }) {
  return (
    <div>
      <div>
        <h5>SENTIMENT RADIUS</h5>
        <p>{sentimentRadius}</p>
        <p>{sentimentRadiusMessage}</p>
      </div>
    </div>
  );
}

export default SentimentInsight;
