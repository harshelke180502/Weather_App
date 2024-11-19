import React, { useState, useEffect } from 'react';

function App() {
  // State variables using useState hook
  // city: stores the current city name, default is 'London'
  const [city, setCity] = useState('London');
  // weatherData: stores the weather information received from API
  const [weatherData, setWeatherData] = useState(null);
  // error: tracks if there's an error in API call
  const [error, setError] = useState(false);
  // loading: tracks if data is being fetched
  const [loading, setLoading] = useState(true);

  // Log API key to verify it's loaded from environment variables
  console.log('API Key:', process.env.REACT_APP_WEATHER_API_KEY);

  // Async function to fetch weather data from the API
  const getWeather = async () => {
    // Check if API key exists in environment variables
    if (!process.env.REACT_APP_WEATHER_API_KEY) {
      setError(true);
      setLoading(false);
      console.error('API key is missing');
      return;
    }

    // Validate if city input is not empty
    if (!city.trim()) {
      setError(true);
      setLoading(false);
      return;
    }

    // Set loading state while fetching data
    setLoading(true);
    setError(false);

    try {
      // Construct API URL with environment variable and encoded city name
      const url = `https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${encodeURIComponent(city)}&aqi=no`;
      
      // Fetch data from API
      const response = await fetch(url);
      const data = await response.json();

      // Check if API returned an error
      if (data.error) {
        throw new Error(data.error.message);
      }

      // Update state with weather data
      setWeatherData(data);
      setError(false);
    } catch (error) {
      // Handle any errors that occur during API call
      console.error('Error details:', error);
      setError(true);
      setWeatherData(null);
    } finally {
      // Set loading to false regardless of success/failure
      setLoading(false);
    }
  };

  // useEffect hook to fetch weather data when component mounts
  useEffect(() => {
    getWeather();
  }, []); // Empty dependency array means this runs once on mount

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    getWeather(); // Fetch weather data
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      getWeather();
    }
  };

  // Render component
  return (
    <div className="container">
      {/* Search form */}
      <form onSubmit={handleSubmit} className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input 
          type="text" 
          value={city}
          onChange={(e) => setCity(e.target.value)} // Update city state on input change
          onKeyPress={handleKeyPress}
          placeholder="Enter your location"
          aria-label="Enter city name"
        />
        <button type="submit">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="loading">
          <i className="fa-solid fa-spinner fa-spin"></i>
          Loading...
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="error">
          <i className="fa-solid fa-triangle-exclamation"></i>
          Please enter a valid location
        </div>
      )}

      {/* Weather information - only shown when data is loaded and no errors */}
      {!loading && !error && weatherData && (
        <div className="weather-box">
          {/* Main weather details */}
          <div className="weather-details">
            <img 
              src={`https:${weatherData.current.condition.icon}`} 
              alt={weatherData.current.condition.text}
            />
            <div className="temperature">
              {Math.round(weatherData.current.temp_c)}°C
            </div>
            <div className="description">
              {weatherData.current.condition.text}
            </div>
            <div className="location">
              {weatherData.location.name}, {weatherData.location.country}
            </div>
          </div>

          {/* Additional weather information */}
          <div className="weather-info">
            {/* Humidity information */}
            <div className="info-item">
              <i className="fa-solid fa-droplet"></i>
              <div>
                <div className="info-title">Humidity</div>
                <div className="info-value">{weatherData.current.humidity}%</div>
              </div>
            </div>
            {/* Wind speed information */}
            <div className="info-item">
              <i className="fa-solid fa-wind"></i>
              <div>
                <div className="info-title">Wind Speed</div>
                <div className="info-value">
                  {Math.round(weatherData.current.wind_kph)} km/h
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;