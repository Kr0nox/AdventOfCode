export async function taskOne(input: string[]): Promise<void> {
  console.log(
    input
      .reduce((a, b) => a + b, "")
      .split(",")
      .filter((s) => s != "")
      .map(hash)
      .reduce((a, b) => a + b, 0)
  );
}

export async function taskTwo(_input: string[]): Promise<void> {
  const instructions = _input
    .reduce((a, b) => a + b, "")
    .split(",")
    .filter((s) => s != "").map(mapInstruction);
  const boxes: Lense[][] = Array.from({length: 256}, () => [])
  for (const i of instructions) {
    if (i.name == 'remove') {
      boxes[i.box] = removeFromBox(boxes[i.box], i.label)
    } else {
      boxes[i.box] = insertToBox(boxes[i.box], i)
    }
  }
  let sum = 0
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      sum += (i+1)*(j+1)*boxes[i][j].strength
    }
  }
  console.log(sum)
}

interface Lense {
  label: string;
  strength: number;
}

type Task = {name: 'remove', box: number, label: string} | {name: 'insert', box: number, label: string, strength: number}

function hash(s: string) {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash += s.charCodeAt(i);
    hash *= 17;
    hash %= 256;
  }
  return hash;
}

function mapInstruction(s: string): Task {
  const split = s.split(/=|-/)
  const label = split[0]
  const box = hash(label)
  if (s.includes('-')) {
    return { name: 'remove', box: box, label: label }
  }
  return {
    name: 'insert',
    box: box,
    label: label,
    strength: parseInt(split[1])
  }
}

function removeFromBox(box: Lense[], label: string) {
  const boxIndex = box.findIndex(l => l.label == label)
  if (boxIndex < 0) return box
  for (let i = boxIndex; i < box.length - 1; i++) {
    box[i] = box[i+1]
  }
  return box.slice(0, box.length - 1)
}

function insertToBox(box: Lense[], lense:Lense) {
  const boxIndex = box.findIndex(l => l.label == lense.label)
  if (boxIndex < 0) {
    box.push(lense)
    return box
  }
  box[boxIndex].strength = lense.strength
  return box
}