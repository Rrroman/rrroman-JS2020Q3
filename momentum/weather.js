const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const temperatureFeels = document.querySelector('.temperature-feels');
const weatherDescription = document.querySelector('.weather-description');
const weatherWind = document.querySelector('.weather-wind');
const weatherHumidity = document.querySelector('.weather-humidity');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=4b7c9910f7c74fcf86e886a0892412da&units=metric`;
  const res = await fetch(url);
  console.log(res);
  if (res.ok === false && city.textContent !== '[Enter City]') {
    weatherError.style.display = 'block';
    weatherError.textContent = `City not found`;
    weatherError.style.color = 'red';
    city.style.border = '2px solid red';
    city.style.borderRadius = '20px';
    city.style.width = '300px';
  }
  if (res.ok) {
    city.style.border = 'none';
    weatherError.style.display = 'none';
  }
  const data = await res.json();

  if (city.textContent === '[Enter City]') {
    city.style.border = 'none';
    weatherError.style.display = 'none';
  }

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  temperatureFeels.textContent = `Feels like: ${data.main.feels_like}°C`;
  weatherDescription.textContent = data.weather[0].description;
  weatherWind.textContent = `Wind speed: ${data.wind.speed}km/h`;
  weatherHumidity.textContent = `Humidity: ${data.wind.speed}%`;
}
getWeather();
