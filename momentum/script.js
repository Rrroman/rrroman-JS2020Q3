// DOM Elements
const time = document.querySelector('.time'),
  timeData = document.querySelector('.time-date'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

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

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    // Night
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Night, ';
  } else if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/7vDLJFb/morning.jpg')";
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/3mThcXc/afternoon.jpg')";
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    document.body.style.backgroundImage =
      "url('https://i.ibb.co/924T2Wv/night.jpg')";
    greeting.textContent = 'Good Evening, ';
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
    e.target.innerText = '';
  }
  if (e.type === 'blur' && e.target.innerText === '') {
    name.textContent = '[Enter Name]';
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
    e.target.innerText = '';
  }
  if (e.type === 'blur' && e.target.innerText === '') {
    focus.textContent = '[Enter Focus]';
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

function dayToString(data) {
  switch (data) {
    case 1:
      data = 'Monday';
      break;
    case 2:
      data = 'Tuesday';
      break;
    case 3:
      data = 'Wednesday';
      break;
    case 4:
      data = 'Thursday';
      break;
    case 5:
      data = 'Friday';
      break;
    case 6:
      data = 'Saturday';
      break;
    case 7:
      data = 'Sunday';
      break;
  }
  return data;
}
function monthToString(month) {
  switch (month) {
    case 0:
      data = 'January';
      break;
    case 1:
      data = 'February';
      break;
    case 2:
      data = 'March';
      break;
    case 3:
      data = 'April';
      break;
    case 4:
      data = 'May';
      break;
    case 5:
      data = 'June';
      break;
    case 6:
      data = 'July';
      break;
    case 7:
      data = 'August';
      break;
    case 8:
      data = 'September';
      break;
    case 9:
      data = 'October';
      break;
    case 10:
      data = 'November';
      break;
    case 11:
      data = 'December';
      break;
  }
  return data;
}

name.addEventListener('focus', setName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('focus', setFocus);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
