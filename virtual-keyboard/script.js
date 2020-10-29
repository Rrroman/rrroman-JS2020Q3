const Keyboard = {
  elements: {
    keyboardContainer: null,
    keysContainer: null,
    keys: [],
  },

  eventHandlers: {
    onclose: null,
    oninput: null,
  },

  currentStates: {
    screenValue: '',
    capsLockState: false,
  },

  init() {
    // Create container elements
    this.elements.keyboardContainer = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    // Setup values for container elements
    this.elements.keyboardContainer.classList.add(
      'keyboard',
      'keyboard--hidden'
    );
    this.elements.keysContainer.classList.add('keyboard__keys');
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      '.keyboard__key'
    );

    // Add to Dom elements
    this.elements.keyboardContainer.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.keyboardContainer);

    // Automatically use keyboard for elements with .use-keyboard-input
    document.querySelectorAll('.use-keyboard-input').forEach((element) => {
      element.addEventListener('focus', () => {
        this.openKeyBoard(element.value, (currentValue) => {
          console.log(element);
          element.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    //prettier-ignore
    const keyLayout = [
      "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "space"
    ];

    // Creates HTML tag for an icon in key
    const createIconHTML = (iconName) => {
      return `<span class="material-icons">${iconName}</span>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      const checkForKeysWithLineBreak =
        ['backspace', 'p', 'enter', '?'].indexOf(key) !== -1;

      // Add classes/attributes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue = this.currentStates.screenValue.substring(
              0,
              this.currentStates.screenValue.length - 1
            );

            this._triggerEvent('oninput');
          });
          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.currentStates.capsLockState
            );
          });
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue += '\n';
            this._triggerEvent('oninput');
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue += ' ';
            this._triggerEvent('oninput');
          });
          break;

        case 'done':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--dark'
          );
          keyElement.innerHTML = createIconHTML('check_circle');

          keyElement.addEventListener('click', () => {
            this.closeKeyBoard();
            this._triggerEvent('onclose');
          });
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue += this.currentStates.capsLockState
              ? key.toUpperCase()
              : key.toLowerCase();
            this._triggerEvent('oninput');
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (checkForKeysWithLineBreak) {
        fragment.appendChild(document.createElement('br'));
      }
    });

    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.currentStates.screenValue);
    }
  },

  _toggleCapsLock() {
    this.currentStates.capsLockState = !this.currentStates.capsLockState;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.currentStates.capsLockState
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  openKeyBoard(keyboardStartValue, oninput, onclose) {
    this.currentStates.screenValue = keyboardStartValue || '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.keyboardContainer.classList.remove('keyboard--hidden');
  },
  closeKeyBoard() {
    this.currentStates.screenValue = '';
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.keyboardContainer.classList.add('keyboard--hidden');
  },
};

window.addEventListener('DOMContentLoaded', function () {
  Keyboard.init();
});
