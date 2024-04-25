import { useEffect, useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import Banner from './Banner';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

function App() {
  const [forecasts, setForecasts] = useState<Forecast[]>();
  const [faviconUrl, setFaviconUrl] = useState<string | ArrayBuffer | null>();

  const handleFaviconUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const uploadedFaviconUrl = reader.result as string;
        setFaviconUrl(uploadedFaviconUrl);

        const faviconLink = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
        if (faviconLink) {
          faviconLink.setAttribute('href', uploadedFaviconUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    populateWeatherData();
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
      <Banner />
      <p>Upload Favicon:</p>
      <input type="file" accept=".ico,.png,.svg" onChange={handleFaviconUpload} />
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