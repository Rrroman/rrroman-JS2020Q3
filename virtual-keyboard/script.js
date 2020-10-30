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
    volume: true,
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
      // let pos = null;
      element.addEventListener('focus', () => {
        this.openKeyBoard(element.value, (currentValue) => {
          element.value = currentValue;
        });
      });

      // Find cursor position in textarea
      // element.addEventListener('keyup', () => {
      //   this.openKeyBoard(element.value, (currentValue) => {
      //     element.value = currentValue;

      //     setTimeout(function () {
      //       element.focus();
      //       console.log(element.selectionEnd);
      //     }, 0);
      //   });
      // });

      //Focus on textarea
      element.addEventListener('blur', function (e) {
        setTimeout(function () {
          element.focus();
          // console.log(element.selectionStart);
          e.preventDefault();
          // console.log('Caret at: ', e.target.selectionStart);
        }, 0);
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const audio11 = document.querySelector('[data-sound="11"]');
    const audio12 = document.querySelector('[data-sound="12"]');
    const audio13 = document.querySelector('[data-sound="13"]');
    const audio17 = document.querySelector('[data-sound="17"]');
    const audio22 = document.querySelector('[data-sound="22"]');
    const audio27 = document.querySelector('[data-sound="27"]');
    const audio28 = document.querySelector('[data-sound="28"]');
    const audio30 = document.querySelector('[data-sound="30"]');

    //prettier-ignore
    const keyLayout = [
      ["1", "!"], ["2", "@"], ["3", "#"], ["4","$"], ["5", "%"], ["6", "^"], ["8","&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",["[", "{"],["]", "}"],
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
      "done","space","sound"
    ];

    // Creates HTML tag for an icon in key
    const createIconHTML = (iconName) => {
      return `<span class="material-icons">${iconName}</span>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      let checkForKeysWithLineBreak;
      if (Array.isArray(key)) {
        checkForKeysWithLineBreak =
          ['backspace', ']', 'enter', '?'].indexOf(key[0]) != -1;
      } else {
        checkForKeysWithLineBreak =
          ['backspace', 'enter', '?'].indexOf(key) != -1;
      }

      // Add classes/attributes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'sound':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('volume_up');

          keyElement.addEventListener('click', () => {
            this._toggleVolume(keyElement, createIconHTML);
            audio27.currentTime = 0;
            audio27.play();
          });
          break;

        case 'backspace':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue = this.currentStates.screenValue.substring(
              0,
              this.currentStates.screenValue.length - 1
            );

            this._triggerEvent('oninput');

            if (this.currentStates.volume) audio11.play();
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
            if (this.currentStates.volume) {
              audio13.currentTime = 0;
              audio13.play();
            }
          });
          break;

        case 'shift':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock('shift');
            keyElement.classList.toggle(
              'keyboard__key--active',
              this.currentStates.capsLockState
            );
            if (this.currentStates.volume) {
              audio17.currentTime = 0;
              audio17.play();
            }
          });

          keyElement.innerHTML = 'Shift' + createIconHTML('');
          break;

        case 'enter':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.innerHTML = createIconHTML('keyboard_return');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue += '\n';
            this._triggerEvent('oninput');
            if (this.currentStates.volume) {
              audio12.currentTime = 0;
              audio12.play();
            }
          });
          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue += ' ';
            this._triggerEvent('oninput');
            if (this.currentStates.volume) {
              audio28.currentTime = 0;
              audio28.play();
            }
          });
          break;

        case 'done':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--dark'
          );
          keyElement.innerHTML = createIconHTML('keyboard_hide');

          keyElement.addEventListener('click', () => {
            this.closeKeyBoard();
            this._triggerEvent('onclose');
            if (this.currentStates.volume) {
              audio30.currentTime = 0;
              audio30.play();
            }
          });
          break;

        default:
          keyElement.textContent = key[0].toLowerCase();

          keyElement.addEventListener('click', () => {
            if (Array.isArray(key) && this.currentStates.capsLockState) {
              this.currentStates.screenValue += this.currentStates.capsLockState
                ? key[1].toUpperCase()
                : key[1].toLowerCase();
              this._triggerEvent('oninput');
            } else {
              this.currentStates.screenValue += this.currentStates.capsLockState
                ? key[0].toUpperCase()
                : key[0].toLowerCase();
              this._triggerEvent('oninput');
            }
            if (this.currentStates.volume) {
              audio22.currentTime = 0;
              audio22.play();
            }
          });

          break;
      }

      fragment.appendChild(keyElement);

      if (checkForKeysWithLineBreak) {
        console.log(checkForKeysWithLineBreak);
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

  _toggleCapsLock(shift) {
    this.currentStates.capsLockState = !this.currentStates.capsLockState;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (shift === 'shift') {
          if (this.currentStates.capsLockState) {
            switch (key.textContent) {
              case '1':
                key.textContent = '!';
                break;
              case '2':
                key.textContent = '@';
                break;
              case '3':
                key.textContent = '$';
                break;
              case '4':
                key.textContent = '%';
                break;
              case '5':
                key.textContent = '^';
                break;
              case '6':
                key.textContent = '&';
                break;
              case '7':
                key.textContent = '*';
                break;
              case '8':
                key.textContent = '*';
                break;
              case '9':
                key.textContent = '(';
                break;
              case '0':
                key.textContent = ')';
                break;
              case '-':
                key.textContent = '_';
                break;
              case '=':
                key.textContent = '+';
                break;
              case '[':
                key.textContent = '{';
                break;
              case ']':
                key.textContent = '}';
                break;

              default:
                break;
            }
          } else {
            switch (key.textContent) {
              case '!':
                key.textContent = '1';
                break;
              case '@':
                key.textContent = '2';
                break;
              case '$':
                key.textContent = '3';
                break;
              case '%':
                key.textContent = '4';
                break;
              case '^':
                key.textContent = '5';
                break;
              case '&':
                key.textContent = '6';
                break;
              case '*':
                key.textContent = '7';
                break;
              case '*':
                key.textContent = '8';
                break;
              case '(':
                key.textContent = '9';
                break;
              case ')':
                key.textContent = '0';
                break;
              case '_':
                key.textContent = '-';
                break;
              case '+':
                key.textContent = '=';
                break;
              case '{':
                key.textContent = '[';
                break;
              case '}':
                key.textContent = ']';
                break;

              default:
                break;
            }
          }
        }

        key.textContent = this.currentStates.capsLockState
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },

  _toggleVolume(keyElement, createIconHTML) {
    this.currentStates.volume = !this.currentStates.volume;

    keyElement.innerHTML = this.currentStates.volume
      ? createIconHTML('volume_up')
      : createIconHTML('volume_off');
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
