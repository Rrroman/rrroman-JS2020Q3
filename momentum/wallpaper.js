const base = [
  './assets/images/night/',
  './assets/images/morning/',
  './assets/images/day/',
  './assets/images/evening/',
];

const greeting = document.querySelector('.greeting');
const basePathUrl = './assets/images/';
let imgUrl = '';
let dayTime = '';

const images = [
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '05.jpg',
  '06.jpg',
  '07.jpg',
  '08.jpg',
  '09.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
];

function setBgImg() {
  let today = new Date(),
    hour = today.getHours();

  const random = Math.floor(Math.random() * images.length);
  if (hour < 6) {
    // Night
    let night = `${base[0]}${images[random]}`;
    greeting.textContent = 'Good Night, ';
    viewBgImage(night);
  } else if (hour < 12) {
    // Morning
    let morning = `${base[1]}${images[random]}`;
    viewBgImage(morning);
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    let day = `${base[2]}${images[random]}`;
    viewBgImage(day);
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    let evening = `${base[3]}${images[random]}`;
    viewBgImage(evening);
    greeting.textContent = 'Good Evening, ';
  }
}
const body = document.querySelector('body');

function viewBgImage(data) {
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}

let i = 1;
let a = 1;
let b = 1;
let c = 1;
let d = 1;

function getImage() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 6) {
    dayTime = 'night';
  } else if (hour < 12) {
    dayTime = 'morning';
  } else if (hour < 18) {
    dayTime = 'day';
  } else if (hour < 24) {
    dayTime = 'evening';
  }

  if (i < 20) {
    if (d < 10) {
      d = '0' + i;
    }
    imgUrl = `${basePathUrl}${dayTime}/${d}.jpg`;
    d++;
    i++;
  } else if (i < 40) {
    if (a < 10) {
      a = '0' + a;
    }
    dayTime = 'morning';
    imgUrl = `${basePathUrl}${dayTime}/${a}.jpg`;
    a++;
    i++;
  } else if (i < 60) {
    if (b < 10) {
      b = '0' + b;
    }
    dayTime = 'day';
    imgUrl = `${basePathUrl}${dayTime}/${b}.jpg`;
    b++;
    i++;
  } else if (i < 80) {
    if (c < 10) {
      c = '0' + c;
    }
    dayTime = 'evening';
    imgUrl = `${basePathUrl}${dayTime}/${c}.jpg`;
    c++;
    i++;
  } else {
    i = 1;
  }

  viewBgImage(imgUrl);
  wallpaper.disabled = true;
  setTimeout(function () {
    wallpaper.disabled = false;
  }, 1000);
}

const wallpaper = document.querySelector('.wallpaper');
wallpaper.addEventListener('click', getImage);

setBgImg();
