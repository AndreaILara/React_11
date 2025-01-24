import { useState, useEffect } from 'react';
import Weather from '../Weather/Weather';
import './WeatherPage.css';
import Aside from '../../components/Aside/Aside';
import { updateWithoutDuplicates } from '../../utils/listUpdater';
import { apiRequest } from '../../utils/apiRequest';
import Loader from '../../components/Loader/Loader';

const WeatherPage = () => {
  const [savedLocations, setSavedLocations] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null); // Nuevo estado para la ubicación seleccionada

  const getLocalWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          getWeather(coords).then((weatherReport) => {
            if (weatherReport && weatherReport.id) {
              setSavedLocations((prevLocations) => {
                const updatedLocations = updateWithoutDuplicates(
                  weatherReport,
                  prevLocations.filter((location) => location && location.id)
                ).map((location) =>
                  location.id === weatherReport.id
                    ? { ...location, local: true }
                    : { ...location, local: false }
                );
                localStorage.setItem(
                  'savedLocations',
                  JSON.stringify(updatedLocations)
                );
                return updatedLocations;
              });
              setCurrentWeather(weatherReport); // Establecer como ubicación seleccionada
            }
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación del usuario:', error);
        }
      );
    } else {
      alert('La geolocalización no es compatible con este navegador.');
    }
  };

  const getWeather = async (coords) => {
    try {
      const weatherReport = await apiRequest({ coords });
      if (weatherReport) {
        const updatedLocations = updateWithoutDuplicates(
          weatherReport,
          savedLocations.filter((location) => location && location.id)
        );
        setSavedLocations(updatedLocations);
        localStorage.setItem(
          'savedLocations',
          JSON.stringify(updatedLocations)
        );
        return weatherReport;
      }
    } catch (error) {
      console.error('Error obteniendo el clima:', error);
    }
  };

  useEffect(() => {
    const storedLocations =
      JSON.parse(localStorage.getItem('savedLocations')) ?? [];
    const validLocations = storedLocations.filter(
      (location) => location && location.id
    );
    setSavedLocations(validLocations);

    if (navigator.geolocation) {
      const confirmLocation = window.confirm(
        '¿Permitir acceso a tu ubicación actual?'
      );
      if (confirmLocation) {
        getLocalWeather();
      }
    }
  }, []);

  return (
    <div id="weather">
      <Aside
        getWeather={getWeather}
        listOfLocations={savedLocations.filter(
          (location) => location && location.id
        )}
      />
      {currentWeather ? (
        <Weather list={[currentWeather]} /> // Mostrar la ubicación actual seleccionada
      ) : savedLocations.length ? (
        <Weather
          list={savedLocations.filter((location) => location && location.id)}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default WeatherPage;
