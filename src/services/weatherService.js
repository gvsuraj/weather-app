import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const UNITS = 'metric';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchCurrentWeatherByCity = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: UNITS
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'City not found';
  }
};

export const fetchCurrentWeatherByCoords = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: UNITS
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching location weather';
  }
};

export const fetchForecast = async (lat, lon) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: UNITS
      }
    });

    // OpenWeatherMap free API gives 3-hour intervals for 5 days.
    // We need 12 hours starting from now (simulated hourly).
    // We'll take the first 4-5 points (12-15 hours) and map them.
    // Or we can simple take the first 8 points (24h) and only display first 12 if we want more data.
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching forecast';
  }
};

export const getIconMap = (code) => {
  if (!code) return '/assets/icons/clear.svg';

  const condition = code.toLowerCase();
  
  if (condition.includes('clear')) return '/assets/icons/clear.svg';
  if (condition.includes('cloud')) return '/assets/icons/clouds.svg';
  if (condition.includes('thunderstorm')) {
    if (condition.includes('rain')) return '/assets/icons/thunder_rain.svg';
    return '/assets/icons/thunder.svg';
  }
  if (condition.includes('heavy') && condition.includes('rain')) return '/assets/icons/moderate_heavy_rain.svg';
  if (condition.includes('rain') || condition.includes('drizzle')) return '/assets/icons/rain.svg';
  if (condition.includes('snow')) return '/assets/icons/snow.svg';
  if (condition.includes('mist') || condition.includes('fog') || condition.includes('haze') || condition.includes('smoke')) return '/assets/icons/mist.svg';
  
  return '/assets/icons/clouds.svg'; // Default to clouds for unknown
};
