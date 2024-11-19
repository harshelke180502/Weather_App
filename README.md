# Weather App

A modern, responsive weather application built with React that provides real-time weather information using the WeatherAPI.com service.

## Features

- Real-time weather data display
- Search functionality for any location worldwide
- Displays current temperature, weather condition, humidity, and wind speed
- Responsive design with clean UI
- Loading states and error handling
- Icons for weather conditions and metrics

## Technologies Used

- React.js
- WeatherAPI.com REST API
- Font Awesome for icons
- Google Fonts (Poppins)
- CSS for styling

## Project Structure

weather-app/
├── public/
│ └── index.html
├── src/
│ ├── App.js
│ ├── index.js
│ └── styles.css
└── README.md



## How It Works

1. **Initial Setup**
   - The app initializes with 'London' as the default city
   - Loads necessary environment variables for API access
   - Sets up state management using React hooks

2. **Core Functionality**
   - Fetches weather data from WeatherAPI.com
   - Handles user input for city searches
   - Manages loading states during API calls
   - Implements error handling for invalid inputs or API issues

3. **User Interface Components**
   - Search box with location input
   - Weather display card showing:
     - Temperature in Celsius
     - Weather condition with icon
     - Location name and country
     - Humidity percentage
     - Wind speed in km/h

4. **Features Implementation**
   - Real-time data updates on city search
   - Form submission handling
   - Enter key press detection
   - Loading spinner during data fetch
   - Error messages for invalid inputs
   - Responsive design for all screen sizes

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your WeatherAPI key:
   ```
   REACT_APP_WEATHER_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## API Integration

The app uses WeatherAPI.com for weather data:
- Endpoint: `https://api.weatherapi.com/v1/current.json`
- Required parameters:
  - `key`: API key for authentication
  - `q`: City name for weather data
  - `aqi`: Air quality data flag

## Component Structure

1. **App Component**
   - Main container component
   - Manages state and API calls
   - Handles user interactions
   - Renders child components

2. **UI Elements**
   - Search form with input field
   - Weather display card
   - Loading spinner
   - Error messages

## State Management

Uses React's useState hook for managing:
- Current city
- Weather data
- Loading states
- Error handling

## Error Handling

- Validates API key presence
- Checks for empty city inputs
- Handles API response errors
- Displays user-friendly error messages

## Future Enhancements

Potential features to add:
- Weather forecast for multiple days
- Temperature unit conversion
- Geolocation support
- Weather alerts
- More detailed weather metrics
- Save favorite locations

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
