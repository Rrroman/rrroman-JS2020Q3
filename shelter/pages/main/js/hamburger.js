const hamburger = document.querySelector('.header__burger');
const navList = document.querySelector('.nav__list');
const notOnly = document.querySelector('.not-only');
const logo = document.querySelector('.logo');
const notOnlyDarker = document.querySelector('.not-only__darker');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('header__burger_active');
  navList.classList.toggle('nav__list_active');
  notOnly.classList.toggle('not-only_active');
  logo.classList.toggle('logo_active');
  notOnlyDarker.classList.toggle('not-only__darker_active');
});
