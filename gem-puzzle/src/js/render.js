import generateSolvableOrder from './generate-solvable-order';
import create from './create';

const body = document.querySelector('body');

const app = create('div', 'app', '', body);
const game = create('div', 'game', '', app);
const container = create('div', 'container', '', app);
const bottom = create('div', 'bottom', '', container);
const playBtn = create('button', 'bottom__play-btn', 'Play', bottom);
const moveInfo = create('div', 'bottom__game-info move', 'Move: 0', bottom);
const time = create('div', 'bottom__game-info time', 'Time: 100', bottom);
const message = create('h1', 'bottom__message', '', container);
let counter = 0;

export default function render() {
  const cellSize = 100;
  const generatedList = generateSolvableOrder();

  const empty = {
    value: 0,
    top: 3,
    left: 3,
  };
  const cells = [];

  function move(index) {
    const cell = cells[index];
    const leftDifference = Math.abs(empty.left - cell.left);
    const topDifference = Math.abs(empty.top - cell.top);

    if (leftDifference + topDifference > 1) {
      return;
    }

    cell.element.style.left = `${empty.left * cellSize}px`;
    cell.element.style.top = `${empty.top * cellSize}px`;

    const emptyLeft = empty.left;
    const emptyTop = empty.top;
    empty.left = cell.left;
    empty.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;

    const isFinished = cells.every((item) => {
      return item.value === item.top * 4 + item.left + 1;
    });

    if (isFinished) {
      message.textContent = 'You win!';
    } else {
      message.textContent = '';
    }

    counter += 1;
    moveInfo.textContent = `Move: ${counter}`;
  }

  for (let i = 0; i < generatedList.length; i += 1) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.innerHTML = generatedList[i];
    const value = generatedList[i];
    game.appendChild(cell);

    const left = i % 4;
    const top = (i - left) / 4;

    cells.push({
      value,
      top,
      left,
      element: cell,
      empty,
    });

    cell.style.left = `${left * cellSize}px`;
    cell.style.top = `${top * cellSize}px`;

    cell.addEventListener('click', () => {
      move(i);
    });
  }
}

playBtn.addEventListener('click', () => {
  game.innerHTML = '';
  moveInfo.textContent = `Move: 0`;
  render();
});
