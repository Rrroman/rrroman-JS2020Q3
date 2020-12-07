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

      cardsData[categoryIdx + 1].forEach((cardData) => {
        wordCard.renderWordCard(cardData);
      });

      tempParent.removeEventListener('click', initCategoryCards);
    };

    this.parent.addEventListener('click', initCategoryCards);
  }
}
