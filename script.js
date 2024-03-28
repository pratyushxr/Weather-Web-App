function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'Paste Your Api KEy'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.main && data.weather && data.weather.length > 0) {
                // Access properties and update UI
                const { main, weather } = data;
                const temperature = Math.round(main.temp - 273.15); // Convert Kelvin to Celsius
                const humidity = main.humidity;
                const description = weather[0].description;
                displayWeather(city, temperature, humidity, description);
            } else {
                // Handle unexpected data structure
                console.error('Error fetching weather data: Data structure is incorrect.');
            }
        })
        .catch(error => {
            // Handle fetch or parsing errors
            console.error('Error fetching weather data:', error);
        });
}
function displayWeather(city, temperature, humidity, description) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Weather: ${description}</p>
    `;
}
