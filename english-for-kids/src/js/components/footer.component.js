import create from '../utils/create';

export default class FooterComponent {
  constructor(parent) {
    this.parent = parent;
  }

  createFooter() {
    const footer = create('footer', 'footer', '', this.parent);
    const container = create('div', 'container', '', footer);
    const footerContainer = create('div', 'footer__container', '', container);
    const footerLink = create(
      'a',
      'footer__link',
      '',
      footerContainer,
      ['href', 'https://rs.school/js/'],
      ['target', '_blank']
    );
    const logo = create(
      'img',
      'footer__logo',
      '',
      footerLink,
      ['src', './assets/rs_school_js.svg'],
      ['width', '300px'],
      ['height', '100px']
    );
    const title = create(
      'h2',
      'footer__title',
      'English for kids',
      footerContainer
    );
  }
}
