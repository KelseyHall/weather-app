import { useEffect, useState } from 'react';
import './style.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/data/2.5/onecall?lat=43.913043&lon=-78.689617&exclude=current,minutely,hourly,alerts&appid=${process.env.REACT_APP_API_key}&units=metric`
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
                  <div className="weatherDay" key={uuidv4()}>
                    <p>{formatDate.toString()}</p>
                    <img
                      src={`https://openweathermap.org/img/wn/${weather[0].icon}.png`}
                      alt="represents weather"
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
              return console.log('hide extra');
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
