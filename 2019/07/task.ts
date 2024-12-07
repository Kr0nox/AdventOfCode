import {Queue} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const combs = combinations()
    let max = 0
    for (const c of combs) {
        let lastOut = 0
        for (const d of c) {
            lastOut = run(parse(input[0]), [d, lastOut])[1][0]
        }
        if (lastOut > max) max = lastOut
    }
    console.log(max)

    function combinations(remaining = [0,1,2,3,4]): number[][] {
        if (remaining.length == 0) return [[]]
        let total = [] as number[][]
        let solutions: number[][] = []
        for (const r of remaining) {
            for (const t of combinations(remaining.filter(i=>i!=r))) {
                solutions.push([r, ...t])
            }
        }
        return solutions
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    tryCombination([9,8,7,6,5])
    const combs = combinations()
    let max = 0
    for (const c of combs) {
        const r = tryCombination(c)
        if (r > max) max = r
    }
    console.log(max)

    function tryCombination(comb: number[]) {
        let is = [0,0,0,0,0]
        const lists = [parse(input[0]), parse(input[0]), parse(input[0]), parse(input[0]), parse(input[0])]
        const inputs = [new Queue<number>(), new Queue<number>(), new Queue<number>(), new Queue<number>(), new Queue<number>()]
        for (let i = 0; i < 5; i++) {
            inputs[i].push(comb[i])
        }
        inputs[0].push(0)
        let cur = 0
        while(is.some((i,idx)=>lists[idx][i] % 100 != 99)) {
            let needInput = false
            while(lists[cur][is[cur]] % 100 != 99) {
                if (needInput) break
                const op = lists[cur][is[cur]] % 100
                switch (op) {
                    case 1: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        const b = getAtDigit(lists[cur][is[cur]], 1000) == 0 ? lists[cur][lists[cur][is[cur]+2]] : lists[cur][is[cur]+2]
                        lists[cur][lists[cur][is[cur]+3]] = c + b
                        is[cur]+=4
                        break
                        
                    }
                    case 2: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        const b = getAtDigit(lists[cur][is[cur]], 1000) == 0 ? lists[cur][lists[cur][is[cur]+2]] : lists[cur][is[cur]+2]
                        lists[cur][lists[cur][is[cur]+3]] = c * b
                        is[cur]+=4
                        break
                    }
                    case 3: {
                        if (inputs[cur].isEmpty()) {
                            needInput = true
                            break
                        }
                        lists[cur][lists[cur][is[cur]+1]] = inputs[cur].pop()
                        is[cur] += 2
                        break
                    }
                    case 4: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        inputs[(cur+1)%5].push(c)
                        is[cur] += 2
                        break
                    }
                    case 5: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        const b = getAtDigit(lists[cur][is[cur]], 1000) == 0 ? lists[cur][lists[cur][is[cur]+2]] : lists[cur][is[cur]+2]
                        if (c != 0) {
                            is[cur] = b
                        } else {
                            is[cur] += 3
                        }
                        break
                    }
                    case 6: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        const b = getAtDigit(lists[cur][is[cur]], 1000) == 0 ? lists[cur][lists[cur][is[cur]+2]] : lists[cur][is[cur]+2]
                        if (c == 0) {
                            is[cur] = b
                        } else {
                            is[cur] += 3
                        }
                        break
                    }
                    case 7: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        const b = getAtDigit(lists[cur][is[cur]], 1000) == 0 ? lists[cur][lists[cur][is[cur]+2]] : lists[cur][is[cur]+2]
                        lists[cur][lists[cur][is[cur]+3]] = c < b ? 1:0
                        is[cur] += 4
                        break
                    }
                    case 8: {
                        const c = getAtDigit(lists[cur][is[cur]], 100) == 0 ? lists[cur][lists[cur][is[cur]+1]] : lists[cur][is[cur]+1]
                        const b = getAtDigit(lists[cur][is[cur]], 1000) == 0 ? lists[cur][lists[cur][is[cur]+2]] : lists[cur][is[cur]+2]
                        lists[cur][lists[cur][is[cur]+3]] = c == b ? 1:0
                        is[cur] += 4
                        break
                    }
                    default: {
                        throw is[cur]
                    }
                }
            }
            cur = (cur+1)%5
        }

        return inputs[0].pop()
    }

    function combinations(remaining = [5,6,7,8,9]): number[][] {
        if (remaining.length == 0) return [[]]
        let total = [] as number[][]
        let solutions: number[][] = []
        for (const r of remaining) {
            for (const t of combinations(remaining.filter(i=>i!=r))) {
                solutions.push([r, ...t])
            }
        }
        return solutions
    }
}

function parse(input: string) {
    const list: Record<number, number> = {}
    input.split(',').map(Number).forEach((i,idx) => list[idx] = i)
    return list
}

function run(list: Record<number, number>, inputs: number[]): [Record<number, number>, number[]] {
    let i = 0
    inputs.reverse()
    const out: number[] = []
    while(list[i] % 100 != 99) {
        const op = list[i] % 100
        switch (op) {
            case 1: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
                list[list[i+3]] = c + b
                i+=4
                break
                
            }
            case 2: {
                const c = getAtDigit(list[i], 100) == 0 ? list[list[i+1]] : list[i+1]
                const b = getAtDigit(list[i], 1000) == 0 ? list[list[i+2]] : list[i+2]
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