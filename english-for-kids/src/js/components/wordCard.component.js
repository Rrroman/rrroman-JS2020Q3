import create from '../utils/create';
import CardComponent from './card.component';

export default class WordCardComponent extends CardComponent {
  constructor(parent) {
    super(parent);
    this.parent = parent;
  }

  renderCardSide(
    flipContainer,
    flipSide,
    flipSideClassName,
    word,
    translation,
    image,
    audioSrc
  ) {
    this.flipSide = create('div', flipSideClassName, '', flipContainer);
    this.card = create('div', 'card', '', this.flipSide, ['word', word]);
    this.cardImage = create('img', 'card__image', '', this.card, [
      'src',
      image,
    ]);
    this.cardBottom = create('div', 'card__bottom', '', this.card);

    if (flipSide === 'flipFace') {
      this.cardText = create('h3', 'card__text', word, this.cardBottom);
    } else {
      this.cardText = create('h3', 'card__text', translation, this.cardBottom);
    }

    if (flipSide === 'flipFace') {
      this.cardFlipButton = create(
        'button',
        'card__flip-btn',
        '',
        this.cardBottom
      );
    }

    this.wordAudio = create('div', 'audio', '', this.cardBottom, [
      'src',
      audioSrc,
    ]);
  }

  renderWordCard({ word, translation, image, audioSrc }) {
    this.flipContainer = create('div', 'flip-container', '', this.parent);
    this.flipper = create('div', 'flipper', '', this.flipContainer);

    this.renderCardSide(
      this.flipper,
      'flipFace',
      'front',
      word,
      translation,
      image,
      audioSrc
    );
    this.renderCardSide(
      this.flipper,
      'fliBack',
      'back',
      word,
      translation,
      image,
      audioSrc
    );
  }
}
