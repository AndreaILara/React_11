import { useState } from 'react';
import searchIcon from '/assets/lupa.png';
import './SearchBar.css';
import { apiRequest } from '../../utils/apiRequest';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ getWeather }) => {
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput(e.target.value);
    setError(false); // Resetear error al escribir
  };

  const getCoords = async (cityName) => {
    try {
      const cityLocation = await apiRequest({
        geolocation: true,
        cityName,
      });
      if (cityLocation && cityLocation.length > 0) {
        const coords = {
          lat: cityLocation[0].lat,
          lon: cityLocation[0].lon,
        };
        setError(false);
        return coords;
      } else {
        setError(true);
        return null;
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) {
      setError(true);
      return;
    }

    const coords = await getCoords(userInput.trim());
    if (coords) {
      const weatherReport = await getWeather(coords);

      // Limpiar la lista de ubicaciones previas (opcional)
      localStorage.setItem('savedLocations', JSON.stringify([weatherReport]));

      navigate(`/weather/${weatherReport.id}`);
    }
  };

  return (
    <div className="search-container">
      <form
        id="search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          id="q"
          aria-label="Buscar por ciudad"
          placeholder="Buscar por ciudad"
          type="search"
          name="q"
          value={userInput}
          onChange={handleChange}
        />
        <button type="submit">
          <img src={searchIcon} alt="Lupa" />
        </button>
      </form>
      {error && <p className="error-message">Por favor, introduce una ciudad válida.</p>}
    </div>
  );
};

export default SearchBar;
