const hamburger = document.querySelector('.header__burger');
const navList = document.querySelector('.nav__list');
const notOnly = document.querySelector('.not-only');
const logo = document.querySelector('.logo');
const notOnlyOverlay = document.querySelector('.not-only__overlay');
const navLinkActive = document.querySelector('.nav__link_active');
const container320 = document.querySelector('.container_320');

let elementsArr = [navLinkActive, notOnlyOverlay, hamburger];

elementsArr.forEach((element) => {
  element.addEventListener('click', () => {
    hamburger.classList.toggle('header__burger_active');
    navList.classList.toggle('nav__list_active');
    notOnly.classList.toggle('not-only_active');
    logo.classList.toggle('logo_active');
    notOnlyOverlay.classList.toggle('not-only__overlay_active');
    container320.classList.toggle('container_320_active');
  });
});
