import WordCardComponent from './wordCard.component';
import CardComponent from './card.component';
import cardsData from '../data/cards.data';

export default class CategoryCardComponent extends CardComponent {
  constructor(parent, categoryTitle) {
    super(parent);
    this.parent = parent;
    this.categoryTitle = categoryTitle;
  }

  renderCategoryCard() {
    const initCategoryCards = (e) => {
      const categoryName = e.target.closest('.card');

      this.categoryTitle.innerText = categoryName.innerText;
      const tempParent = e.target.closest('.main__container');
      tempParent.innerHTML = '';

      const wordCard = new WordCardComponent(tempParent);
      const categoryIdx = cardsData[0].indexOf(categoryName.innerText);

      cardsData[categoryIdx + 1].forEach((el) => {
        wordCard.renderWordCard(el);
      });

      tempParent.removeEventListener('click', initCategoryCards);
    };

    const flipCardToBack = (e) => {
      const flipContainer = e.target.closest('.flip-container');
      if (flipContainer) {
        flipContainer.classList.add('flip');
      }
    };

    const flipCardToFace = (e) => {
      const flipContainer = e.target.closest('.flip-container');
      if (flipContainer) {
        flipContainer.classList.remove('flip');
      }
    };

    this.parent.addEventListener('click', initCategoryCards);
    this.parent.addEventListener('click', flipCardToBack);
    this.parent.addEventListener('mouseout', flipCardToFace);
  }
}
