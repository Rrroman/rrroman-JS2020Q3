import create from '../utils/create';
import CardComponent from './card.component';

export default class CategoryCardComponent extends CardComponent {
  constructor(parent) {
    super(parent);
    this.parent = parent;
  }
}
