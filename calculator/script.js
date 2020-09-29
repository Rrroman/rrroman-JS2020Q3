const screenTopNumber = document.querySelector('[data-previous-operand]'),
  screenBottomNumber = document.querySelector('[data-current-operand]'),
  numberButtons = document.querySelectorAll('[data-number]'),
  allClearBtn = document.querySelector('[data-all-clear]'),
  deleteBtn = document.querySelector('[data-delete]'),
  operationButtons = document.querySelectorAll('[data-operation]'),
  equalsBtn = document.querySelector('[data-equals]'),
  plusMinusBtn = document.querySelector('[data-plus-minus]');
class Calculator {
  constructor(screenTopNumber, screenBottomNumber) {
    this.screenTopNumber = screenTopNumber;
    this.screenBottomNumber = screenBottomNumber;
    this.readyToReset = false;
    this.allClear();
  }

  allClear() {
    this.tempTopNumber = '';
    this.tempBottomNumber = '0';
    this.operation = undefined;
  }

  deleteLastNum() {
    calculator.readyToReset = false;
    if (
      this.tempBottomNumber === '0' ||
      this.tempBottomNumber === '-' ||
      this.tempBottomNumber === '-0'
    ) {
      return;
    }
    this.tempBottomNumber = this.tempBottomNumber.toString().slice(0, -1);
  }

  printNumber(number) {
    if (this.tempBottomNumber === '-') {
      return;
    }

    if (this.tempBottomNumber === '-0' && number === '.') {
      this.tempBottomNumber = this.tempBottomNumber + '.';
      return;
    }

    if (number === '.' && this.tempBottomNumber.includes('.')) return;
    if (number[0] === '.') {
      this.tempBottomNumber = 0 + this.tempBottomNumber;
    }
    if (number[0] === '0.') {
      this.tempBottomNumber = '-' + 0 + this.tempBottomNumber;
    }
    this.tempBottomNumber =
      this.tempBottomNumber.toString() + number.toString();
  }

  getOperation(operation) {
    if (this.tempBottomNumber === '') return;
    if (this.tempBottomNumber !== '') {
      this.resultOfOperation();
    }
    this.operation = operation;
    this.tempTopNumber = this.tempBottomNumber;
    this.tempBottomNumber = '0';
  }

  resultOfOperation() {
    let result;
    const topNumber = parseFloat(this.tempTopNumber);
    const bottomNumber = parseFloat(this.tempBottomNumber);
    if (isNaN(bottomNumber) || isNaN(topNumber)) return;
    switch (this.operation) {
      case '+':
        result = (topNumber * 10000 + bottomNumber * 10000) / 10000;
        break;
      case '-':
        result = (topNumber * 10000 - bottomNumber * 10000) / 10000;
        break;
      case '÷':
        if (bottomNumber === 0) {
          result = 'ERR';
        } else {
          result = ((topNumber / bottomNumber) * 10000) / 10000;
        }
        break;
      case '*':
        result = Math.round(bottomNumber * topNumber * 10000) / 10000;
        break;
      case 'ⁿ√x':
        if (topNumber < 0) {
          result = 'ERR';
        } else {
          result = Math.pow(topNumber, 1 / bottomNumber);
        }
        break;
      case 'xⁿ':
        result = Math.pow(topNumber, bottomNumber);
        break;
      case '²√x':
        if (topNumber < 0) {
          result = 'ERR';
        } else {
          result = Math.pow(topNumber, 1 / 2);
        }
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.tempBottomNumber = result;
    this.operation = undefined;
    this.tempTopNumber = '';
  }

  plusMinus() {
    if (this.tempBottomNumber === '') {
      this.tempBottomNumber = '0';
    }
    if (this.tempBottomNumber !== '' && this.tempBottomNumber === 'ERR') {
      this.tempBottomNumber = '0';
    }
    if (this.tempBottomNumber[0] === '-') {
      this.tempBottomNumber = this.tempBottomNumber.substr(
        1,
        this.tempBottomNumber.length
      );
    } else {
      this.tempBottomNumber = '-' + this.tempBottomNumber;
    }
  }

  comaForBigNumbers(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateScreen() {
    this.screenBottomNumber.innerText = this.comaForBigNumbers(
      this.tempBottomNumber
    );

    if (this.tempBottomNumber === '') {
      this.screenBottomNumber.innerText = 0;
    }

    if (this.tempBottomNumber === 'ERR') {
      this.screenBottomNumber.innerText = this.tempBottomNumber;
    }

    if (this.operation != null && this.tempTopNumber !== '-') {
      this.screenTopNumber.innerText = `${this.comaForBigNumbers(
        this.tempTopNumber
      )} ${this.operation}`;
    } else {
      this.screenTopNumber.innerText = '';
    }
  }
}

const calculator = new Calculator(screenTopNumber, screenBottomNumber);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    if (
      calculator.tempTopNumber === '' &&
      calculator.tempBottomNumber !== '' &&
      calculator.readyToReset
    ) {
      calculator.tempBottomNumber = '';
      calculator.readyToReset = false;
    }
    calculator.printNumber(button.innerText);
    calculator.updateScreen();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.getOperation(button.innerText);
    calculator.updateScreen();
    if (button.innerText === '²√x') {
      calculator.resultOfOperation();
      calculator.updateScreen();
      return;
    }
  });
});

equalsBtn.addEventListener('click', () => {
  calculator.resultOfOperation();
  calculator.updateScreen();
});

allClearBtn.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateScreen();
});

deleteBtn.addEventListener('click', () => {
  calculator.deleteLastNum();
  calculator.updateScreen();
});

plusMinusBtn.addEventListener('click', () => {
  calculator.plusMinus();
  calculator.updateScreen();
});

window.addEventListener('keydown', function (e) {
  e.preventDefault();
  e = e || window.event;
  let keycode = e.key;

  if (
    calculator.tempTopNumber === '' &&
    calculator.tempBottomNumber !== '' &&
    calculator.readyToReset
  ) {
    calculator.tempBottomNumber = '';
    calculator.readyToReset = false;
  }

  switch (keycode) {
    case '+':
    case '-':
    case '/':
    case '*':
      calculator.getOperation(keycode);
      calculator.updateScreen();
      break;
    case 'Enter':
      calculator.resultOfOperation();
      calculator.updateScreen();
      break;
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      calculator.printNumber(keycode);
      calculator.updateScreen();
      break;
    case 'Backspace':
      calculator.deleteLastNum();
      calculator.updateScreen();
      break;
    case 'Delete':
    case ' ':
      calculator.allClear();
      calculator.updateScreen();
  }
});
