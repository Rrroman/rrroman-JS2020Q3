import generateSolvableOrder from './generate-solvable-order';
import create from './create';
import popupOpen from './popup';

const body = document.querySelector('body');
const app = create('div', 'app', '', body);
const controls = create('div', 'controls', '', app);
const pauseBtn = create(
  'button',
  'controls__pause material-icons',
  'pause_circle_outline',
  controls
);
const playBtn = create('button', 'controls__play-btn', 'New Game', controls);
const volumeBtn = create(
  'button',
  'controls__volume material-icons',
  'volume_up',
  controls
);
const game = create('div', 'game', '', app);
const container = create('div', 'container', '', app);
const bottom = create('div', 'bottom', '', container);
const moveInfo = create('div', 'bottom__game-info move', 'Moves: 0', bottom);
const timeInfo = create('div', 'bottom__game-info time', 'Time: 00:00', bottom);
const popup = create('div', 'popup', '', app);
const popupBody = create('div', 'popup__body', '', popup);
const popupContent = create('div', 'popup__content', '', popupBody);

const sound = create(
  'audio',
  '',
  '',
  app,
  ['src', './assets/sound.mp3'],
  ['sound', '1']
);
let generatedList = [];
let moveCounter = 0;
let seconds = '00';
let minutes = '00';
let timeCounter;
let isFinished = false;
let isRestart = false;
let isVolume = true;

function toggleVolume() {
  // switch volume flag to false and switch icon
  isVolume = !isVolume;
  volumeBtn.innerHTML = isVolume ? 'volume_up' : 'volume_off';
}

volumeBtn.addEventListener('click', toggleVolume);

function countDown(startTime) {
  timeCounter = startTime;
  const int = setInterval(() => {
    if (timeCounter % 60 !== 0) {
      seconds = timeCounter % 60;
      if (seconds < 10) seconds = `0${seconds}`;
    } else {
      minutes = timeCounter / 60;
      if (minutes < 10) {
        minutes = `0${minutes}`;
      } else {
        minutes = `${minutes}`;
      }
    }
    timeInfo.textContent = `Time: ${minutes}:${seconds}`;

    timeCounter += 1;
    if (isFinished) {
      clearInterval(int);
    }
    if (isRestart) {
      clearInterval(int);
    }
  }, 1000);
}

export default function render() {
  const cellSize = 75;
  // // Swap 2 line comments below to test Win case
  if (isRestart) {
    generatedList = generateSolvableOrder();
  } else {
    generatedList = [...Array(15).keys()].map((x) => x + 1);
  }

  // Empty Cell starting values
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

    // Checking if cell is sibling or not
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

    // Checking if every cell is on winning position
    isFinished = cells.every((item) => {
      return item.value === item.top * 4 + item.left + 1;
    });

    if (isFinished) {
      const popupText = `<h2>You win!</h2>
      <p>Your time: ${minutes}:${seconds}</p>
      <p>Total moves: ${moveCounter + 1}</p>
      `;
      popupContent.innerHTML = popupText;
      isFinished = true;
      isRestart = true;
      popupOpen(popup);
    } else {
      popupContent.innerText = '';
    }

    moveCounter += 1;
    moveInfo.textContent = `Moves: ${moveCounter}`;
    isFinished = false;
    if (moveCounter < 2) {
      countDown(0);
      isRestart = false;
    }

    if (isVolume) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  // Add field with cells to HTML
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
  moveInfo.textContent = `Moves: 0`;
  timeInfo.textContent = `Time: 00:00`;
  popupContent.innerText = '';
  isRestart = true;
  moveCounter = 0;
  timeCounter = 0;
  seconds = '00';
  minutes = '00';
  render();
});
