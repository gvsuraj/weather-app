import { useState, useEffect } from 'react';
import { fetchCurrentWeatherByCity, fetchCurrentWeatherByCoords, fetchForecast } from '../services/weatherService';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeatherData = async (fetchFn, ...args) => {
    setLoading(true);
    setError(null);
    try {
      const current = await fetchFn(...args);
      setCurrentWeather(current);
      localStorage.setItem('lastCity', current.name);

      const forecastData = await fetchForecast(current.coord.lat, current.coord.lon);
      
      // Start the simulation from the current hour
      const now = new Date();
      now.setMinutes(0, 0, 0);
      const startTime = Math.floor(now.getTime() / 1000);

      const points = forecastData.list;
      const hourly = [];

      for (let i = 0; i < 12; i++) {
        const targetTime = startTime + i * 3600;
        
        // Find the two surrounding data points for interpolation
        const nextPointIndex = points.findIndex(p => p.dt >= targetTime);
        const prevPointIndex = nextPointIndex > 0 ? nextPointIndex - 1 : 0;
        
        const prev = points[prevPointIndex];
        const next = points[nextPointIndex] || points[points.length - 1];
        
        let temp;
        if (next.dt === prev.dt) {
          temp = Math.round(next.main.temp);
        } else {
          // Linear interpolation
          const fraction = (targetTime - prev.dt) / (next.dt - prev.dt);
          temp = Math.round(prev.main.temp + (next.main.temp - prev.main.temp) * fraction);
        }

        hourly.push({
          time: new Date(targetTime * 1000).toLocaleTimeString([], { hour: 'numeric', hour12: true }),
          temp: temp,
          condition: next.weather[0].main,
          icon: next.weather[0].icon
        });
      }
      setForecast(hourly);
    } catch (err) {
      const errorMessage = typeof err === 'string' ? err : (err.message || 'An unexpected error occurred');
      setError(errorMessage);
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setLoading(false);
    }
  };

  const searchByCity = (city) => getWeatherData(fetchCurrentWeatherByCity, city);
  const searchByCoords = (lat, lon) => getWeatherData(fetchCurrentWeatherByCoords, lat, lon);

  const getByLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => searchByCoords(pos.coords.latitude, pos.coords.longitude),
      (err) => {
        setError('Location access denied');
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    const lastCity = localStorage.getItem('lastCity');
    if (lastCity) {
      searchByCity(lastCity);
    } else {
      getByLocation(); // Default to current location if no last city
    }
  }, []);

  return { currentWeather, forecast, loading, error, searchByCity, getByLocation };
};
