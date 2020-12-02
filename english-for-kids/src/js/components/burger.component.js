import create from '../utils/create';

export default class BurgerComponent {
  constructor(parent, menu) {
    this.parent = parent;
    this.menu = menu;
  }

  createBurger() {
    const span = create('span', '', '');
    const burger = create('div', 'burger', span, this.parent);

    burger.addEventListener('click', () => {
      burger.classList.toggle('burger_active');

      if (this.menu) {
        this.menu.classList.toggle('nav_active');
      }
    });
  }
}
