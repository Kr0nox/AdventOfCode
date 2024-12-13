import {lcmArr, lcm, gcd, ComplexNumber,  Stack, Queue, JsonSet, FunctionSet, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {

    let i = 0
    const buttons: any[] = []
    while(i < input.length) {
        const ra = /Button A: X([0-9+-]*), Y([0-9+-]*)/.exec(input[i])!
        const rb = /Button B: X([0-9+-]*), Y([0-9+-]*)/.exec(input[i+1])!
        const rg = /Prize: X=([0-9+-]*), Y=([0-9+-]*)/.exec(input[i+2])!
        i+= 4
        buttons.push({
            ax: Number(ra[1]),
            ay: Number(ra[2]),
            bx: Number(rb[1]),
            by: Number(rb[2]),
            x: Number(rg[1]),
            y: Number(rg[2])
        })
    }
    function getPrize(r: any) {
        let min = Infinity
        for (let j = 0; j <= 100; j++) {
            for (let bs = 0; bs <= 100; bs++) {
                if (j * r.ax + bs * r.bx != r.x) continue
                if (j * r.ay + bs * r.by != r.y) continue
                const cost = j*3+bs
                if (cost < min) min = cost
            }
        }
        return min
    }
    
    console.log(buttons.map(getPrize).filter(i => i != Infinity).reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {

    let i = 0
    const buttons: any[] = []
    while(i < input.length) {
        const ra = /Button A: X([0-9+-]*), Y([0-9+-]*)/.exec(input[i])!
        const rb = /Button B: X([0-9+-]*), Y([0-9+-]*)/.exec(input[i+1])!
        const rg = /Prize: X=([0-9+-]*), Y=([0-9+-]*)/.exec(input[i+2])!
        i+= 4
        buttons.push({
            ax: Number(ra[1]),
            ay: Number(ra[2]),
            bx: Number(rb[1]),
            by: Number(rb[2]),
            x: Number(rg[1]) + 10000000000000,
            y: Number(rg[2]) + 10000000000000
        })
    }
    function getPrize(r: any) {
        const b = (r.y - r.x * (r.ay / r.ax)) / (r.by - r.bx * (r.ay / r.ax))
        const rb = round(b)
        if (isNaN(b) || rb == Infinity) return Infinity
        const a  = (r.x - rb * r.bx) / r.ax
        const ra = round(a)
        if (isNaN(a) || ra == Infinity) return Infinity
        return rb+ra*3  
    }

    function round(x: number) {
        const r = Math.round(x)
        if (Math.abs(r - x) < 0.001) return r
        return Infinity
    }
    
    console.log(buttons.map(getPrize).filter(i => i != Infinity).reduce((a,b)=>a+b,0))
}



/*
const grid = input.map(i => i.split(''))

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {

    }
}


const queue = new Queue<State>()
const visited = new Set<string>()
queue.push()

while(!queue.isEmpty()) {
    const q = queue.pop()
    const k = q.x + '|' + q.y
    if (visited.has(k)) continue
    visited.add(k)

    for () {
        queue.push()
    }
}

interface State {
    x: number
    y: number
}

*/
