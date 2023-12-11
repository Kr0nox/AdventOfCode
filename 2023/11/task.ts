let rowExpansion = 1;
let colExpansion = 1;

export async function taskOne(input: string[]): Promise<void> {
  task(input);
}

export async function taskTwo(input: string[]): Promise<void> {
  rowExpansion = 1000000 - 1;
  colExpansion = 1000000 - 1;
  task(input);
}

function task(input: string[]) {
  const doubleRows = input
    .map((v, i) => [v, i])
    .filter(([v, i]) => !(v as string).includes("#"))
    .map(([v, i]) => i as number);
  const inputLengthArray = Array.from(Array(input.length).keys());
  const doubleCols = Array.from(Array(input[0].length).keys()).filter((i) =>
    inputLengthArray.every((j) => input[j][i] == ".")
  );
  const points: Coordinate[] = getPoints(input).map((c) =>
    transformCoordinate(c, doubleRows, doubleCols)
  );
  console.log(
    buildPairs(points)
      .map(([a, b]) => manhattanDistance(a, b))
      .reduce((a, b) => a + b, 0)
  );
}

interface Coordinate {
  x: number;
  y: number;
}

function transformCoordinate(
  c: Coordinate,
  doubleRows: number[],
  doubleCols: number[]
) {
  return {
    x: c.x + doubleCols.filter((i) => i < c.x).length * rowExpansion,
    y: c.y + doubleRows.filter((i) => i < c.y).length * colExpansion,
  };
}

function getPoints(input: string[]) {
  const points: Coordinate[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (input[y][x] == "#") points.push({ x: x, y: y });
    }
  }
  return points;
}

function buildPairs(cs: Coordinate[]) {
  const pairs: [Coordinate, Coordinate][] = [];
  for (let i = 0; i < cs.length; i++) {
    for (let j = i + 1; j < cs.length; j++) {
      pairs.push([cs[i], cs[j]]);
    }
  }
  return pairs;
}

function manhattanDistance(a: Coordinate, b: Coordinate) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}
