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
    const V: JsonSet<Plate[][]> = new JsonSet()
    const Q: Record<number, Queue<State>> = {0:new Queue()}
    Q[0].push({
        g: grid,c:0,p:[grid.length-1,0]
    })
    let p = {} as Record<string, State>
    while(true) {
        const keys = Object.keys(Q).map(Number).sort((a,b) => a-b)
        let q: State|null = null
        for (const i of keys) {
            if (!Q[i].isEmpty()) {
                q = Q[i].pop()
                break;
            }
        }
        /*let s = 0
        for (const i of keys) s += Q[i].asArray().length
        console.log(s)*/


        if(!q) break

        if (V.has(q.g)) continue
        if (q.p[0] == 0 && q.p[1] == 0) {
            /*for(let i = q; i != undefined; i = p[JSON.stringify(i)]) {
               // print(i)
               // console.log('')
            }*/
            console.log(q.c)
            return
        }
        V.add(q.g)
        for (let x = 0; x < grid.length; x++) {
            for (let y = 0; y < grid[x].length; y++) {
                for (const offset of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    let dx = x+offset[0]
                    let dy = y+offset[1]
                    if (dx < 0 || dy < 0 || dx >= grid.length || dy >= grid[0].length) continue
                    if (q.g[x][y].used > q.g[dx][dy].avail) continue
                    const nq = copy(q)
                    nq.g[dx][dy].avail -= nq.g[x][y].used
                    nq.g[dx][dy].used += nq.g[x][y].used
                    nq.g[x][y].used = 0
                    nq.g[x][y].avail = nq.g[x][y].size

                    if (nq.p[0] == x && nq.p[1] == y) {
                        nq.p = [dx, dy]
                    }

                    nq.c++
                    p[JSON.stringify(nq)] = q 
                    const d1 = dx+dy
                    const d2 = Math.abs(q.p[0]- dx) + Math.abs(q.p[1]- dy)
                    const d = Math.min(d1, d2)
                    if (Q[d] == undefined) Q[d] = new Queue()
                    Q[d].push(nq)
                }
            }
        }
    }
}

interface State {
    g: Plate[][]
    c: number,
    p: [number, number]
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

function print(s: State) {
    function p(s1:Plate) {
        return s1.used.toString().padStart(2, ' ') + '/' + s1.size.toString().padStart(2, ' ')
    }
    for (const r of s.g) {
        r.map(p).join(' - ')
        console.log('  -  '.repeat(r.length))
    }
}