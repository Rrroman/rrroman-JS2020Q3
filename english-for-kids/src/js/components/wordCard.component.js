import CardComponent from './categoryCard.component';
import cardsData from '../data/cards.data';

export default class WordCardComponent extends CardComponent {
  constructor(parent, categoryTitle) {
    super(parent);
    this.parent = parent;
    this.categoryTitle = categoryTitle;
  }

  renderWordCard() {
    const initWordCards = (e) => {
      const categoryName = e.target.closest('.card');

      this.categoryTitle.innerText = categoryName.innerText;
      const tempParent = e.target.closest('.main__container');
      tempParent.innerHTML = '';

      const card = new CardComponent(tempParent);
      const categoryIdx = cardsData[0].indexOf(categoryName.innerText);

      cardsData[categoryIdx + 1].forEach((el) => {
        card.renderCard(el);
      });

      tempParent.removeEventListener('click', initWordCards);
    };

    this.parent.addEventListener('click', initWordCards);
  }
}
