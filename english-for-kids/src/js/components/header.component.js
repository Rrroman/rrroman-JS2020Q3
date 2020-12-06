import create from '../utils/create';
import switcherComponent from './switcher.component';
import BurgerComponent from './burger.component';
import cardsData from '../data/cards.data';
import CategoryCardComponent from './categoryCard.component';

export default class HeaderComponent {
  constructor(parent, categoryData) {
    this.parent = parent;
    this.categoryData = categoryData;
  }

  createHeader(categoryParent, mainContainer) {
    const header = create('header', 'header', '', this.parent);
    const container = create('div', 'container', '', header);
    const headerContainer = create('div', 'header__container', '', container);

    const nav = create('nav', 'nav', '', headerContainer);
    const navList = create('ul', 'nav__list', '', nav);

    const fragment = new DocumentFragment();
    const navButtonArray = [];

    function initCategoryName(categoryName, parent) {
      const tempParentName = parent;
      tempParentName.innerText = categoryName;
    }

    function initWordCardComponents(categoryName, parent) {
      const tempParent = parent;
      tempParent.innerHTML = '';

      const card = new CategoryCardComponent(parent);
      const categoryIdx = cardsData[0].indexOf(categoryName);

      cardsData[categoryIdx + 1].forEach((el) => {
        card.renderCard(el);
      });
    }

    function addActiveStatus() {
      navButtonArray.forEach((element) => {
        element.classList.remove('nav__button_active');
      });
      this.classList.toggle('nav__button_active');
      const categoryName = this.innerText;

      initCategoryName(this.innerText, categoryParent);
      initWordCardComponents(categoryName, mainContainer);
    }

    this.categoryData.forEach((element) => {
      const navItem = create('li', 'nav__item', '', fragment);
      const navButton = create('a', 'nav__button', element.word, navItem);

      navButtonArray.push(navButton);
      navButton.addEventListener('click', addActiveStatus);
    });

    navList.appendChild(fragment);

    const burger = new BurgerComponent(headerContainer, nav);
    burger.createBurger();

    create('h1', 'title header__title', 'English for kids', headerContainer);
    switcherComponent.createSwitcher(headerContainer);
  }
}
