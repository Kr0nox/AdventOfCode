export async function taskOne(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    console.log(run(list, [])[1])
}

export async function taskTwo(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    console.log(run(list, [2])[1])
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

