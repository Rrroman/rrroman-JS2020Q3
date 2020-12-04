import './styles/index.scss';
import categoryData from './js/data/category.data';
import create from './js/utils/create';
import HeaderComponent from './js/components/header.component';
import FooterComponent from './js/components/footer.component';
import CategoryComponent from './js/components/category.component';

const body = document.querySelector('body');
const container = create('div', 'container', '', '');
const mainContainer = create('div', 'main__container', '', container);
const categoryTitle = create('h2', 'category__page-title', 'Categories', '');
container.prepend(categoryTitle);

const header = new HeaderComponent(body, categoryData);
header.createHeader(categoryTitle, mainContainer);

const category = new CategoryComponent(mainContainer, categoryTitle);
create('main', 'main', container, body);

categoryData.forEach((item) => {
  category.createCard(item);
});

category.renderCategory();

const footer = new FooterComponent(body);
footer.createFooter();
