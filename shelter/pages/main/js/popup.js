const popupLinks = document.querySelectorAll('.slider__btn');
const body = document.querySelector('body');
const lockMargin = document.querySelectorAll('.lock-margin');
const hideElem = document.querySelectorAll('.hide-elem');
let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let i = 0; i < popupLinks.length; i++) {
    const popupLink = popupLinks[i];
    popupLink.addEventListener('click', (e) => {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const currentPopup = document.getElementById(popupName);
      popupOpen(currentPopup);
      e.preventDefault();
    });
  }
}

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
