const footer = document.querySelector('footer');
const lockMargin = document.querySelectorAll('.lock-margin');
const hideElem = document.querySelectorAll('.hide-elem');
const sliderInner = document.querySelector('.slider__inner');
const slider = document.querySelector('.slider');
const URL = './js/pets.json';

let unlock = true;
const timeout = 800;

let dataArr = [];

const getData = async function (URL) {
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`URL Error - ${URL}, status ${response.status}!`);
  }
  return await response.json();
};

getData(URL).then(function (data) {
  shuffle(data);
  renderCards(data);
});

function findAmountCardsToRender(tempArr, data) {
  let arrToRender;
  arrToRender = tempArr.splice(0, 3);
  if (tempArr.length < 3) {
    tempArr = data;
  }
  renderCards(arrToRender);
}

function renderCards(arrToRender) {
  arrToRender.forEach((element, i) => {
    createPetCard(element);
    createPopup(element);
    popupClosingOnButton();
  });
}

function createPetCard({
  name,
  img,
  type,
  breed,
  description,
  age,
  inoculations,
  diseases,
  parasites,
}) {
  const card = `
    <li class="slider__item"  data-name="${name}">
      <img class="slider__img"
        src="${img}"
        alt="${type} ${name}">
      <p class="slider__description">${name}</p>
      <button class="slider__btn">Learn more</button>
    </li>
  `;
  insertCard('beforeend', card);
}

function insertCard(selector, card) {
  sliderInner.insertAdjacentHTML(selector, card);
}

function createPopup({
  name,
  img,
  type,
  breed,
  description,
  age,
  inoculations,
  diseases,
  parasites,
}) {
  const cardPopup = `
    <div class="popup" data-popup-name="${name}">
      <div class="popup__body">
        <div class="popup__content">
          <a href="#close" class="popup__close close-popup"></a>
          <img src="${img}" alt="${type} - ${breed}"
            class="popup__img">
          <div class="popup__item">
            <h2 class="popup__title title">${name}</h2>
            <h3 class="popup__dog-breed">${type} - ${breed}</h3>
            <p class="popup__text">${description}
            </p>
            <ul class="popup__list list">
              <li class="list__item"><span class="vaccines">Age:</span> ${age}
              </li>
              <li class="list__item"><span class="vaccines">Inoculations:
                </span>${inoculations}</li>
              <li class="list__item"><span class="vaccines">Diseases:</span> ${diseases}
              </li>
              <li class="list__item"><span class="vaccines">Parasites:</span> ${parasites}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  footer.insertAdjacentHTML('beforebegin', cardPopup);
}

slider.addEventListener('click', openPopup);

function openPopup(event) {
  const target = event.target;
  const card = target.closest('.slider__item');
  const sliderArrowRight = target.closest('.slider__arrow_right');
  const sliderArrowLeft = target.closest('.slider__arrow_left');

  //open popup update logic
  if (card) {
    card.addEventListener('click', (e) => {
      console.log(card.dataset.name);
      const currentPopup = document.querySelectorAll(
        `[data-popup-name="${card.dataset.name}"]`
      );
      currentPopup.forEach((popup) => {
        popupOpen(popup);
        e.preventDefault();
      });
    });
  } else if (sliderArrowRight) {
    sliderArrowRight.addEventListener('click', (e) => {});
  }
}

function popupClosingOnButton() {
  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let i = 0; i < popupCloseIcon.length; i++) {
      const el = popupCloseIcon[i];
      el.addEventListener('click', (e) => {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }
}

function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
      hideElem.forEach((element) => {
        hideElement(element);
      });
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', (e) => {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      bodyUnLock();
      hideElem.forEach((element) => {
        showElement(element);
      });
    }
  }
}

//function for fixed elements with class ".lock-padding" to prevent movement of fixed blocks.
function bodyLock() {
  const lockShiftValue = window.innerWidth - body.offsetWidth + 'px';
  if (lockMargin.length > 0) {
    lockMargin.forEach((el) => {
      el.style.marginRight = lockShiftValue;
    });
  }

  body.style.marginRight = lockShiftValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    if (lockMargin.length > 0) {
      lockMargin.forEach((el) => {
        el.style.marginRight = null;
      });
    }
    body.style.marginRight = null;
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function hideElement(el) {
  el.style.opacity = 0;
  el.style.transition = 'none';
}

function showElement(el) {
  el.style.opacity = 1;
  setTimeout(() => {
    el.style.transition = 'all 0.8s ease 0s';
  }, timeout + 50);
}

document.addEventListener('keydown', (e) => {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
