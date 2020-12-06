import './styles/index.scss';
import categoryData from './js/data/category.data';
import create from './js/utils/create';
import HeaderComponent from './js/components/header.component';
import FooterComponent from './js/components/footer.component';
import WordCardComponent from './js/components/wordCard.component';

const body = document.querySelector('body');
const container = create('div', 'container', '', '');
const mainContainer = create('div', 'main__container', '', container);
const categoryTitle = create('h2', 'category__page-title', 'Categories', '');
container.prepend(categoryTitle);

const header = new HeaderComponent(body, categoryData);
header.createHeader(categoryTitle, mainContainer);

const wordCard = new WordCardComponent(mainContainer, categoryTitle);
create('main', 'main', container, body);

categoryData.forEach((item) => {
  wordCard.renderCard(item);
});

wordCard.renderWordCard();

const footer = new FooterComponent(body);
footer.createFooter();
