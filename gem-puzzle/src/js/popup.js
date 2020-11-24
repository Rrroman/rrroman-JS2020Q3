function popupClose(overlay) {
  overlay.classList.remove('open');
}

function checkToClose(e) {
  const isPopupContent = e.target.closest('.popup__content');
  const currentPopup = e.target.closest('.popup');

  if (!isPopupContent) {
    popupClose(e.target.closest('.popup'));
    currentPopup.removeEventListener('click', checkToClose, false);
  }
}

function popupOpen(currentPopup) {
  if (currentPopup) {
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', checkToClose);
  }
}

export default popupOpen;
