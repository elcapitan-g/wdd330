window.onload = async function() {
    const weatherLocation = "Kawaihae";
    const weatherApiKey = "897d3ae300f969c5ba83411c7202cf8f";
    const surfApiUrl = 'https://marine-api.open-meteo.com/v1/marine?latitude=20.0354&longitude=-155.8265&hourly=wave_height,wave_direction,wave_period';

    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherLocation}&appid=${weatherApiKey}&units=metric`);
        const weatherData = await weatherResponse.json();

        if (weatherData.cod === 200) {
            displayWeather(weatherData); 
        } else {
            throw new Error("Location not found");
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weather-info').textContent = "Failed to fetch weather data.";
    }

    try {
        const surfResponse = await fetch(surfApiUrl);
        const surfData = await surfResponse.json();

        if (surfData && surfData.hourly) {
            displaySurfData(surfData.hourly);
        } else {
            throw new Error("No surf data found");
        }
    } catch (error) {
        console.error('Error fetching surf data:', error);
        document.getElementById('surf-list').textContent = "Failed to fetch surf data.";
    }
};

function displayWeather(weather) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <p>Location: ${weather.name}, ${weather.sys.country}</p>
        <p>Temperature: ${weather.main.temp}°C</p>
        <p>Humidity: ${weather.main.humidity}%</p>
        <p>Wind Speed: ${weather.wind.speed} m/s</p>
        <p>Weather: ${weather.weather[0].description}</p>
    `;
}

function displaySurfData(surfData) {
    const surfList = document.getElementById('surf-list');
    const waveHeight = surfData.wave_height[0];
    const waveDirection = surfData.wave_direction[0];
    const wavePeriod = surfData.wave_period[0];

    if (waveHeight && waveDirection && wavePeriod) {
        surfList.innerHTML = `
            <p>Wave Height: ${waveHeight} m</p>
            <p>Wave Direction: ${waveDirection}°</p>
            <p>Wave Period: ${wavePeriod} s</p>
        `;
    } else {
        surfList.textContent = "No surf data available.";
    }
}
