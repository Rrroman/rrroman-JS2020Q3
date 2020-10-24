const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=4b7c9910f7c74fcf86e886a0892412da&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

city.addEventListener('focus', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

function setCity(e) {
  if (e.type === 'focus') {
    e.target.innerText = '';
  }
  if (e.type === 'blur' && e.target.innerText === '') {
    city.textContent = '[Enter City]';
  }

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', e.target.innerText);
      getWeather();
      city.blur();
    }
  } else {
    localStorage.setItem('city', e.target.innerText);
  }
}

function getCity() {
  if (localStorage.getItem('name') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

getCity();
getWeather();
