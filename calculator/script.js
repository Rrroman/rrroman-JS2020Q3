const screenTopNumber = document.querySelector('[data-previous-operand]'),
  screenBottomNumber = document.querySelector('[data-current-operand]'),
  numberButtons = document.querySelectorAll('[data-number]'),
  allClearBtn = document.querySelector('[data-all-clear]'),
  deleteBtn = document.querySelector('[data-delete]'),
  operationButtons = document.querySelectorAll('[data-operation]'),
  equalsBtn = document.querySelector('[data-equals]');
class Calculator {
  constructor(screenTopNumber, screenBottomNumber) {
    this.screenTopNumber = screenTopNumber;
    this.screenBottomNumber = screenBottomNumber;
    this.allClear();
  }

  allClear() {
    this.tempTopNumber = '';
    this.tempBottomNumber = '';
    this.operation = '';
  }

  deleteLastNum() {
    this.tempBottomNumber = this.tempBottomNumber.toString().slice(0, -1);
  }

  getOperation(operation) {
    if (this.tempBottomNumber === '') return;
    if (this.tempBottomNumber !== '') {
      this.resultOfOperation();
    }
    this.operation = operation;
    this.tempTopNumber = this.tempBottomNumber;
    this.tempBottomNumber = '';
  }

  resultOfOperation() {
    let result;
    const topNumber = parseFloat(this.tempTopNumber);
    const bottomNumber = parseFloat(this.tempBottomNumber);
    if (isNaN(bottomNumber) || isNaN(topNumber)) return;
    switch (this.operation) {
      case '+':
        result = topNumber + bottomNumber;
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
        result = Math.pow(topNumber, 1 / bottomNumber);
        console.log('result after sqrt-> ' + result);
        break;
      case 'xⁿ':
        result = Math.pow(topNumber, bottomNumber);
        break;

      default:
        return;
    }
    this.tempBottomNumber = result;
    this.operation = undefined;
    this.tempTopNumber = '';
  }

  printNumber(number) {
    if (number === '.' && this.tempBottomNumber.includes('.')) return;
    this.tempBottomNumber =
      this.tempBottomNumber.toString() + number.toString();
  }

  updateScreen() {
    this.screenBottomNumber.innerText = this.tempBottomNumber;
    if (this.operation !== null)
      this.screenTopNumber.innerText = `${this.tempTopNumber} ${this.operation}`;
  }
}

const calculator = new Calculator(screenTopNumber, screenBottomNumber);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.printNumber(button.innerText);
    calculator.updateScreen();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.getOperation(button.textContent);
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
