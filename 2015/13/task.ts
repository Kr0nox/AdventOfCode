const gain: Record<string, Record<string, number>> = {}

export async function taskOne(input: string[]): Promise<void> {
    mapGain(input)

    const perms = permutations(Object.keys(gain)) as string[][]
    console.log(Math.max(...perms.map(getGain)))
}

export async function taskTwo(input: string[]): Promise<void> {
    mapGain(input)

    const keys = Object.keys(gain)
    gain['You'] = {}
    for (const k of keys) {
        gain[k]['You'] = 0
        gain['You'][k] = 0
    }

    const perms = permutations(Object.keys(gain)) as string[][]
    let max = 0;
    for(const p of perms) {
        const m = getGain(p)
        if (m > max) max = m
    }
    console.log(max)
}

function getGain(seat: string[]) {
    function index(i: number) {
        return (i + seat.length) % seat.length
    }
    let c = 0;
    for (let i = 0; i < seat.length; i++) {
        c += gain[seat[i]][seat[index(i-1)]]
        c += gain[seat[i]][seat[index(i+1)]]
    }
    return c
}

function mapGain(input: string[]) {
    input.forEach(i => {
        const r = /([A-Za-z]+) would (gain|lose) ([0-9]+) happiness units by sitting next to ([A-Za-z]+)\./.exec(i)
        if (!r) throw i
        if(!gain[r[1]]) gain[r[1]] = {}
        gain[r[1]][r[4]] = (r[2] == 'gain' ? 1:-1) * parseInt(r[3])
    })
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