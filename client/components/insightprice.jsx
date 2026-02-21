function PriceInsight({
  coin,
  currentPrice,
  percent,
  timeframeTabs,
  conference,
  target,
  volatility,
}) {
  return (
    <div>
      <div>
        <h5>{coin}</h5>
        <div>
          {/* price */}
          <div>
            <p>{currentPrice}</p>
            <small>{percent}</small>
          </div>

          <div>
            {timeframeTabs?.map((t) => (
              <button key={t}> {t}</button>
            ))}
          </div>
        </div>

        <div>
          <div>
            {" "}
            <div>
              <h5>{coin}</h5>
              <div>
                {/* price */}
                <div>
                  <p>{currentPrice}</p>
                  <small>{percent}</small>
                </div>

                <div>{days({ mainDays })}</div>
              </div>

              <div>
                <div>{/* Graph is meant to be here */}</div>

                <div>
                  <p>
                    <span>Conference</span>
                    <span>{conference}</span>
                  </p>
                  <p>
                    <span>Target</span>
                    <span>{target}</span>
                  </p>
                  <p>
                    <span>Volatility</span> <span>{volatility}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p>
              <span>Conference</span>
              <span>{conference}</span>
            </p>
            <p>
              <span>Target</span>
              <span>{target}</span>
            </p>
            <p>
              <span>Volatility</span> <span>{volatility}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PriceInsight;
