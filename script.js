document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('searchButton').addEventListener('click', getWeather);
    
    document.getElementById('cityInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            getWeather();
        }
    });

    // Load default city
    document.getElementById('cityInput').value = 'London';
    getWeather();
});

async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value;

    if (!city) {
        alert('Please enter a location');
        return;
    }

    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${config.apiKey}&q=${city}&aqi=no`
        );

        if (!response.ok) {
            throw new Error('Location not found');
        }

        const data = await response.json();
        displayWeather(data);
        document.getElementById('error').style.display = 'none';
        document.querySelector('.weather-box').style.display = 'block';
    } catch (error) {
        document.getElementById('error').style.display = 'block';
        document.querySelector('.weather-box').style.display = 'none';
        console.error('Error:', error);
    }
}

function displayWeather(data) {
    const {
        location: { name, country },
        current: {
            temp_c,
            condition: { text, icon },
            humidity,
            wind_kph
        }
    } = data;

    document.getElementById('city').textContent = `${name}, ${country}`;
    document.getElementById('temperature').textContent = `${Math.round(temp_c)}°C`;
    document.getElementById('description').textContent = text;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(wind_kph)} km/h`;
    document.getElementById('weatherIcon').src = `https:${icon}`;
} 