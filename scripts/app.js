document.getElementById('fetch-data').addEventListener('click', async function() {
    const location = document.getElementById('location').value.trim();
  
    if (location === "") {
      alert("Please enter a location.");
      return;
    }
  

    document.getElementById('surf-list').innerHTML = '';
    document.getElementById('weather-info').innerHTML = '';
  
    try {
      
      const surfResponse = await fetch(`https://api.example.com/surf?location=${location}`);
      const surfData = await surfResponse.json();
      

      if (surfData && surfData.length > 0) {
        const surfList = document.getElementById('surf-list');
        surfData.forEach(surf => {
          const listItem = document.createElement('li');
          listItem.textContent = `Wave Height: ${surf.waveHeight} ft - Wind Speed: ${surf.windSpeed} mph`;
          surfList.appendChild(listItem);
        });
      } else {
        document.getElementById('surf-list').textContent = "No surf data available.";
      }
  
      
      const weatherResponse = await fetch(`https://api.weatherbit.io/v2.0/current?city=${location}&key=your_weatherbit_api_key`);
      const weatherData = await weatherResponse.json();
  

      if (weatherData && weatherData.data.length > 0) {
        const weatherInfo = document.getElementById('weather-info');
        const weather = weatherData.data[0];
        weatherInfo.innerHTML = `
          <p>Temperature: ${weather.temp}°C</p>
          <p>Humidity: ${weather.rh}%</p>
          <p>Wind Speed: ${weather.wind_spd} m/s</p>
          <p>Weather Description: ${weather.weather.description}</p>
        `;
      } else {
        document.getElementById('weather-info').textContent = "No weather data available.";
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please try again later.');
    }
  });
  