import generateSolvableOrder from './generate-solvable-order';
import create from './create';

const body = document.querySelector('body');
const app = create('div', 'app', '', body);
const game = create('div', 'game', '', app);
const container = create('div', 'container', '', app);
const bottom = create('div', 'bottom', '', container);
const playBtn = create('button', 'bottom__play-btn', 'Play', bottom);
const moveInfo = create('div', 'bottom__game-info move', 'Move: 0', bottom);
const timeInfo = create('div', 'bottom__game-info time', 'Time: 0', bottom);
const message = create('h1', 'bottom__message', '', container);
let moveCounter = 0;
let timeCounter;
let isFinished = false;
let restart = false;

function countDown(i) {
  timeCounter = i;
  const int = setInterval(() => {
    timeInfo.textContent = `Time: ${timeCounter}`;
    timeCounter += 1;
    if (isFinished) {
      clearInterval(int);
    }
    if (restart) {
      clearInterval(int);
    }
  }, 1000);
}

export default function render() {
  const cellSize = 75;
  // const generatedList = [...Array(15).keys()].map((x) => x + 1);
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

    isFinished = cells.every((item) => {
      return item.value === item.top * 4 + item.left + 1;
    });

    if (isFinished) {
      message.textContent = 'You win!';
      isFinished = true;
      restart = true;
    } else {
      message.textContent = '';
    }

    moveCounter += 1;
    moveInfo.textContent = `Move: ${moveCounter}`;
    isFinished = false;
    if (moveCounter < 2) {
      countDown(0);
      restart = false;
    }
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

// Play button
playBtn.addEventListener('click', () => {
  game.innerHTML = '';
  moveInfo.textContent = `Move: 0`;
  timeInfo.textContent = `Time: 0`;
  restart = true;
  moveCounter = 0;
  timeCounter = 0;
  render();
});