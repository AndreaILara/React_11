import { useParams } from 'react-router-dom';
import MainWeather from '../../components/MainWeather/MainWeather';
import './Weather.css';

const Weather = ({ list }) => {
  const params = useParams();

  // Encuentra el clima local o usa el primer elemento como predeterminado
  const localWeather = list.find(location => location.local);
  const defaultWeatherId = localWeather ? localWeather.id : list[0].id;
  const locationId = params.id || defaultWeatherId;
  const weather = list.find(location => location.id == locationId); // Uso == porque params.id es string

  // Determinar el color de fondo dinámicamente
  const backgroundColor =
    weather?.clouds.all > 50 ? 'var(--color-cloudy-day)' : 'var(--color-clear-day)';

  return (
    <>
      {weather && (
        <section
          id="main-weather"
          className="separation"
          style={{
            backgroundColor, // Aplica el color dinámico
          }}
        >
          <MainWeather weather={weather} />
          <div className="additional-info">
            <ul>
              <li>
                <b>Viento:</b> {weather.wind.speed} m/s
              </li>
              <li>
                <b>Presión:</b> {weather.main.pressure} hPa
              </li>
              <li>
                <b>Humedad:</b> {weather.main.humidity} %
              </li>
              <li>
                <b>Nubosidad:</b> {weather.clouds.all} %
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
};

export default Weather;
