export async function taskOne(input: string[]): Promise<void> {
  task(input, 0)
  //console.log("a")
}

export async function taskTwo(input: string[]): Promise<void> {
  task(input, 1)
}

function task(input: string[], distance: number) {
  const fields = getFields(input);
  let horizontal = fields
    .map(s => getHorizontalMirror(s, distance))
    .filter((s) => s != undefined);
  let vertical = fields
    .map(transpose)
    .map(s => getHorizontalMirror(s, distance))
    .filter((s) => s != undefined);
  const v = vertical.reduce((a, b) => a + b, 0);
  const h = horizontal.reduce((a, b) => a + b, 0) * 100;
  console.log(v + h);
}

function getFields(input: string[]) {
  const fields: string[][] = [];
  let field: string[] = [];
  for (const line of input) {
    if (line == "") {
      fields.push(field);
      field = [];
    } else {
      field.push(line);
    }
  }
  if (field.length > 0) {
    fields.push(field);
  }
  return fields;
}

function getHorizontalMirror(field: string[], hammingDistance: number) {
  for (let i = 0; i < field.length - 1; i++) {
    let t = i;
    let b = i + 1;
    let distance = 0;
    while (t >= 0 && b < field.length) {
      distance += hamming(field[t], field[b]);
      t--;
      b++;
    }
    if (distance == hammingDistance) {
      return i + 1;
    }
  }
  return 0;
}

function transpose(A: string[]) {
  const T = Array.from({ length: A[0].length }, () => "");
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      T[j] += A[i].charAt(j);
    }
  }
  return T;
}

function hamming(a: string, b: string) {
  let counter = 0;
  for (let i = 0; i < a.length; i++) {
    if (a.charAt(i) != b.charAt(i)) {
      counter++;
    }
  }
  return counter;
}
