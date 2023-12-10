let INPUT: string[] = [];

export async function taskOne(input: string[]): Promise<void> {
  const sY = input.findIndex((s) => s.includes("S"));
  const sX = input[sY].indexOf("S");
  INPUT = input;

  const starts: Coordinate[] = [];
  if (["|", "7", "F"].includes(input[sY - 1][sX]))
    starts.push({ x: sX, y: sY - 1 });
  if (["|", "J", "L"].includes(input[sY + 1][sX]))
    starts.push({ x: sX, y: sY + 1 });
  if (["-", "7", "J"].includes(input[sY][sX + 1]))
    starts.push({ x: sX + 1, y: sY });
  if (["-", "F", "L"].includes(input[sY][sX - 1]))
    starts.push({ x: sX - 1, y: sY });

  console.log(starts);
  console.log(
    walkTillMeet(starts[0], { x: sX, y: sY }, starts[1], { x: sX, y: sY }, 1)
  );
}

export async function taskTwo(_input: string[]): Promise<void> {
  const input = _input
  const sY = input.findIndex((s) => s.includes("S"));
  const sX = input[sY].indexOf("S");
  let sTop= false, sBottom= false, sLeft= false, sRight = false
  if (sY > 0 && ["|", "7", "F"].includes(input[sY - 1][sX]))
    sTop = true
  if (sY < input.length - 1 && ["|", "J", "L"].includes(input[sY + 1][sX]))
    sBottom = true
  if (sX < input[0].length-1 && ["-", "7", "J"].includes(input[sY][sX + 1]))
    sRight = true
  if (sX > 0 && ["-", "F", "L"].includes(input[sY][sX - 1]))
    sLeft = true
  INPUT = _input

  if (sTop && sBottom) input[sY]=input[sY].replace('S', '|')
  if (sLeft && sRight)  input[sY]=input[sY].replace('S', '-')
  if (sTop && sLeft)  input[sY]=input[sY].replace('S', 'J')
  if (sTop && sRight) input[sY]= input[sY].replace('S', 'L')
  if (sLeft && sBottom)  input[sY]=input[sY].replace('S', '7')
  if (sRight && sBottom) input[sY]= input[sY].replace('S', 'F')

  //console.log(input)
  //console.log("")

  
  for (let y = 0; y < input.length; y++) {
    OPTION.push(Array<TileOption>(3*input[y].length).fill(TileOption.UNKNOWN));
    OPTION.push(Array<TileOption>(3*input[y].length).fill(TileOption.UNKNOWN));
    OPTION.push(Array<TileOption>(3*input[y].length).fill(TileOption.UNKNOWN));
  }
  OPTION[3*sY+1][3*sX+1] = TileOption.PIPE
  walkWayOptionMarking(findNext({x:sX,y:sY},{x:-1,y:-1}), {x:sX,y:sY}, {x:sX,y:sY})
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (OPTION[3*y + 1][3*x + 1] == TileOption.PIPE) {
        switch (input[y][x]) {
          case "|":
            OPTION[3*y+2][3*x+1] = TileOption.PIPE;
            OPTION[3*y][3*x+1] = TileOption.PIPE;
            break;
          case "-":
            OPTION[3*y+1][3*x] = TileOption.PIPE;
            OPTION[3*y+1][3*x+2] = TileOption.PIPE;
            break;
          case "J":
            OPTION[3*y][3*x+1] = TileOption.PIPE;
            OPTION[3*y+1][3*x] = TileOption.PIPE;
            break;
          case "L":
            OPTION[3*y][3*x+1] = TileOption.PIPE;
            OPTION[3*y+1][3*x+2] = TileOption.PIPE;
            break;
          case "F":
            OPTION[3*y+1][3*x+2] = TileOption.PIPE;
            OPTION[3*y+2][3*x+1] = TileOption.PIPE;
            break;
          case "7":
            OPTION[3*y+2][3*x+1] = TileOption.PIPE;
            OPTION[3*y+1][3*x] = TileOption.PIPE;
            break;
        }
      }
    }
  }
  for (let i = 0; i < 3*input.length; i++) {
    if (OPTION[i][0] = TileOption.UNKNOWN) OPTION[i][0] = TileOption.OUTSIDE
  }
  for (let i = 0; i < 3*input[0].length; i++) {
    if (OPTION[0][i] = TileOption.UNKNOWN) OPTION[0][i] = TileOption.OUTSIDE
  }
  //console.log(OPTION.map(s => s.join("")).join("\n"))
  for(let i = 0; i < OPTION.length; i++) {
    for (let j = 0; j < OPTION[0].length; j++) {
      mark({x:j,y:i},checkIsInside({x:j,y:i})? TileOption.INSIDE : TileOption.OUTSIDE)
    }
  }
  let counter = 0
  //console.log(OPTION.map(s => s.join("")).join("\n"))
  //console.log("")
  //printOption()
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (OPTION[3*y+1][3*x+1] == TileOption.INSIDE) {
        counter++
      }
    }
  }
  console.log(counter)
}

