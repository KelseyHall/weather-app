import { useEffect, useState } from 'react';
import './style.css';
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      'http://api.openweathermap.org/data/2.5/onecall?lat=43.913043&lon=-78.689617&exclude=current,minutely,hourly,alerts&appid=e191e8f9a422b92f26265552a18aa515&units=metric'
    )
      .then((response) => response.json())
      .then((actualData) => setData(actualData))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let count = 0;
  return (
    <div className="App">
      <header className="App-header">
        {data ? (
          <div className="fiveDayForecast">
            {data.daily.map(({ id, dt, temp, weather }) => {
              let date = new Date(dt * 1000);
              const options = { weekday: 'short' };
              let formatDate = new Intl.DateTimeFormat('en-US', options).format(
                date
              );

              if (count < 5) {
                count++;
                return (
                  <div className="weatherDay" key={id}>
                    <p>{formatDate.toString()}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                    />

                    <p>
                      <span
                        style={{
                          fontWeight: 'bold',
                          padding: '0 10px',
                          color: '#333333',
                        }}
                      >
                        {`${Math.round(temp.max)}°`}
                      </span>
                      {`${Math.round(temp.min)}°`}
                    </p>
                  </div>
                );
              }
              return;
            })}
          </div>
        ) : (
          <h2>error</h2>
        )}
      </header>
    </div>
  );
}

export default App;
