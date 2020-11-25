import generateSolvableOrder, { cellsList } from './generate-solvable-order';
import create from './create';
import popupOpen from './popup';

const PLAY_ICON = 'play_circle_outline';
const PAUSE_ICON = 'pause_circle_outline';
const VOLUME_UP_ICON = 'volume_up';
const VOLUME_OFF_ICON = 'volume_off';
const TIME_STARTING_VALUE = '00';
const SIBLING_RANGE = 1;
const MOVE_STARTING_VALUE = `Moves: 0`;
const TIME_TEMPLATE_VALUE = `Time: 00:00`;
const SIZE_OF_GAME_FIELD = 4;
const CELL_SIZE = 75;

const body = document.querySelector('body');
const app = create('div', 'app', '', body);
const controls = create('div', 'controls', '', app);
const pauseBtn = create(
  'button',
  'controls__pause material-icons',
  PAUSE_ICON,
  controls
);
const playBtn = create('button', 'controls__play-btn', 'New Game', controls);
const volumeBtn = create(
  'button',
  'controls__volume material-icons',
  VOLUME_UP_ICON,
  controls
);
const game = create('div', 'game', '', app);
const container = create('div', 'container', '', app);
const bottom = create('div', 'bottom', '', container);
const moveInfo = create(
  'div',
  'bottom__game-info move',
  MOVE_STARTING_VALUE,
  bottom
);
const timeInfo = create(
  'div',
  'bottom__game-info time',
  TIME_TEMPLATE_VALUE,
  bottom
);
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
let seconds = TIME_STARTING_VALUE;
let minutes = TIME_STARTING_VALUE;
let timeCounter = 0;
let isFinished = false;
let isRestart = false;
let isVolume = true;
let fragment = new DocumentFragment();

function stopTimer(int) {
  clearInterval(int);
}

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

    if (isFinished || isRestart) {
      stopTimer(int);
    }

    timeCounter += 1;
  }, 1000);
}

function togglePause() {
  isRestart = !isRestart;

  pauseBtn.innerHTML = isRestart ? PLAY_ICON : PAUSE_ICON;
  countDown(timeCounter);
}

pauseBtn.addEventListener('click', togglePause);

function toggleVolume() {
  // switch volume flag to false and switch icon
  isVolume = !isVolume;
  volumeBtn.innerHTML = isVolume ? VOLUME_UP_ICON : VOLUME_OFF_ICON;
}

volumeBtn.addEventListener('click', toggleVolume);

function isSibling(leftDifference, topDifference) {
  return leftDifference + topDifference === SIBLING_RANGE;
}

export default function render() {
  if (isRestart) {
    generatedList = generateSolvableOrder();
  } else {
    generatedList = cellsList;
  }

  // Empty Cell starting values
  const empty = {
    value: 0,
    topIdx: 3,
    leftIdx: 3,
  };
  const cells = [];

  function move(index) {
    const cell = cells[index];
    const leftDifference = Math.abs(empty.leftIdx - cell.leftIdx);
    const topDifference = Math.abs(empty.topIdx - cell.topIdx);

    if (!isSibling(leftDifference, topDifference)) {
      return;
    }

    cell.element.style.left = `${empty.leftIdx * CELL_SIZE}px`;
    cell.element.style.top = `${empty.topIdx * CELL_SIZE}px`;

    const emptyLeft = empty.leftIdx;
    const emptyTop = empty.topIdx;
    empty.leftIdx = cell.leftIdx;
    empty.topIdx = cell.topIdx;
    cell.leftIdx = emptyLeft;
    cell.topIdx = emptyTop;

    // Checking if every cell is on winning position
    isFinished = cells.every((item) => {
      return item.value === item.topIdx * SIZE_OF_GAME_FIELD + item.leftIdx + 1;
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
    fragment.appendChild(cell);

    const leftIdx = i % SIZE_OF_GAME_FIELD;
    const topIdx = (i - leftIdx) / SIZE_OF_GAME_FIELD;

    cells.push({
      value,
      topIdx,
      leftIdx,
      element: cell,
      empty,
    });

    cell.style.left = `${leftIdx * CELL_SIZE}px`;
    cell.style.top = `${topIdx * CELL_SIZE}px`;

    cell.addEventListener('click', () => {
      move(i);
    });
  }
  game.appendChild(fragment);
}

// Play button
playBtn.addEventListener('click', () => {
  game.innerHTML = '';
  moveInfo.textContent = MOVE_STARTING_VALUE;
  timeInfo.textContent = TIME_TEMPLATE_VALUE;
  popupContent.innerText = '';
  isRestart = true;
  moveCounter = 0;
  timeCounter = 0;
  seconds = TIME_STARTING_VALUE;
  minutes = TIME_STARTING_VALUE;
  render();
});
