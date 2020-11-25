let shuffledList = [];
const totalCellAmount = 15;
export const cellsList = Array.from({ length: totalCellAmount }).map(
  (val, idx) => idx + 1
);

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

  while (generateContinue !== false) {
    const firstRowEndsAt = 3;
    const secondRowEndsAt = 7;
    const thirdRowEndsAt = 11;
    const fourthRowEndsAt = 15;
    let target = 0;
    let rowWithZero;

    shuffle(cellsList);

    target = shuffledList.findIndex((el) => el === target);

    if (target <= firstRowEndsAt) rowWithZero = 1;
    if (target >= firstRowEndsAt && target <= secondRowEndsAt) rowWithZero = 2;
    if (target >= secondRowEndsAt && target <= thirdRowEndsAt) rowWithZero = 3;
    if (target >= thirdRowEndsAt && target <= fourthRowEndsAt) rowWithZero = 4;

    let sum = 0;

    for (let i = 0; i < totalCellAmount; i += 1) {
      // Find how much numbers are lower than startCheckNum
      // Check all 16 positions that are in shuffledList
      const startCheckNum = shuffledList.findIndex((el) => el === i);

      if (startCheckNum !== 0) {
        for (let j = i + 1; j <= totalCellAmount; j += 1) {
          const smallerCheckNum = shuffledList.findIndex((el) => el === j);
          if (startCheckNum > smallerCheckNum && smallerCheckNum !== 0)
            sum += 1;
        }
      }
    }

    sum += rowWithZero;

    if (sum % 2 === 0) generateContinue = false;
  }

  return shuffledList;
}
