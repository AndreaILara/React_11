import MainWeather from '../MainWeather/MainWeather';
import './Location.css';

const Location = ({ locationWeather }) => {
  if (!locationWeather || !locationWeather.clouds) {
    return null;
  }

  const backgroundColor = locationWeather.clouds.all > 50 ? 'cloudy' : 'clear';

  return (
    <div className={`saved-location ${backgroundColor}`}>
      <MainWeather weather={locationWeather} />
    </div>
  );
};

export default Location;
