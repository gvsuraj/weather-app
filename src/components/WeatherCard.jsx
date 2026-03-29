import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getIconMap } from '../services/weatherService';

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: condition } = weather;
  const temp = Math.round(main.temp);
  const conditionMain = condition[0].main;
  const iconURL = getIconMap(conditionMain);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel weather-card"
    >
      <div className="city-info">
        <h2 className="city-name">{name}</h2>
        <p className="condition">{conditionMain}</p>
      </div>
      
      <img 
        src={iconURL} 
        alt={conditionMain} 
        className="weather-icon-main animate-float"
        onError={(e) => {
          // Fallback to API icon if local doesn't exist
          e.target.src = `https://openweathermap.org/img/wn/${condition[0].icon}@4x.png`;
        }}
      />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={temp}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className="temperature"
        >
          {temp}<span className="unit">°C</span>
        </motion.div>
      </AnimatePresence>
      
      <div className="details" style={{ display: 'flex', gap: '25px', marginTop: '10px' }}>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Humidity</p>
          <p style={{ fontWeight: '600' }}>{main.humidity}%</p>
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wind</p>
          <p style={{ fontWeight: '600' }}>{Math.round(weather.wind.speed * 3.6)} km/h</p>
        </div>
        <div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Feels like</p>
          <p style={{ fontWeight: '600' }}>{Math.round(main.feels_like)}°C</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;
