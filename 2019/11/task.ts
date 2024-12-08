import {ComplexNumber} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    console.log(run(list)[0].size)
}

export async function taskTwo(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    const o = run(list, true)[1]
    const whitePositions = new Set<string>()

    let minY = 0
    let maxY = 0
    let minX = 0
    let maxX = 0
    for (const k of Object.keys(o)) {
        const p = k.split('|').map(Number)
        console.log(p)
        if (p[1] > maxY) maxY = p[1]
        if (p[1] < minY) minY = p[1]
        if (p[0] > maxX) maxX = p[0]
        if (p[0] < minX) minX = p[0]
        if (o[k]) whitePositions.add(k)
    }

    for (let y = minY; y <= maxY; y++) {
        let r = ''
        for (let x = minX; x <= maxX; x++) {
            if (whitePositions.has(x+'|'+y)) r += '#'
            else r += ' '
        }
        console.log(r)
    }
}

function run(list: Record<number, number>, startIsWhite = false): [Set<string>, Record<string, boolean>] {
    let pos = [0,0]
    let dir = new ComplexNumber(0,-1)
    const grid: Record<string, boolean> = {}
    grid['0|0'] = startIsWhite
    const paintedOnce = new Set<string>()
    let outType: 'Move'|'Paint' = 'Paint'
    let relBase = 0
    let i = 0
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
                const k =pos[0]+'|'+pos[1]
                list[getGoalIndex(i+1, getAtDigit(list[i], 100))] = (grid[k] ?? false) ? 1:0
                i += 2
                break
            }
            case 4: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                if (outType == 'Paint') {
                    const k =pos[0]+'|'+pos[1]
                    grid[k] = c == 1
                    paintedOnce.add(k)
                    outType = 'Move'
                } else {
                    if (c == 0) dir.mulAdd(new ComplexNumber(0,-1))
                    else dir.mulAdd(new ComplexNumber(0,1))
                    pos[0] += dir.rel
                    pos[1] += dir.img
                    outType = 'Paint'
                }
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
    return [paintedOnce, grid]

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