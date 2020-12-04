import CardComponent from './card.component';
import cardsData from '../data/cards.data';

export default class Category extends CardComponent {
  constructor(parent, categoryTitle) {
    super(parent);
    this.parent = parent;
    this.categoryTitle = categoryTitle;
  }

  renderCategory() {
    const initCategoryCards = (e) => {
      const categoryName = e.target.closest('.card');

      this.categoryTitle.innerText = categoryName.innerText;
      const tempParent = e.target.closest('.main__container');
      tempParent.innerHTML = '';

      const card = new CardComponent(tempParent);
      const categoryIdx = cardsData[0].indexOf(categoryName.innerText);

      cardsData[categoryIdx + 1].forEach((el) => {
        card.createCard(el);
      });

      tempParent.removeEventListener('click', initCategoryCards);
    };

    console.log(this.parent);
    this.parent.addEventListener('click', initCategoryCards);
  }
}
