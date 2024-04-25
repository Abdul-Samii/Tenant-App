import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
//import theme1Styles from './themes/theme1.module.scss';
//import theme2Styles from './themes/theme2.module.scss';
interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

//interface ThemeI {
  //app: string
//}
function App() {
  const [forecasts, setForecasts] = useState<Forecast[]>();
  //const [theme, setTheme] = useState<ThemeI>();

  //will handle the domains in next branch
  //const domainToThemeMap: any = {
    //'foo.com': theme1Styles,
    //'localhost': theme2Styles,
  //};

  useEffect(() => {
    populateWeatherData();
    //const domainName = window.location.hostname;
    //const ctheme = domainToThemeMap[domainName];
    //console.log('domain - ', ctheme.app)
    //setTheme(ctheme || 'defaultTheme');
  }, []);

  const { theme } = useContext(ThemeContext);
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
    <div className={theme?.app}>
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