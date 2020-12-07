import create from '../utils/create';
import CardComponent from './card.component';

const flipCardToBack = (e) => {
  const flipContainer = e.target.closest('.flip__container');
  if (flipContainer) {
    flipContainer.classList.add('flip');
  }
};

const flipCardToFace = (e) => {
  const flipContainer = e.target.closest('.flip__container');
  if (flipContainer) {
    flipContainer.classList.remove('flip');
  }
};

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
    this.card = create('div', 'card card__word', '', this.flipSide, [
      'word',
      word,
    ]);

    this.cardImage = create('img', 'card__image', '', this.card, [
      'src',
      image,
    ]);
    if (flipSide === 'fliBack') {
      this.cardImage.classList.add('back-image');
    }

    this.cardBottom = create('div', 'card__bottom', '', this.card);

    if (flipSide === 'flipFront') {
      this.cardText = create('h3', 'card__text', word, this.cardBottom);
    } else {
      this.cardText = create('h3', 'card__text', translation, this.cardBottom);
      this.flipSide.addEventListener('mouseleave', flipCardToFace);
    }

    if (flipSide === 'flipFront') {
      this.cardFlipButton = create(
        'button',
        'card__flip-btn',
        '',
        this.cardBottom
      );

      this.cardFlipButton.addEventListener('click', flipCardToBack);
    }

    this.wordAudio = create('div', 'audio', '', this.cardBottom, [
      'src',
      audioSrc,
    ]);
  }

  renderWordCard({ word, translation, image, audioSrc }) {
    this.flipContainer = create('div', 'flip__container', '', this.parent);
    this.flipSpeedWrapper = create(
      'div',
      'flip-speed-wrapper',
      '',
      this.flipContainer
    );

    this.renderCardSide(
      this.flipSpeedWrapper,
      'flipFront',
      'front',
      word,
      translation,
      image,
      audioSrc
    );
    this.renderCardSide(
      this.flipSpeedWrapper,
      'fliBack',
      'back',
      word,
      translation,
      image,
      audioSrc
    );
  }
}
