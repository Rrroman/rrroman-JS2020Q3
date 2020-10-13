const hamburger = document.querySelector('.header__burger');
const navList = document.querySelector('.nav__list');
const friendsContainer = document.querySelector('.friends__container');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('header__burger_active');
  navList.classList.toggle('nav__list_active');
  friendsContainer.classList.toggle('friends__container_320');
});
