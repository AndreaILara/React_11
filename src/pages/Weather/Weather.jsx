import { useParams } from 'react-router-dom';
import MainWeather from '../../components/MainWeather/MainWeather';
import './Weather.css';

const Weather = ({ list }) => {
  const params = useParams();

  if (!list || list.length === 0) {
    return <p>No hay datos disponibles.</p>;
  }

  const localWeather = list.find((location) => location.local);
  const defaultWeatherId = localWeather ? localWeather.id : list[0].id;
  const locationId = params.id || defaultWeatherId;
  const weather = list.find((location) => location.id == locationId);

  if (!weather || !weather.clouds) {
    return <p>Datos incompletos para esta ubicación.</p>;
  }

  // Determina el fondo dinámico según las nubes
  const weatherClass = weather.clouds.all > 50 ? 'cloudy' : 'clear';

  return (
    <section id="main-weather" className={`separation ${weatherClass}`}>
      <MainWeather weather={weather} />
      <div className="additional-info">
        <ul>
          <li>
            <b>Viento:</b> {weather.wind?.speed || 'N/A'} m/s
          </li>
          <li>
            <b>Presión:</b> {weather.main?.pressure || 'N/A'} hPa
          </li>
          <li>
            <b>Humedad:</b> {weather.main?.humidity || 'N/A'} %
          </li>
          <li>
            <b>Nubosidad:</b> {weather.clouds?.all || 'N/A'} %
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Weather;
