// DOM Elements
const time = document.querySelector('.time'),
  timeData = document.querySelector('.time-date'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus'),
  city = document.querySelector('.city');
let temp = '';

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),
    day = today.getDay(),
    date = today.getDate(),
    month = today.getMonth();
  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )}`;
  timeData.innerHTML = `${dayToString(day)}, ${date} ${monthToString(month)}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function setCity(e) {
  if (e.type === 'focus') {
    temp = city.textContent;
    city.textContent = '';
  } else if (e.type === 'blur' && city.textContent === '') {
    city.textContent = temp;
    temp = '';
  }

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('city', city.textContent);
      getWeather();
      city.blur();
    }
  } else {
    localStorage.setItem('city', city.textContent);
  }
}

function getCity() {
  if (localStorage.getItem('name') === null) {
    city.textContent = '[Enter City]';
  } else {
    city.textContent = localStorage.getItem('city');
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'focus') {
    temp = name.textContent;
    name.textContent = '';
  } else if (e.type === 'blur' && name.textContent === '') {
    name.textContent = temp;
    temp = '';
  }

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'focus') {
    temp = focus.textContent;
    focus.textContent = '';
  } else if (e.type === 'blur' && focus.textContent === '') {
    focus.textContent = temp;
    temp = '';
  }

  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

function dayToString(day) {
  switch (day) {
    case 1:
      day = 'Monday';
      break;
    case 2:
      day = 'Tuesday';
      break;
    case 3:
      day = 'Wednesday';
      break;
    case 4:
      day = 'Thursday';
      break;
    case 5:
      day = 'Friday';
      break;
    case 6:
      day = 'Saturday';
      break;
    case 0:
      day = 'Sunday';
      break;
  }
  return day;
}
function monthToString(month) {
  switch (month) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'May';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
  }
  return month;
}

name.addEventListener('focus', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
city.addEventListener('focus', setCity);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);

// Run
showTime();
getName();
getFocus();
getCity();
