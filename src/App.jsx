import React from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import { useWeather } from './hooks/useWeather';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const { currentWeather, forecast, loading, error, searchByCity, getByLocation } = useWeather();

  console.log('App State:', { currentWeather, forecast, loading, error });

  return (
    <div className="app-container">
      {/* App Header / Title */}
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '2rem', 
        fontWeight: '700', 
        color: '#2c3e50', 
        letterSpacing: '-1px',
        marginBottom: '-10px'
      }}>
        SkyCast
      </h1>

      <SearchBar onSearch={searchByCity} onGetLocation={getByLocation} />

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader />
          </motion.div>
        )}

        {error && !loading && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel"
            style={{ 
              padding: '30px', 
              textAlign: 'center', 
              color: '#e74c3c', 
              fontWeight: '500', 
              border: '1px solid rgba(231, 76, 60, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <img src="/assets/icons/no-result.svg" alt="Error" width="100" className="animate-float" />
            <p>Oops! {error === 'city not found' ? 'City name is invalid. Please try again.' : error}</p>
          </motion.div>
        )}

        {currentWeather && !loading && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
          >
            <WeatherCard weather={currentWeather} />
            <Forecast forecast={forecast} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ 
        textAlign: 'center', 
        fontSize: '0.8rem', 
        color: 'var(--text-muted)', 
        marginTop: '20px', 
        paddingBottom: '20px' 
      }}>
        <p>&copy; 2026 SkyCast Weather App. All rights reserved.</p>
        <p style={{ marginTop: '5px' }}>Data provided by OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;
