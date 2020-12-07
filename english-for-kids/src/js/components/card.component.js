import create from '../utils/create';

export default class CardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  renderCard({ word, translation, image, audioSrc }) {
    this.card = create('div', 'card', '', this.parent, ['word', word]);
    this.cardImage = create('img', 'card__image', '', this.card, [
      'src',
      image,
    ]);
    this.cardText = create('span', 'card__text', word, this.card);
  }
}
