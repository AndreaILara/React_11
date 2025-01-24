import { Link } from 'react-router-dom';
import Location from '../Location/Location';
import SearchBar from '../SearchBar/SearchBar';
import './Aside.css';

const Aside = ({ getWeather, listOfLocations }) => {
  return (
    <aside className="separation">
      <SearchBar getWeather={getWeather} />
      <nav>
        <ul>
          {listOfLocations.length > 0 ? (
            listOfLocations.map((locationWeatherReport) => (
              <li key={locationWeatherReport.id}>
                <Link to={`/weather/${locationWeatherReport.id}`}>
                  <Location locationWeather={locationWeatherReport} />
                </Link>
              </li>
            ))
          ) : (
            <p className="no-locations">
              No hay ubicaciones guardadas. Activa la geolocalización o realiza una búsqueda.
            </p>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
