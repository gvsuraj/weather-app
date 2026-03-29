import React from 'react';

const Loader = ({ message = 'Fetching weather data...' }) => {
  return (
    <div className="loader-container glass-panel" style={{ padding: '40px' }}>
      <div className="spinner"></div>
      <p style={{ marginTop: '15px', fontWeight: '500', color: 'var(--text-muted)' }}>{message}</p>
    </div>
  );
};

export default Loader;
