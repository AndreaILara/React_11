import './Location.css';
import MainWeather from '../MainWeather/MainWeather';

const Location = ({ locationWeather }) => {
  // Determinar clase CSS según la nubosidad
  const weatherClass = locationWeather.clouds.all > 50 ? 'cloudy' : 'clear';

  return (
    <li className={`saved-location ${weatherClass}`}>
      <MainWeather weather={locationWeather} />
    </li>
  );
};

export default Location;
