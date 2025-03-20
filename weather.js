
const apiKey = 'e585fbaf7e314f7b5c1a1ed2fd74d98d'; // Replace with your actual API key
const getWeatherBtn = document.getElementById('getWeather');
const cityInput = document.getElementById('city');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const feelsLikeElement = document.getElementById('feelsLike');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');
const uvIndexElement = document.getElementById('uvIndex');

getWeatherBtn.addEventListener('click', () => {
  const city = cityInput.value.trim(); // Ensure no spaces
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const { name, main, weather, wind } = data;
      const temperature = main.temp;
      const feelsLike = main.feels_like;
      const humidity = main.humidity;
      const description = weather[0].description;
      const windSpeed = wind.speed;
      const uvIndex = 6; // OpenWeather doesn't give UV in this endpoint, so you can hardcode or find another API

      // Update the UI with the new weather information
      locationElement.textContent = name;
      temperatureElement.textContent = `${temperature}°C`;
      descriptionElement.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      feelsLikeElement.textContent = `${feelsLike}°C`;
      humidityElement.textContent = `${humidity}%`;
      windElement.textContent = `${windSpeed} km/h`;
      uvIndexElement.textContent = uvIndex; // Hardcoded for now

      // Clear the input field after updating
      cityInput.value = '';
    })
    .catch(error => {
      alert(error.message); // Show an alert if there's an error (e.g., city not found)
    });
});
