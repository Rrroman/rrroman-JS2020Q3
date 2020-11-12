function popupClose(overlay) {
  overlay.classList.remove('open');
}

function popupOpen(currentPopup) {
  if (currentPopup) {
    currentPopup.classList.add('open');

    currentPopup.addEventListener('click', (e) => {
      const isPopupContent = e.target.closest('.popup__content');
      if (!isPopupContent) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

export default popupOpen;
