import './styles/index.scss';
// import cardsData from './js/data/cards.data';
import categoryData from './js/data/category.data';
import create from './js/utils/create';
import HeaderComponent from './js/components/header.component';
// import CardComponent from './js/components/card.component';
import FooterComponent from './js/components/footer.component';
import CategoryComponent from './js/components/category.component';

const body = document.querySelector('body');

const header = new HeaderComponent(body);
header.createHeader();
const container = create('div', 'container', '', '');
const wrapper = create('div', 'main__container', '', container);
// const card = new CardComponent(wrapper);
const category = new CategoryComponent(wrapper);
create('main', 'main', container, body);

// const firstCategory = cardsData[0];

// firstCategory.forEach((item) => {
//   card.createCard(item);
// });
categoryData.forEach((item) => {
  category.createCard(item);
});

const footer = new FooterComponent(body);
footer.createFooter();
