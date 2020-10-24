base = [
  './assets/images/night/',
  './assets/images/morning/',
  './assets/images/day/',
  './assets/images/evening/',
];

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

let i = 0;

function viewBgImage(data) {
  const body = document.querySelector('body');
  const src = data;
  const img = document.createElement('img');
  img.src = src;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
  };
}
function getImage() {
  const index = i % images.length;
  let imageSrc = base + images[index];
  viewBgImage(imageSrc);
  i++;
  wallpaper.disabled = true;
  setTimeout(function () {
    wallpaper.disabled = false;
  }, 1000);
}
const wallpaper = document.querySelector('.wallpaper');
wallpaper.addEventListener('click', getImage);

setBgImg();

// base = [];

// const images = [
//   '01.jpg',
//   '02.jpg',
//   '03.jpg',
//   '05.jpg',
//   '06.jpg',
//   '07.jpg',
//   '08.jpg',
//   '09.jpg',
//   '10.jpg',
//   '11.jpg',
//   '12.jpg',
//   '13.jpg',
//   '14.jpg',
//   '15.jpg',
//   '16.jpg',
//   '17.jpg',
//   '18.jpg',
//   '19.jpg',
//   '20.jpg',
// ];

// function setBgImg() {
//   let today = new Date(),
//     hour = today.getHours();

//   const random = Math.floor(Math.random() * images.length);
//   if (hour < 6) {
//     // Night
//     let night = `${base[0]}${images[random]}`;
//     greeting.textContent = 'Good Night, ';
//     viewBgImage(night);
//   } else if (hour < 12) {
//     // Morning
//     let morning = `${base[1]}${images[random]}`;
//     viewBgImage(morning);
//     greeting.textContent = 'Good Morning, ';
//   } else if (hour < 18) {
//     // Afternoon
//     let day = `${base[2]}${images[random]}`;
//     viewBgImage(day);
//     greeting.textContent = 'Good Afternoon, ';
//   } else {
//     // Evening
//     let evening = `${base[3]}${images[random]}`;
//     viewBgImage(evening);
//     greeting.textContent = 'Good Evening, ';
//   }
// }

// let i = 0;

// function viewBgImage(data) {
//   const body = document.querySelector('body');
//   const src = data;
//   const img = document.createElement('img');
//   img.src = src;
//   img.onload = () => {
//     body.style.backgroundImage = `url(${src})`;
//   };
// }
// function getImage() {
//   const index = i % images.length;
//   let imageSrc = base + images[index];
//   viewBgImage(imageSrc);
//   i++;
//   wallpaper.disabled = true;
//   setTimeout(function () {
//     wallpaper.disabled = false;
//   }, 1000);
// }
// const wallpaper = document.querySelector('.wallpaper');
// wallpaper.addEventListener('click', getImage);

// setBgImg();

// let imgData = [];
// async function createImgData() {
//   const url = 'assets/images/';
//   //let imageSrc = '';
//   for (let i = 0; i < 24; i++) {
//     if (i < 6) imgData[i] = base + 'night/' + getRandomImg();
//     else if (i < 12) imgData[i] = base + 'morning/' + getRandomImg();
//     else if (i < 18) imgData[i] = base + 'day/' + getRandomImg();
//     else imgData[i] = base + 'evening/' + getRandomImg();
//   }
// }
// createImgData();
