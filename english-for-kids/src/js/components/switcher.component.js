import create from '../utils/create';

const switcherComponent = {
  createSwitcher(parent) {
    const switchBody = create('div', 'switch', '', parent);
    create('input', 'checkbox', '', switchBody, ['type', 'checkbox']);
    const label = create('label', '', '', switchBody);
    create('i', '', '', label);
    create('span', 'checkbox__right checkbox__body', 'Train', switchBody);
    create('span', 'checkbox__left checkbox__body', 'Play', switchBody);
  },
};

export default switcherComponent;