interface Coordinate {
  x: number;
  y: number;
}

function walkTillMeet(
  start1: Coordinate,
  parent1: Coordinate,
  start2: Coordinate,
  parent2: Coordinate,
  counter: number
) {
  while (!(start1.x == start2.x && start1.y == start2.y)) {
    const s1T = start1;
    start1 = findNext(start1, parent1);
    parent1 = s1T;

    const s2T = start2;
    start2 = findNext(start2, parent2);
    parent2 = s2T;

    counter++;
  }
  return counter;
}

function findNext(start: Coordinate, parent: Coordinate) {
  let nextOptions: Coordinate[];
  switch (INPUT[start.y][start.x]) {
    case "|":
      nextOptions = [
        { x: start.x, y: start.y - 1 },
        { x: start.x, y: start.y + 1 },
      ];
      break;
    case "-":
      nextOptions = [
        { x: start.x + 1, y: start.y },
        { x: start.x - 1, y: start.y },
      ];
      break;
    case "L":
      nextOptions = [
        { x: start.x + 1, y: start.y },
        { x: start.x, y: start.y - 1 },
      ];
      break;
    case "J":
      nextOptions = [
        { x: start.x - 1, y: start.y },
        { x: start.x, y: start.y - 1 },
      ];
      break;
    case "F":
      nextOptions = [
        { x: start.x + 1, y: start.y },
        { x: start.x, y: start.y + 1 },
      ];
      break;
    case "7":
      nextOptions = [
        { x: start.x - 1, y: start.y },
        { x: start.x, y: start.y + 1 },
      ];
      break;
    default:
      throw "Invalid symbol reached";
  }
  if (nextOptions.length != 2) {
    console.log(start, parent, nextOptions);
    throw "to many options";
  }
  if (nextOptions[0].x == parent.x && nextOptions[0].y == parent.y) {
    return nextOptions[1];
  }
  return nextOptions[0];
}

function walkWayOptionMarking(_start: Coordinate, _parent: Coordinate, initial: Coordinate) {
  let start = _start
  let parent = _parent
  while (!(start.x == initial.x && start.y == initial.y)) {
    OPTION[3*start.y+1][3*start.x+1] = TileOption.PIPE
    const next = findNext(start, parent)
    parent = start;
    start = next
  }
}

enum TileOption {
  PIPE = 'P',
  INSIDE = 'I',
  OUTSIDE = '.',
  UNKNOWN = ' ',
  VISITED = 'V'
}

let OPTION: TileOption[][] = [];

function checkIsInside(c: Coordinate) {
  const nextChecks = [c];
  while (nextChecks.length > 0) {
    const q = nextChecks.shift() as Coordinate;
    if (q.x < 0 || q.x >= OPTION[0].length) return false;
    if (q.y < 0 || q.y >= OPTION.length) return false;
    if (OPTION[q.y][q.x] == TileOption.OUTSIDE) return false;
    if (OPTION[q.y][q.x] == TileOption.UNKNOWN) {
      nextChecks.push({ x: q.x + 1, y: q.y });
      nextChecks.push({ x: q.x, y: q.y + 1 });
      nextChecks.push({ x: q.x - 1, y: q.y });
      nextChecks.push({ x: q.x, y: q.y - 1 });
      OPTION[q.y][q.x] = TileOption.VISITED
    }
  }
  return true;
}

function mark(c: Coordinate, op: TileOption) {
  const nextChecks = [c];
  while (nextChecks.length > 0) {
    const q = nextChecks.shift() as Coordinate;
    if (q.x < 0 || q.x >= OPTION[0].length) continue;
    if (q.y < 0 || q.y >= OPTION.length) continue;
    if (OPTION[q.y][q.x] == TileOption.VISITED || OPTION[q.y][q.x] == TileOption.UNKNOWN) {
      OPTION[q.y][q.x] = op;
      nextChecks.push({ x: q.x + 1, y: q.y });
      nextChecks.push({ x: q.x, y: q.y + 1 });
      nextChecks.push({ x: q.x - 1, y: q.y });
      nextChecks.push({ x: q.x, y: q.y - 1 });
    }
  }
}

function printOption() {
  for (let i = 1; i < OPTION.length; i+=3) {
    let s = ""
    for (let j = 1; j < OPTION[i].length; j+=3) {
      s += OPTION[i][j]
    }
    console.log(s)
  }
}