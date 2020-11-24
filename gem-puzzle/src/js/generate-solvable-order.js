let shuffledList = [];

function shuffle(array) {
  const tempArr = array;
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [tempArr[i], tempArr[j]] = [array[j], array[i]];
  }
  shuffledList = tempArr;
  return shuffledList;
}

export default function generateSolvableOrder() {
  let generateContinue = true;
  const totalCellAmount = 15;

  const cellsList = Array.from({ length: totalCellAmount }).map(
    (val, idx) => idx + 1
  );

  while (generateContinue !== false) {
    const firstRow = 3;
    const secondRow = 7;
    const thirdRow = 11;
    const fourthRow = 15;
    let target = 0;
    let rowWithZero;

    shuffle(cellsList);

    target = shuffledList.findIndex((el) => el === target);

    if (target <= firstRow) rowWithZero = 1;
    if (target >= firstRow && target <= secondRow) rowWithZero = 2;
    if (target >= secondRow && target <= thirdRow) rowWithZero = 3;
    if (target >= thirdRow && target <= fourthRow) rowWithZero = 4;

    let sum = 0;

    for (let i = 0; i < 15; i += 1) {
      // Find how much numbers are lower than startCheckNum
      // Check all 16 positions that are in shuffledList
      const checkNum = shuffledList.findIndex((el) => el === i);

      if (checkNum !== 0) {
        for (let j = i + 1; j <= 15; j += 1) {
          const smallerCheckNum = shuffledList.findIndex((el) => el === j);
          if (checkNum > smallerCheckNum && smallerCheckNum !== 0) sum += 1;
        }
      }
    }

    sum += rowWithZero;

    if (sum % 2 === 0) generateContinue = false;
  }

  return shuffledList;
}
