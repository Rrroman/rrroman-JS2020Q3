const Keyboard = {
  allTextAreas: document.querySelectorAll('.use-keyboard-input'),
  elements: {
    keyboardContainer: null,
    keysContainer: null,
    keys: [],
    //prettier-ignore
    keyLayoutEn : [
      ["1", "!"], ["2", "@"], ["3", "#"], ["4","$"], ["5", "%"], ["6", "^"], ["7","&"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
      "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",["[", "{"],["]", "}"],
      "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ["'",'"'], "enter",
      "shift", "z", "x", "c", "v", "b", "n", "m", [",", "<"], [".", ">"], "?",
      "ru","done","space","sound","left","right"
    ],
    //prettier-ignore
    keyLayoutRu : [
      ["1", "!"], ["2", "@"], ["3", "№"], ["4",";"], ["5", "%"], ["6", ":"], ["7","?"], ["8", "*"], ["9", "("], ["0", ")"], ["-", "_"], ["=", "+"], "backspace",
      "ё","й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з","х","ъ",
      "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д","ж", "э", "enter",
      "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", [".", ","],
      "en","done","space","sound","left","right"
    ],
  },

  eventHandlers: {
    onclose: null,
    oninput: null,
  },

  currentStates: {
    screenValue: '',
    capsLockState: false,
    volume: true,
    start: null,
    end: null,
    // lastKey: null,
    languageState: false,
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
    this.elements.keysContainer.appendChild(
      this._createKeys(this.elements.keyLayoutEn)
    );

    this.elements.keys = this.elements.keysContainer.querySelectorAll(
      '.keyboard__key'
    );

    // Add to Dom elements
    this.elements.keyboardContainer.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.keyboardContainer);

    // Automatically use keyboard for elements with .use-keyboard-input
    this.allTextAreas.forEach((element) => {
      element.addEventListener('focus', () => {
        this.openKeyBoard(element.value, (currentValue) => {
          element.value = currentValue;
          element.focus();
        });
      });

      // Save position of caret
      element.addEventListener('click', (e) => {
        if (element.selectionStart || element.selectionStart == '0') {
          this.currentStates.start = element.selectionStart;
          this.currentStates.end = element.selectionEnd;
        }
      });

      // Saving keypress from physical keyboard
      element.addEventListener('keypress', (e) => {
        e.preventDefault();
        const audio22 = document.querySelector('[data-sound="22"]');

        // if Pressed regular key
        this.currentStates.screenValue =
          this.currentStates.screenValue.substring(
            0,
            this.currentStates.start
          ) +
          e.key +
          this.currentStates.screenValue.substring(
            this.currentStates.end,
            this.currentStates.screenValue.length
          );

        this._triggerEvent('oninput');
        this._fixCaretPosition();

        if (this.currentStates.volume) {
          audio22.currentTime = 0;
          audio22.play();
        }

        element.focus();
      });

      element.addEventListener('keydown', (e) => {
        // Physical Backspace
        if (e.key === 'Backspace') {
          e.preventDefault();
          this.allTextAreas.forEach((element) => {
            element.focus();

            this.currentStates.screenValue =
              this.currentStates.screenValue.substring(
                0,
                this.currentStates.start - 1
              ) +
              this.currentStates.screenValue.substring(
                this.currentStates.end,
                this.currentStates.screenValue.length
              );

            this._triggerEvent('oninput');
            this._fixCaretPosition('left');

            const audio11 = document.querySelector('[data-sound="11"]');
            if (this.currentStates.volume) {
              audio11.currentTime = 0;
              audio11.play();
            }
          });
        }
        // Physical Caps lock
        if (e.key === 'CapsLock') {
          this._toggleCapsLock();

          const audio13 = document.querySelector('[data-sound="13"]');
          if (this.currentStates.volume) {
            audio13.currentTime = 0;
            audio13.play();
          }
        }

        // Physical Shift
        if (e.key === 'Shift') {
          this._toggleCapsLock('shift');

          const audio17 = document.querySelector('[data-sound="17"]');
          if (this.currentStates.volume) {
            audio17.currentTime = 0;
            audio17.play();
          }
        }

        // Physical arrow Left
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this._fixCaretPosition('left');

          const audio31 = document.querySelector('[data-sound="31"]');
          if (this.currentStates.volume) {
            audio31.currentTime = 0;
            audio31.play();
          }
        }
        // Physical arrow Right
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          this._fixCaretPosition();

          const audio31 = document.querySelector('[data-sound="31"]');
          if (this.currentStates.volume) {
            audio31.currentTime = 0;
            audio31.play();
          }
        }

        // If pressed is Enter
        if (e.key === 'Enter') {
          e.preventDefault();
          this.currentStates.screenValue = this.currentStates.screenValue =
            this.currentStates.screenValue.substring(
              0,
              this.currentStates.start
            ) +
            '\n' +
            this.currentStates.screenValue.substring(
              this.currentStates.end,
              this.currentStates.screenValue.length
            );
          this._triggerEvent('oninput');
          this._fixCaretPosition();

          const audio12 = document.querySelector('[data-sound="12"]');
          if (this.currentStates.volume) {
            audio12.currentTime = 0;
            audio12.play();
          }
        }
      });

      // physical press lights key on keydown
      element.addEventListener('keydown', (e) => {
        const keysList = document.querySelectorAll('.keyboard__key');
        keysList.forEach(function (el) {
          if (el.innerHTML[0].indexOf(`${e.key}`) !== -1) {
            el.classList.add('keyboard__key--pressed');
          }
          if (el.dataset.type === `${e.key}`) {
            el.classList.add('keyboard__key--pressed');
            if (el.dataset.type === `Shift`) {
              el.classList.add('keyboard__key--active');
            } else if (el.dataset.type === `CapsLock`) {
              el.classList.toggle('keyboard__key--active');
            }
          }
        });
      });

      // physical press turn off lights on keyup
      element.addEventListener('keyup', (e) => {
        const keysList = document.querySelectorAll('.keyboard__key');
        keysList.forEach(function (el) {
          if (el.innerHTML[0].indexOf(`${e.key}`) !== -1) {
            el.classList.remove('keyboard__key--pressed');
          }
          if (el.dataset.type === `${e.key}`) {
            el.classList.remove('keyboard__key--pressed');
            if (el.dataset.type === `Shift`) {
              el.classList.remove('keyboard__key--active');
            }
          }
        });
      });
    });
  },

  _createKeys(keyLayout) {
    const fragment = document.createDocumentFragment();
    const audio11 = document.querySelector('[data-sound="11"]');
    const audio12 = document.querySelector('[data-sound="12"]');
    const audio13 = document.querySelector('[data-sound="13"]');
    const audio17 = document.querySelector('[data-sound="17"]');
    const audio22 = document.querySelector('[data-sound="22"]');
    const audio27 = document.querySelector('[data-sound="27"]');
    const audio28 = document.querySelector('[data-sound="28"]');
    const audio30 = document.querySelector('[data-sound="30"]');
    const audio31 = document.querySelector('[data-sound="31"]');

    // Creates HTML tag for an icon in key
    const createIconHTML = (iconName) => {
      return `<span class="material-icons">${iconName}</span>`;
    };

    keyLayout.forEach((key) => {
      const keyElement = document.createElement('button');

      let checkForKeysWithLineBreak;
      if (Array.isArray(key)) {
        if (this.currentStates.languageState) {
          // if it is Ru with Array situation
          checkForKeysWithLineBreak =
            ['backspace', ']', 'enter', '?', '.'].indexOf(key[0]) != -1;
        } else {
          // if it is En with Array situation
          checkForKeysWithLineBreak =
            ['backspace', ']', 'enter', '?'].indexOf(key[0]) != -1;
        }
      } else {
        // if it is Ru
        checkForKeysWithLineBreak =
          ['backspace', 'enter', '?', 'ъ'].indexOf(key) != -1;
      }

      // Add classes/attributes
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');

      switch (key) {
        case 'left':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.setAttribute('data-type', 'ArrowLeft');
          keyElement.innerHTML = createIconHTML('arrow_back');

          keyElement.addEventListener('click', () => {
            this._fixCaretPosition('left');

            if (this.currentStates.volume) {
              audio31.currentTime = 0;
              audio31.play();
            }
          });
          break;

        case 'right':
          keyElement.classList.add('keyboard__key--wide');
          keyElement.setAttribute('data-type', 'ArrowRight');
          keyElement.innerHTML = createIconHTML('arrow_forward');

          keyElement.addEventListener('click', () => {
            this._fixCaretPosition();

            if (this.currentStates.volume) {
              audio31.currentTime = 0;
              audio31.play();
            }
          });
          break;

        case 'ru':
          keyElement.textContent = key.toLowerCase();
          keyElement.addEventListener('click', () => {
            this._toggleLanguage();

            if (this.currentStates.volume) {
              audio13.currentTime = 0;
              audio13.play();
            }
            this.elements.keysContainer.innerHTML = '';
            this.elements.keysContainer.appendChild(
              this._createKeys(this.elements.keyLayoutRu)
            );
            this.elements.keys = this.elements.keysContainer.querySelectorAll(
              '.keyboard__key'
            );
          });
          keyElement.innerHTML = 'ru' + createIconHTML('');
          break;

        case 'en':
          keyElement.addEventListener('click', () => {
            this._toggleLanguage();

            if (this.currentStates.volume) {
              audio13.currentTime = 0;
              audio13.play();
            }

            this.elements.keysContainer.innerHTML = '';
            this.elements.keysContainer.appendChild(
              this._createKeys(this.elements.keyLayoutEn)
            );
            this.elements.keys = this.elements.keysContainer.querySelectorAll(
              '.keyboard__key'
            );
          });
          keyElement.innerHTML = 'en' + createIconHTML('');
          break;

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
          keyElement.setAttribute('data-type', 'Backspace');
          keyElement.innerHTML = createIconHTML('backspace');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue =
              this.currentStates.screenValue.substring(
                0,
                this.currentStates.start - 1
              ) +
              this.currentStates.screenValue.substring(
                this.currentStates.end,
                this.currentStates.screenValue.length
              );

            this._triggerEvent('oninput');
            this._fixCaretPosition('left');

            if (this.currentStates.volume) {
              audio11.currentTime = 0;
              audio11.play();
            }
          });
          break;

        case 'caps':
          keyElement.classList.add(
            'keyboard__key--wide',
            'keyboard__key--activatable'
          );
          keyElement.innerHTML = createIconHTML('keyboard_capslock');
          keyElement.setAttribute('data-type', 'CapsLock');

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
          keyElement.setAttribute('data-type', 'Shift');

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
          keyElement.setAttribute('data-type', 'Enter');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue =
              this.currentStates.screenValue.substring(
                0,
                this.currentStates.start
              ) +
              '\n' +
              this.currentStates.screenValue.substring(
                this.currentStates.end,
                this.currentStates.screenValue.length
              );
            this._triggerEvent('oninput');
            this._fixCaretPosition();

            if (this.currentStates.volume) {
              audio12.currentTime = 0;
              audio12.play();
            }
          });

          break;

        case 'space':
          keyElement.classList.add('keyboard__key--extra-wide');
          keyElement.innerHTML = createIconHTML('space_bar');
          keyElement.setAttribute('data-type', ' ');

          keyElement.addEventListener('click', () => {
            this.currentStates.screenValue =
              this.currentStates.screenValue.substring(
                0,
                this.currentStates.start
              ) +
              ' ' +
              this.currentStates.screenValue.substring(
                this.currentStates.end,
                this.currentStates.screenValue.length
              );
            this._triggerEvent('oninput');

            this._fixCaretPosition();

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

          keyElement.addEventListener('click', (e) => {
            // Check if Shift turned on to change uniq sing.
            if (Array.isArray(key) && this.currentStates.capsLockState) {
              // this.currentStates.screenValue += key[1];
              this.currentStates.screenValue =
                this.currentStates.screenValue.substring(
                  0,
                  this.currentStates.start
                ) +
                key[1] +
                this.currentStates.screenValue.substring(
                  this.currentStates.end,
                  this.currentStates.screenValue.length
                );

              this._triggerEvent('oninput');
            } else {
              // Check if Shift turned on for change character to upper case.
              this.currentStates.screenValue = this.currentStates.capsLockState
                ? this.currentStates.screenValue.substring(
                    0,
                    this.currentStates.start
                  ) +
                  key[0].toUpperCase() +
                  this.currentStates.screenValue.substring(
                    this.currentStates.end,
                    this.currentStates.screenValue.length
                  )
                : this.currentStates.screenValue.substring(
                    0,
                    this.currentStates.start
                  ) +
                  key[0].toLowerCase() +
                  this.currentStates.screenValue.substring(
                    this.currentStates.end,
                    this.currentStates.screenValue.length
                  );
            }
            this._triggerEvent('oninput');

            this._fixCaretPosition();

            if (this.currentStates.volume) {
              audio22.currentTime = 0;
              audio22.play();
            }
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

  _fixCaretPosition(left) {
    this.allTextAreas.forEach((textArea) => {
      if (left) {
        if (this.currentStates.start <= 0) return textArea.focus();
        if (this.currentStates.end <= 0) return textArea.focus();
        textArea.focus();
        textArea.setSelectionRange(
          this.currentStates.start - 1,
          this.currentStates.end - 1
        );
        this.currentStates.start--;
        this.currentStates.end--;
        return;
      }
      // Set caret position to right position, but no to end.
      if (this.currentStates.start >= this.currentStates.screenValue.length) {
        return textArea.focus();
      }

      if (this.currentStates.end >= this.currentStates.screenValue.length) {
        return textArea.focus();
      }

      textArea.focus();
      textArea.setSelectionRange(
        this.currentStates.start + 1,
        this.currentStates.end + 1
      );
      this.currentStates.start++;
      this.currentStates.end++;
    });
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == 'function') {
      this.eventHandlers[handlerName](this.currentStates.screenValue);
    }
  },

  _toggleLanguage() {
    this.currentStates.languageState = !this.currentStates.languageState;
  },

  _toggleCapsLock(shift) {
    this.currentStates.capsLockState = !this.currentStates.capsLockState;
    this.elements.keys.forEach((key) => {
      key.classList.remove('keyboard__key--active');
    });

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        if (shift === 'shift') {
          if (!this.currentStates.languageState) {
            // if it is En
            if (this.currentStates.capsLockState) {
              switch (key.textContent) {
                case '1':
                  key.textContent = '!';
                  break;
                case '2':
                  key.textContent = '@';
                  break;
                case '3':
                  key.textContent = '#';
                  break;
                case '4':
                  key.textContent = '$';
                  break;
                case '5':
                  key.textContent = '%';
                  break;
                case '6':
                  key.textContent = '^';
                  break;
                case '7':
                  key.textContent = '&';
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
                case ',':
                  key.textContent = '<';
                  break;
                case '.':
                  key.textContent = '>';
                  break;
                case "'":
                  key.textContent = '"';
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
                case '#':
                  key.textContent = '3';
                  break;
                case '$':
                  key.textContent = '4';
                  break;
                case '%':
                  key.textContent = '5';
                  break;
                case '^':
                  key.textContent = '6';
                  break;
                case '&':
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
                case '<':
                  key.textContent = ',';
                  break;
                case '>':
                  key.textContent = '.';
                  break;
                case '"':
                  key.textContent = "'";
                  break;

                default:
                  break;
              }
            }
          } else {
            // if it is Ru
            if (this.currentStates.capsLockState) {
              switch (key.textContent) {
                case '1':
                  key.textContent = '!';
                  break;
                case '2':
                  key.textContent = '@';
                  break;
                case '3':
                  key.textContent = '№';
                  break;
                case '4':
                  key.textContent = ';';
                  break;
                case '5':
                  key.textContent = '%';
                  break;
                case '6':
                  key.textContent = ':';
                  break;
                case '7':
                  key.textContent = '?';
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
                case '.':
                  key.textContent = ',';
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
                case '№':
                  key.textContent = '3';
                  break;
                case ';':
                  key.textContent = '4';
                  break;
                case '%':
                  key.textContent = '5';
                  break;
                case ':':
                  key.textContent = '6';
                  break;
                case '?':
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
                case ',':
                  key.textContent = '.';
                  break;

                default:
                  break;
              }
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
