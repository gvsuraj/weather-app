import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const SearchBar = ({ onSearch, onGetLocation }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a city..." 
          value={city} 
          onChange={(e) => setCity(e.target.value)}
          autoFocus
        />
        <button type="button" className="icon-button location-btn" onClick={onGetLocation} title="Use current location">
          <MapPin size={22} />
        </button>
        <button type="submit" className="icon-button" title="Search city">
          <Search size={22} />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
