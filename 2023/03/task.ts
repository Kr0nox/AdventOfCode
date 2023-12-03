export async function taskOne(input: string[]): Promise<void> {
  console.log(getAdjacentNumbers(input).reduce((a, b) => a + b, 0));
}

export async function taskTwo(input: string[]): Promise<void> {
  getAdjacentNumbers(input);
  let result = 0;
  console.log(gearNumbers);
  for (const key in gearNumbers) {
    if (gearNumbers.hasOwnProperty(key)) {
      const element = gearNumbers[key];
      for (const key2 in element) {
        if (element.hasOwnProperty(key2)) {
          const element2 = element[key2];
          if (element2.length === 2) {
            result += element2[0] * element2[1];
          }
        }
      }
    }
  }
  console.log(result);
}

const gearNumbers: Record<number, Record<number, number[]>> = {};

function getAdjacentNumbers(input: string[]) {
  const numbers: number[] = [];
  let currentNumber = "";
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === ".") {
        currentNumber = "";
        continue;
      }

      while (!isNaN(parseInt(input[row][col])) && col < input[row].length) {
        currentNumber += input[row][col];
        col++;
      }
      const potLen = currentNumber.length;
      if (potLen > 0 && checkAdjacent(input, row, col - potLen, potLen)) {
        const checkResult = checkAdjacent(input, row, col - potLen, potLen);
        if (checkResult[0]) {
          numbers.push(parseInt(currentNumber));
        }
        if (checkResult[1]) {
          const key = [checkResult[2], checkResult[3]] as [number, number];
          if (!gearNumbers[key[0]]) {
            gearNumbers[key[0]] = {};
          }
          if (!gearNumbers[key[0]][key[1]]) {
            gearNumbers[key[0]][key[1]] = [];
          }
          gearNumbers[key[0]][key[1]].push(parseInt(currentNumber));
        }
      }
      currentNumber = "";
    }
  }
  return numbers;
}

const nonSpecialChars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "."];

function checkAdjacent(
  input: string[],
  row: number,
  col: number,
  length: number
) {
  if (row > 0) {
    for (
      let i = Math.max(0, col - 1);
      i < Math.min(col + length + 1, input[0].length);
      i++
    ) {
      if (!nonSpecialChars.includes(input[row - 1][i])) {
        return [true, input[row - 1][i] == "*", row - 1, i];
      }
    }
  }
  if (row < input.length - 1) {
    for (
      let i = Math.max(0, col - 1);
      i < Math.min(col + length + 1, input[0].length);
      i++
    ) {
      if (!nonSpecialChars.includes(input[row + 1][i])) {
        return [true, input[row + 1][i] == "*", row + 1, i];
      }
    }
  }
  if (col > 0) {
    if (!nonSpecialChars.includes(input[row][col - 1])) {
      return [true, input[row][col - 1] == "*", row, col - 1];
    }
  }
  if (col + length < input[0].length) {
    if (!nonSpecialChars.includes(input[row][col + length])) {
      return [true, input[row][col + length] == "*", row, col + length];
    }
  }
  return [false];
}
