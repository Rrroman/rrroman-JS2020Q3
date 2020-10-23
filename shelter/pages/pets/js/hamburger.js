const hamburger = document.querySelector('.header__burger');
const navList = document.querySelector('.nav__list');
const logo = document.querySelector('.logo');
const logoTitle = document.querySelector('.logo__title');
const logoSubtitle = document.querySelector('.logo__subtitle');
const navLinkActive = document.querySelector('.nav__link_active');
const container320 = document.querySelector('.container_320');
const friendsOverlay = document.querySelector('.friends__overlay');
const body = document.querySelector('body');

let elementsArr = [navLinkActive, hamburger, friendsOverlay];

elementsArr.forEach((element) => {
  element.addEventListener('click', () => {
    hamburger.classList.toggle('header__burger_active');
    navList.classList.toggle('nav__list_active');
    logo.classList.toggle('logo_active');
    logoTitle.classList.toggle('logo__title_active');
    logoSubtitle.classList.toggle('logo__subtitle_active');
    container320.classList.toggle('container_320_active');
    friendsOverlay.classList.toggle('friends__overlay_active');
    body.classList.toggle('lock');
  });
});
