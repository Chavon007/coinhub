const mainDays = [{ time: "1D" }, { time: "1W" }, { time: "1M" }];

function Card({
  title,
  message,
  


  
}) {
  return (
    <div>
      {/* first stage */}
      <div>
       
       
      </div>

      {/* second stage */}

      <div>
     

        <div>
          <h5></h5>

          <div>
            <div>
              <h6>Institutional Flow</h6>
              <p>{institutionalFlow}</p>
            </div>

            <div>
              <h6>Momentum Score</h6>
              <p>{momentumScore}</p>
            </div>
            <div>
              <h6>Whale Activity</h6>
              <p>{whaleActivity}</p>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}

export default Card;
