import create from '../utils/create';

export default class CardComponent {
  constructor(parent) {
    this.parent = parent;
  }

  renderCard({ word, translation, image, audioSrc }) {
    this.cardImage = create('img', 'card__image', '', '', ['src', image]);
    this.cardText = create('span', 'card__text', word);
    this.card = create(
      'div',
      'card',
      [this.cardImage, this.cardText],
      this.parent,
      ['word', word]
    );
  }
}
