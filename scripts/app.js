const beaches = {
    "hapuna": {
        latitude: 20.0166,
        longitude: -155.7886,
        location: "Hapuna Beach"
    },
    "puako": {
        latitude: 20.0133,
        longitude: -155.8520,
        location: "Puako Beach"
    },
    "mauna kea": {
        latitude: 20.0244,
        longitude: -155.8121,
        location: "Mauna Kea Beach"
    },
    "kua bay": {
        latitude: 20.0047,
        longitude: -155.8896,
        location: "Kua Bay"
    },
    "kawaihae": {
        latitude: 20.0354,
        longitude: -155.8265,
        location: "Kawaihae"
    },
    "mahukona": {
        latitude: 20.0034,
        longitude: -155.9147,
        location: "Mahukona"
    },
    "kiholo bay": {
        latitude: 19.9447,
        longitude: -155.9432,
        location: "Kiholo Bay"
    },
    "a bay": {
        latitude: 19.9396,
        longitude: -155.9992,
        location: "A Bay"
    }
};

function searchBeach() {
    const searchTerm = document.getElementById('beach-search').value.toLowerCase();
    const selectedBeach = beaches[searchTerm];

    if (selectedBeach) {
        
        fetchWeatherData(selectedBeach);
        fetchSurfData(selectedBeach);
        displayBeachName(selectedBeach.location);

        
        saveBeachToLocalStorage(selectedBeach);
    } else {
        alert("Beach not found. Please try again.");
        clearData();
    }
}


async function fetchWeatherData(beach) {
    const weatherApiKey = "897d3ae300f969c5ba83411c7202cf8f";
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${beach.latitude}&lon=${beach.longitude}&appid=${weatherApiKey}&units=metric`);
    const weatherData = await weatherResponse.json();

    if (weatherData.cod === 200) {
        displayWeather(weatherData, beach.location);
    } else {
        document.getElementById('weather-info').textContent = "Failed to fetch weather data.";
    }
}


async function fetchSurfData(beach) {
    const surfApiUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${beach.latitude}&longitude=${beach.longitude}&hourly=wave_height,wave_direction,wave_period`;
    const surfResponse = await fetch(surfApiUrl);
    const surfData = await surfResponse.json();

    if (surfData && surfData.hourly) {
        displaySurfData(surfData.hourly);
    } else {
        document.getElementById('surf-list').textContent = "Failed to fetch surf data.";
    }
}


function displayWeather(weather, beachName) {
    const weatherInfo = document.getElementById('weather-info');
    weatherInfo.innerHTML = `
        <h3>Weather for ${beachName}</h3>
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

function displayBeachName(beachName) {
    const beachNameContainer = document.getElementById('beach-name');
    beachNameContainer.innerHTML = `<h2>${beachName}</h2>`;
}

function saveBeachToLocalStorage(beach) {
    let favorites = JSON.parse(localStorage.getItem('favoriteBeaches')) || [];

    if (!favorites.some(fav => fav.location === beach.location)) {
        favorites.push(beach);
        localStorage.setItem('favoriteBeaches', JSON.stringify(favorites));
        updateFavoritesDisplay();
    }
}


function updateFavoritesDisplay() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = ''; // Clear current list

    let favorites = JSON.parse(localStorage.getItem('favoriteBeaches')) || [];
    favorites.forEach(fav => {
        const listItem = document.createElement('li');
        listItem.textContent = fav.location;
        favoritesList.appendChild(listItem);

        
        listItem.addEventListener('click', () => removeFavorite(fav));
    });
}

function removeFavorite(beach) {
    let favorites = JSON.parse(localStorage.getItem('favoriteBeaches')) || [];
    favorites = favorites.filter(fav => fav.location !== beach.location);
    localStorage.setItem('favoriteBeaches', JSON.stringify(favorites));
    updateFavoritesDisplay();
}


function clearData() {
    document.getElementById('surf-list').innerHTML = '';
    document.getElementById('weather-info').innerHTML = '';
    document.getElementById('beach-name').innerHTML = '';
}


window.onload = function() {
    updateFavoritesDisplay();
}

function saveBeachToLocalStorage(beach) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    
    if (!favorites.includes(beach)) {
        favorites.push(beach);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}


function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';  

    favorites.forEach((beach) => {
        const listItem = document.createElement('li');
        listItem.textContent = beach;
        favoritesList.appendChild(listItem);
    });
}


function searchBeach() {
    const searchTerm = document.getElementById('beach-search').value.toLowerCase();
    const selectedBeach = beaches[searchTerm];

    if (selectedBeach) {
        fetchWeatherData(selectedBeach);
        fetchSurfData(selectedBeach);
        displayBeachName(selectedBeach.location);  
        
        
        saveBeachToLocalStorage(selectedBeach.location);
    } else {
        alert("Beach not found. Please try again.");
        clearData();
    }
}


window.onload = function() {
    loadFavorites();  
};
