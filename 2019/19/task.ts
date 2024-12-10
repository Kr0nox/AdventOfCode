export async function taskOne(input: string[]): Promise<void> {
    const inp = input[0].split(',').map(Number)
    let c = 0
    for (let x = 0; x < 50; x++) {
        for (let y = 0; y < 50; y++) {
            const list: Record<number, number> = {}
            inp.forEach((i,idx) => list[idx] = i)
            c += run(list, [x,y])[1][0]
        }
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const inp = input[0].split(',').map(Number)

    let x = 0
    let y = 0

    while(true) {
        while(!get(x+99, y)) y++
        if (get(x, y+99)) {
            console.log(x * 10000 + y)
            return
        }
        while(get(x + 99, y)) x++
        x++
    }


    function get(x: number, y: number) {
        const list: Record<number, number> = {}
        inp.forEach((i,idx) => list[idx] = i)
        return run(list, [x,y])[1][0] == 1
    }
}

function run(list: Record<number, number>, inputs: number[]): [Record<number, number>, number[]] {
    let relBase = 0
    let i = 0
    inputs.reverse()
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
                list[getGoalIndex(i+1, getAtDigit(list[i], 100))] = inputs.pop()!
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
    return [list, out]

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