const screenTopNumber = document.querySelector('[data-previous-operand]'),
  screenBottomNumber = document.querySelector('[data-current-operand]'),
  numberButtons = document.querySelectorAll('[data-number]'),
  allClearBtn = document.querySelectorAll('[data-all-clear]'),
  deleteBtn = document.querySelectorAll('[data-delete]'),
  operationButtons = document.querySelectorAll('[data-operation]'),
  equalsBtn = document.querySelectorAll('[data-equals]');
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

  deleteLastNum() {}

  getOperation(operation) {
    if (this.tempBottomNumber === '') return;
    if (this.tempBottomNumber !== '') {
      this.resultOfOperation();
    }
    this.operation = operation;
    this.tempTopNumber = this.tempBottomNumber;
    this.tempBottomNumber = '';
  }

  resultOfOperation() {}

  printNumber(number) {
    if (number === '.' && this.tempBottomNumber.includes('.')) return;
    this.tempBottomNumber =
      this.tempBottomNumber.toString() + number.toString();
  }

  updateScreen() {
    this.screenBottomNumber.innerText = this.tempBottomNumber;
    this.screenTopNumber.innerText = this.tempTopNumber;
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
    calculator.getOperation(button.innerText);
    calculator.updateScreen();
  });
});
