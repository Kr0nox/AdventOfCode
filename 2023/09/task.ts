function getNumbers(s: string) {
    return s
      .split(" ")
      .filter((x) => x != "")
      .map((x) => parseInt(x.trim()));
  }

export async function taskOne(input: string[]): Promise<void> {
    task(input, extrapolateRight)
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input, extrapolateLeft)
}

type History = number[][]

function reduceHistory(h: History) {
    const lastRow = h[h.length -1]
    if (lastRow.every(s => s == 0)) {
        return h
    }
    const newRow: number[] = []
    for (let i = 1; i < lastRow.length; i++) {
        newRow.push((lastRow[i] - lastRow[i-1]))
    }
    h.push(newRow)
    return reduceHistory(h)
}

function extrapolateRight(h: History) {
    let n = 0
    for (let i = h.length - 2; i >= 0; i--) {
        n += h[i][h[i].length - 1]
    }
    return n
}

function extrapolateLeft(h: History) {
    let n = 0
    for (let i = h.length - 2; i >= 0; i--) {
        n = h[i][0] - n
    }
    return n
}

function task(input: string[], extrapolate: (h: History) => number) {
    console.log(input.map(getNumbers).map(s => [s]).map(reduceHistory).map(extrapolate).reduce((a, b) => a+b))
}