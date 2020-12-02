import create from '../utils/create';
import Card from './card.component';

export default class Category extends Card {
  constructor(parent) {
    super(parent);
  }

  initCategoryName(categoryName, categoryParent) {
    create('div', 'category-name', categoryName, categoryParent);
  }
}
