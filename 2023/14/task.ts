export async function taskOne(input: string[]): Promise<void> {
  const original = input.map((i) => i.split(""));
  let field = input.map((i) => i.split(""));
  for (let y = 1; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (field[y][x] == "O") {
        field = moveRockN(x, y, field);
      }
    }
  }

  console.log(northLoad(field));
}

export async function taskTwo(input: string[]): Promise<void> {
  let field = input.map((i) => i.split(""));
  const map: Map<string, number> = new Map();

  let counter = 0;
  const maxIters = 1000000000;
  let startCircle = 0;
  let endCircle = 0;
  while (counter < maxIters) {
    const fKey = field.map((i) => i.join("")).join("");
    if (map.has(fKey)) {
      startCircle = map.get(fKey) as number;
      endCircle = counter;
      break;
    }
    map.set(fKey, counter);

    field = doIter(field);

    counter++;
  }
  // -1 because we did the first iteration in the top loop already
  const possibleIters =
    Math.floor((maxIters - startCircle) / (endCircle - startCircle)) - 1;
  counter += possibleIters * (endCircle - startCircle);
  while (counter < maxIters) {
    field = doIter(field);
    counter++;
  }
  console.log(northLoad(field));
}

function doIter(field: string[][]) {
  for (let y = 1; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] == "O") {
        field = moveRockN(x, y, field);
      }
    }
  }
  for (let y = 0; y < field.length; y++) {
    for (let x = 1; x < field[y].length; x++) {
      if (field[y][x] == "O") {
        field = moveRockW(x, y, field);
      }
    }
  }
  for (let y = field.length - 2; y >= 0; y--) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] == "O") {
        field = moveRockS(x, y, field);
      }
    }
  }
  for (let y = 0; y < field.length; y++) {
    for (let x = field[y].length - 2; x >= 0; x--) {
      if (field[y][x] == "O") {
        field = moveRockE(x, y, field);
      }
    }
  }
  return field;
}

function moveRockN(x: number, y: number, field: string[][]) {
  field[y][x] = ".";
  while (y > 0 && field[y - 1][x] == ".") {
    y--;
  }
  field[y][x] = "O";
  return field;
}
function moveRockS(x: number, y: number, field: string[][]) {
  field[y][x] = ".";
  while (y < field.length - 1 && field[y + 1][x] == ".") {
    y++;
  }
  field[y][x] = "O";
  return field;
}
function moveRockW(x: number, y: number, field: string[][]) {
  field[y][x] = ".";
  while (x > 0 && field[y][x - 1] == ".") {
    x--;
  }
  field[y][x] = "O";
  return field;
}
function moveRockE(x: number, y: number, field: string[][]) {
  field[y][x] = ".";
  while (x <= field[y].length && field[y][x + 1] == ".") {
    x++;
  }
  field[y][x] = "O";
  return field;
}

function northLoad(field: string[][]) {
  let sum = 0;
  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field[y].length; x++) {
      if (field[y][x] == "O") sum += field.length - y;
    }
  }
  return sum;
}
