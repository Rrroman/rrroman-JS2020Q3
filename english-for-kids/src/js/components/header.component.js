import create from '../utils/create';
import switcherComponent from './switcher.component';

export default class HeaderComponent {
  constructor(parent, switcher) {
    this.parent = parent;
    this.switcher = switcher;
  }

  createHeader() {
    const header = create('header', 'header', '', this.parent);
    const container = create('div', 'container', '', header);
    const headerContainer = create('div', 'header__container', '', container);
    const hamburger = create('div', 'header__burger', 'X', headerContainer);
    const nav = create('nav', 'nav', '', headerContainer);
    const navList = create('ul', 'nav__list', '', nav);

    const title = create(
      'h1',
      'title header__title',
      'English for kids',
      headerContainer
    );

    // const headerSwitchBtn = create('input', 'header__switch-btn', '', header, [
    //   'type',
    //   'checkbox',
    // ]);
    const switcher = switcherComponent.createSwitcher(headerContainer);
  }
}
