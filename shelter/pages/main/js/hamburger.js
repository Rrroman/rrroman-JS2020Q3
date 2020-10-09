const hamburger = document.querySelector('.header__burger');
const navList = document.querySelector('.nav__list');
const notOnly = document.querySelector('.not-only');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('header__burger_active');
  navList.classList.toggle('nav__list_active');
  notOnly.classList.toggle('not-only_active');
});
