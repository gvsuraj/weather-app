import React from 'react';
import { motion } from 'framer-motion';
import { getIconMap } from '../services/weatherService';

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6,
      staggerChildren: 0.05,
      delayChildren: 0.2
    } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Forecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return null;

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-panel"
      style={{ padding: '20px' }}
    >
      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '15px' }}>Next 12 Hours</h3>
      <div className="forecast-container hide-scrollbar">
        {forecast.map((item, index) => (
          <motion.div 
            key={index}
            variants={itemVariants}
            className="forecast-item"
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="forecast-time">{index === 0 ? 'Now' : item.time}</span>
            <img 
              src={getIconMap(item.condition)} 
              alt={item.condition} 
              className="forecast-icon"
              onError={(e) => {
                e.target.src = `https://openweathermap.org/img/wn/${item.icon}.png`;
              }}
            />
            <span className="forecast-temp">{item.temp}°</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;
