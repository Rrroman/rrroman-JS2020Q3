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
    this.screenTopNumber = '';
    this.screenBottomNumber = '';
    this.operation = '';
  }

  deleteLastNum() {}

  getOperation(operation) {}

  printNumber(number) {
    this.screenBottomNumber = number;
  }

  resultOfOperation() {}

  updateScreen() {
    screenBottomNumber.innerText = this.screenBottomNumber;
  }
}

const calculator = new Calculator(screenTopNumber, screenBottomNumber);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.printNumber(button.innerText);
    calculator.updateScreen();
  });
});
