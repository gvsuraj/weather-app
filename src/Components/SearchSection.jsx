const SearchSection = ({ getWeatherDetails, searchInputRef }) => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const handleCitySearch = (e) => {
    e.preventDefault();
    const input = e.target.querySelector(".search-input");
    const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${input.value}&days=2`;
    getWeatherDetails(API_URL);
  };

  const handleLocationSearch = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const API_URL = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
        getWeatherDetails(API_URL); 
        window.innerWidth >= 768 && searchInputRef.current.focus();
      },
      () => {
        alert("Location access denied. Please enable permissions to use this feature.");
      }
    );
  };
  return (
    <div className="search-section">
      <form action="#" className="search-form" onSubmit={handleCitySearch}>
        <span className="material-symbols-outlined">search</span>
       <input  type="text"  placeholder="Enter a city name: "  className="search-input"  ref={searchInputRef}  autoComplete="new-password"  name="city-search"
        required/>
      </form>
      <button className="location-button" onClick={handleLocationSearch}>
        <span className="material-symbols-outlined">my_location</span>
      </button>
    </div>
  );
};
export default SearchSection;