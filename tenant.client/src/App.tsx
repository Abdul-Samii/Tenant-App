import { useEffect, useState } from 'react';
import theme1Styles from './themes/theme1.module.scss'; // Import theme1 styles
import theme2Styles from './themes/theme2.module.scss'; // Import theme2 styles
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
  const [forecasts, setForecasts] = useState<Forecast[]>();
  const [themeName, setThemeName] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      const hostname = window.location.hostname;
      const response = await fetch(`/api/theme/${hostname}`);
      const data = await response.json();
      setThemeName(data.themeName);
    };
    fetchTheme();
    populateWeatherData();
  }, []);

  let themeStyles;
  let currentTheme = 'theme1';
  switch (currentTheme) {
    case 'theme1':
      themeStyles = theme1Styles;
      break;
    case 'theme2':
      themeStyles = theme2Styles;
      break;
    // Add more cases for additional themes
    default:
      themeStyles = {}; // Default to empty object if theme is not found
  }

  const contents = forecasts === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tabelLabel">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Temp. (C)</th>
                    <th>Temp. (F)</th>
                    <th>Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date}>
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

  return (
    <div className={themeStyles.app}>
            <h1 id="tabelLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );

    async function populateWeatherData() {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }
}

export default App;