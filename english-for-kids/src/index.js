import './styles/index.scss';
import categoryData from './js/data/category.data';
import create from './js/utils/create';
import HeaderComponent from './js/components/header.component';
import FooterComponent from './js/components/footer.component';
import CategoryCardComponent from './js/components/categoryCard.component';

const body = document.querySelector('body');
const container = create('div', 'container', '', '');
const mainContainer = create('div', 'main__container', '', container);
const categoryTitle = create('h2', 'category__page-title', 'Categories', '');
container.prepend(categoryTitle);

const header = new HeaderComponent(body, categoryData);
header.createHeader(categoryTitle, mainContainer);

const categoryCard = new CategoryCardComponent(mainContainer, categoryTitle);
create('main', 'main', container, body);

categoryData.forEach((item) => {
  categoryCard.renderCard(item);
});

categoryCard.renderCategoryCard();

const footer = new FooterComponent(body);
footer.createFooter();
