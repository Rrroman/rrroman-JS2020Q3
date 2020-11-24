import generateSolvableOrder from './generate-solvable-order';
import create from './create';
import popupOpen from './popup';

const PLAY_ICON = 'play_circle_outline';
const PAUSE_ICON = 'pause_circle_outline';
const VOLUME_UP_ICON = 'volume_up';
const VOLUME_OFF_ICON = 'volume_off';
const START_TIME = '00';

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
let seconds = START_TIME;
let minutes = START_TIME;
let timeCounter = 0;
let isFinished = false;
let isRestart = false;
let isVolume = true;

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
  return leftDifference + topDifference === 1;
}

export default function render() {
  const CELL_SIZE = 75;
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

    if (!isSibling(leftDifference, topDifference)) {
      return;
    }

    cell.element.style.left = `${empty.left * CELL_SIZE}px`;
    cell.element.style.top = `${empty.top * CELL_SIZE}px`;

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

    cell.style.left = `${left * CELL_SIZE}px`;
    cell.style.top = `${top * CELL_SIZE}px`;

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
  seconds = START_TIME;
  minutes = START_TIME;
  render();
});
