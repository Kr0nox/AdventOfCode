
const edges: Record<string, Record<string, number>> = {}

export async function taskOne(input: string[]): Promise<void> {
    parse(input)

    const ways = permutations(Object.keys(edges)) as string[][]
    console.log(Math.min(...ways.map(cost)))
}

export async function taskTwo(input: string[]): Promise<void> {
    parse(input)

    const ways = permutations(Object.keys(edges)) as string[][]
    console.log(Math.max(...ways.map(cost)))
}

function permutations(arr: string[]): any {
    if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : [arr];
    return arr.reduce(
      (acc, item, i) =>
        acc.concat(
          permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val:any) => [
            item,
            ...val,
          ])
        ),
      []
    );
  };

function parse(input:string[]) {
    input.forEach(i => {
        const r = /([A-Za-z]+) to ([A-Za-z]+) = ([0-9]+)/.exec(i)
        if (!r) throw i
        if (!edges[r[1]]) edges[r[1]] = {}
        if (!edges[r[2]]) edges[r[2]] = {}
        edges[r[1]][r[2]] = parseInt(r[3])
        edges[r[2]][r[1]] = parseInt(r[3])
    })
}

function cost(w: string[]) {
    let c = 0
    for (let i = 0; i < w.length - 1; i++) {
        c += edges[w[i]][w[i+1]]
    }
    return c
}