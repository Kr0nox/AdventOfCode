import {Queue, Stack, JsonSet} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const grid = parse(input)
    let count = 0
    for (const r1 of grid) {
        for (const g1 of r1) {
            if (g1.used == 0) continue
            for (const r2 of grid) {
                for (const g2 of r2) {
                    if (g1.x == g2.x && g1.y == g2.y) continue
                    if (g1.used <= g2.avail) count++
                }
            }
        }
    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = parse(input)
    const goal = [0,0]
    let data: [number, number] = [grid.length-1,0]
    let empty: [number, number] = [-1,-1]
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y].used == 0) empty = [x,y]
        }
    }
    const V: JsonSet<number[]> = new JsonSet()
    const Q: Queue<State> = new Queue()
    Q.push({
        c:0,d:data,e:empty
    })
    while(!Q.isEmpty()) {
        const q = Q.pop()
        if (q.d[0] == goal[0] && q.d[1] == goal[1]) {
            console.log(q.c)
            return
        }
        if (V.has([q.d[0],q.d[1],q.e[0],q.e[1]])) continue
        V.add([q.d[0],q.d[1],q.e[0],q.e[1]])

        for(const dir of [[1,0],[0,1],[-1,0],[0,-1]]) {
            const dx = q.e[0]+dir[0]
            const dy = q.e[1]+dir[1]
            if (dx < 0 || dx >= grid.length) continue
            if (dy < 0 || dy >= grid[dx].length) continue
            if (grid[q.e[0]][q.e[1]].size < grid[dx][dy].used) continue
            if (dx == q.d[0] && dy == q.d[1]) {
                Q.push({
                    c: q.c+1,
                    d: q.e,
                    e: [dx, dy]
                })
            } else {
                Q.push({
                    c: q.c+1,
                    d: q.d,
                    e: [dx, dy]
                })
            }
        }
    }

}

interface State {
    c: number,
    d: [number, number]
    e: [number, number]
}

function parse(_input: string[]): Plate[][] {
    const input = _input.slice(2)
    const maxX = Math.max(...input.map(i => /node-x([0-9]+)/.exec(i)?.[1] ?? '0').map(Number))
    const maxY = Math.max(...input.map(i => /node-x([0-9]+)-y([0-9]+)/.exec(i)?.[2] ?? '0').map(Number))
    const grid = Array.from({length: maxX+1}, () => Array.from({length: maxY+1}, () => {return{}as Plate}))
    input.forEach(i => {
        const r = /\/dev\/grid\/node-x([0-9]+)-y([0-9]+) *([0-9]+)T *([0-9]+)T *([0-9]+)T *([0-9]+)%/.exec(i)
        if (!r) throw i
        const x = Number(r[1])
        const y = Number(r[2])
        grid[x][y] = {
            x: x,
            y: y,
            size: Number(r[3]),
            used: Number(r[4]),
            avail: Number(r[5]),
            perc: Number(r[6])
        }
    })
    return grid
}

interface Plate {
    x: number
    y: number
    size: number
    used: number
    avail: number
    perc: number
}

function copy<T>(t:T):T {
    return JSON.parse(JSON.stringify(t))
}
