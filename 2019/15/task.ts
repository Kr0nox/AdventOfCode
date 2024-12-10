import {Queue} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)

    const visited = new Set<string>()
    const queue = new Queue<State>()
    queue.push({
        list,
        i:0,
        x:0,
        y:0,
        d:0
    })
    while(!queue.isEmpty()) {
        const q = queue.pop()
        const pos = q.x + '|' + q.y
        if (visited.has(pos))
            continue
        visited.add(pos)

        const json = JSON.stringify(q.list)

        for (const ins of [1,2,3,4]) {
            const [nL, o, nI] = run(JSON.parse(json) as Record<number, number>, ins, q.i)
            //console.log(o)
            if (o[0] == 0) continue
            if (o[0] == 2) {
                console.log(q.d+1)
                return
            }
            const newState = {
                x: q.x,
                y: q.y,
                i: nI,
                list: nL, 
                d: q.d + 1
            }
            if (ins == 1) newState.y++
            if (ins == 2) newState.y--
            if (ins == 3) newState.x--
            if (ins == 4) newState.x++
            queue.push(newState)
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)

    const visited = new Set<string>()
    let queue = new Queue<State>()
    queue.push({
        list,
        i:0,
        x:0,
        y:0,
        d:0
    })
    let oxygenPos: undefined|State
    while(oxygenPos == undefined) {
        const q = queue.pop()
        const pos = q.x + '|' + q.y
        if (visited.has(pos))
            continue
        visited.add(pos)

        const json = JSON.stringify(q.list)

        for (const ins of [1,2,3,4]) {
            const [nL, o, nI] = run(JSON.parse(json) as Record<number, number>, ins, q.i)
            //console.log(o)
            if (o[0] == 0) continue
            const newState = {
                x: q.x,
                y: q.y,
                i: nI,
                list: nL, 
                d: q.d + 1
            }
            if (o[0] == 2) {
                oxygenPos = newState
                break
            }
            
            if (ins == 1) newState.y++
            if (ins == 2) newState.y--
            if (ins == 3) newState.x--
            if (ins == 4) newState.x++
            queue.push(newState)
        }
    }

    visited.clear()
    queue = new Queue<State>()
    oxygenPos.d = 0
    queue.push(oxygenPos)
    let maxD = 0
    while(!queue.isEmpty()) {
        const q = queue.pop()
        const pos = q.x + '|' + q.y
        if (visited.has(pos))
            continue
        visited.add(pos)
        if (q.d > maxD) maxD = q.d

        const json = JSON.stringify(q.list)

        for (const ins of [1,2,3,4]) {
            const [nL, o, nI] = run(JSON.parse(json) as Record<number, number>, ins, q.i)
            //console.log(o)
            if (o[0] == 0) continue
            
            if (o[0] == 2) {
                continue
            }
            const newState = {
                x: q.x,
                y: q.y,
                i: nI,
                list: nL, 
                d: q.d + 1
            }
            
            if (ins == 1) newState.y++
            if (ins == 2) newState.y--
            if (ins == 3) newState.x--
            if (ins == 4) newState.x++
            queue.push(newState)
        }
    }
    console.log(maxD)
}

interface State {
    x: number
    y: number
    i: number
    list: Record<number, number>,
    d: number
}

function run(list: Record<number, number>, input: number, i: number): [Record<number, number>, number[], number] {
    let relBase = 0
    let readInput = false
    const out: number[] = []
    while(list[i] != 99) {
        const op = list[i] % 100
        switch (op) {
            case 1: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c + b
                i+=4
                break
                
            }
            case 2: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c * b
                i+=4
                break
            }
            case 3: {
                if (readInput) return [list, out, i]
                list[getGoalIndex(i+1, getAtDigit(list[i], 100))] = input
                readInput = true
                i += 2
                break
            }
            case 4: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                out.push(c)
                i += 2
                break
            }
            case 5: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                if (c != 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            }
            case 6: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                if (c == 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            }
            case 7: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c < b ? 1:0
                i += 4
                break
            }
            case 8: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c == b ? 1:0
                i += 4
                break
            }
            case 9: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                relBase += c
                i+=2
                break
            }
            default: {
                throw i
            }
        }
    }
    return [list, out, i]

    function getVal(i: number, mode: number) {
        switch (mode) {
            case 0: {
                return list[list[i]]
            }
            case 1: {
                return list[i]
            }
            case 2: {
                return list[list[i]+relBase]
            }
            default:
                throw "unknown Mode"
        }
    }

    function getGoalIndex(i: number, mode: number) {
        switch (mode) {
            case 0: {
                return list[i]
            }
            case 1: {
                throw "not supported"
            }
            case 2: {
                return list[i]+relBase
            }
            default:
                throw "unknown Mode"
        }
    }

    function getAtDigit(num: number, digit: number) {
        return Math.floor(num / digit) % 10
    }
}