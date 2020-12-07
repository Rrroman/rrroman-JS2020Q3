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

const playVoice = (e) => {
  const voiceAudio = e.target.closest('.card').querySelector('audio');
  const cardButton = e.target.closest('.card').querySelector('.card__flip-btn');

  if (e.target !== cardButton) {
    voiceAudio.currentTime = 0;
    voiceAudio.play();
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

    this.cardBottom = create('div', 'card__bottom', '', this.card);

    if (flipSide === 'flipFront') {
      this.cardText = create('h3', 'card__text', word, this.cardBottom);
      this.flipSide.addEventListener('click', playVoice);
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

      this.wordAudio = create(
        'audio',
        '',
        '',
        this.card,
        ['src', audioSrc],
        ['voice', word]
      );
    }
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
      'flipBack',
      'back',
      word,
      translation,
      image,
      audioSrc
    );
  }
}
