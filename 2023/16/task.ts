let input: string[][] = []

export async function taskOne(_input: string[]): Promise<void> {
    input = _input.map(s=>s.split(""))
    console.log(sumGrid(walkGrid({x:0,y:0,d:'R'})))
}

export async function taskTwo(_input: string[]): Promise<void> {
    let max = -1
    input = _input.map(s=>s.split(""))
    //Top Edge
    for(let i = 0; i < input[0].length; i++) {
        const r = sumGrid(walkGrid({x:i,y:0,d:'D'}))
        max = Math.max(max, r)
    }
    //Bottom Edge
    for(let i = 0; i < input[0].length; i++) {
        const r = sumGrid(walkGrid({x:i,y:input.length-1,d:'U'}))
        max = Math.max(max, r)
    }
    //Left Edge
    for(let i = 0; i < input.length; i++) {
        const r = sumGrid(walkGrid({x:0,y:i,d:'R'}))
        max = Math.max(max, r)
    }
    //Right Edge
    for(let i = 0; i < input.length; i++) {
        const r = sumGrid(walkGrid({x:input[0].length,y:i,d:'L'}))
        max = Math.max(max, r)
    }
    console.log(max)
}

type Direction = 'L'|'R'|'U'|'D'

interface Beam {
    x: number
    y: number
    d: Direction
}

const dirX = {'L': -1, 'R': 1, 'U': 0, 'D': 0}
const dirY = {'L': 0, 'R': 0, 'U': -1, 'D': 1}

function getNextTiles(b: Beam): Beam[] {
    if (b.y < 0 || b.x < 0 || b.y >= input.length || b.x >= input[0].length) return []
    const i = input[b.y][b.x]
    if (i == '.') return [{d:b.d, x: b.x+dirX[b.d], y: b.y+dirY[b.d]}]
    if (i == '|' && (b.d == 'U' || b.d == 'D')) return [{d:b.d, x: b.x+dirX[b.d], y: b.y+dirY[b.d]}]
    if (i == '-' && (b.d == 'L' || b.d == 'R')) return [{d:b.d, x: b.x+dirX[b.d], y: b.y+dirY[b.d]}]

    if (i == '|' && (b.d == 'L' || b.d == 'R')) return [{d:'U', x: b.x, y: b.y-1}, {d:'D', x: b.x, y: b.y+1}]
    if (i == '-' && (b.d == 'U' || b.d == 'D')) return [{d:'L', x: b.x-1, y: b.y}, {d:'R', x: b.x+1, y: b.y}]

    if (i == '\\') {
        switch(b.d) {
            case 'U': return [{d:'L', x:b.x-1,y:b.y}]
            case 'D': return [{d:'R', x:b.x+1,y:b.y}]
            case 'L': return [{d:'U', x:b.x,y:b.y-1}]
            case 'R': return [{d:'D', x:b.x,y:b.y+1}]
        }
    }
    if (i == '/') {
        switch(b.d) {
            case 'D': return [{d:'L', x:b.x-1,y:b.y}]
            case 'U': return [{d:'R', x:b.x+1,y:b.y}]
            case 'R': return [{d:'U', x:b.x,y:b.y-1}]
            case 'L': return [{d:'D', x:b.x,y:b.y+1}]
        }
    }
    return []
}

function walkGrid(start:Beam) {
    const g: Direction[][][] = Array.from({length: input.length}, () => Array.from({length: input[0].length}, ()=>[]))
    const q: Beam[] = [start]
    while(q.length > 0) {
        const h = q.shift() as Beam
        if (h.y < 0 || h.x < 0 || h.y >= input.length || h.x >= input[0].length) continue
        if(g[h.y][h.x].includes(h.d)) continue
        g[h.y][h.x].push(h.d)
        q.push(...getNextTiles(h))
    }
    return g
}

function sumGrid(r: any[][][]) {
    let sum = 0
    for (let i = 0; i < r.length; i++) {
        for (let j = 0; j < r[i].length; j++) {
            if (r[i][j].length > 0) sum++
        }
    }
    return sum
}