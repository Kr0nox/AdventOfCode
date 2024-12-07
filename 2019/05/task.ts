export async function taskOne(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    console.log(run(list, [1])[1].reverse()[0])
}

export async function taskTwo(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    console.log(run(list, [5])[1][0])
}

function run(list: Record<number, number>, inputs: number[]): [Record<number, number>, number[]] {
    let i = 0
    inputs.reverse()
    const out: number[] = []
    while(list[i] % 100 != 99) {
        const op = list[i] % 100
        //console.log(op, i)
        switch (op) {
            case 1: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                //console.log(b,c,getAtDigit(list[i], 100),getAtDigit(list[i], 1000))
                list[list[i+3]] = c + b
                i+=4
                break
                
            }
            case 2: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                //console.log(b,c,getAtDigit(list[i], 100),getAtDigit(list[i], 1000))
                list[list[i+3]] = c * b
                i+=4
                break
            }
            case 3: {
                list[list[i+1]] = inputs.pop()!
                i += 2
                break
            }
            case 4: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                out.push(c)
                i += 2
                break
            }
            case 5: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                if (c != 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            }
            case 6: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                if (c == 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            }
            case 7: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                list[list[i+3]] = c < b ? 1:0
                i += 4
                break
            }
            case 8: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                list[list[i+3]] = c == b ? 1:0
                i += 4
                break
            }
            default: {
                throw i
            }
        }
    }
    return [list, out]
}

function getAtDigit(num: number, digit: number) {
    return Math.floor(num / digit) % 10
}