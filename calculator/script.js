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
    this.tempBottomNumber = this.tempBottomNumber.toString().slice(0, -1);
  }

  printNumber(number) {
    if (number === '.' && this.tempBottomNumber.includes('.')) return;
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
        result = (topNumber * 10 + bottomNumber * 10) / 10;
        break;
      case '-':
        result = topNumber - bottomNumber;
        break;
      case '÷':
        result = topNumber / bottomNumber;
        break;
      case '*':
        result = topNumber * bottomNumber;
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
      default:
        return;
    }
    this.readyToReset = true;
    this.tempBottomNumber = result;
    this.operation = undefined;
    this.tempTopNumber = '';
  }

  plusMinus() {
    if (this.tempBottomNumber[0] !== '-') {
      this.tempBottomNumber = '-' + this.tempBottomNumber;
    } else {
      this.tempBottomNumber = this.tempBottomNumber.slice(1);
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
