import { Queue } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const _list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => _list[idx] = i)

    const lists: Record<number, number>[] = Array.from({length:50}, () => JSON.parse(JSON.stringify(_list)))
    const is: number[] = Array.from({length: 50}, () => 0)
    const relBases: number[] = Array.from({length: 50}, () => 0)
    const inputs: Queue<number>[] = Array.from({length: 50}, () => new Queue<number>())
    const outputs: number[][] = Array.from({length: 50}, () => [])

    for (let unit = 0; unit < 50; unit++) {
        inputs[unit].push(unit)
    }


    while (true) {
        for (let unit = 0; unit < 50; unit++) {
            const i = is[unit]
            if(lists[unit][i] != 99) {
                const op = lists[unit][i] % 100
                switch (op) {
                    case 1: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                        lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c + b
                        is[unit]+=4
                        break
                        
                    }
                    case 2: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                        lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c * b
                        is[unit]+=4
                        break
                    }
                    case 3: {
                        if(inputs[unit].isEmpty()) {
                            lists[unit][getGoalIndex(i+1, getAtDigit(lists[unit][i], 100), unit)] = -1
                        } else {
                            lists[unit][getGoalIndex(i+1, getAtDigit(lists[unit][i], 100), unit)] = inputs[unit].pop()
                        }
                        is[unit] += 2
                        break
                    }
                    case 4: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        outputs[unit].push(c)
                        if (outputs[unit].length == 3) {
                            const goal = outputs[unit][0]
                            const x = outputs[unit][1]
                            const y = outputs[unit][2]
                            if (goal == 255) {
                                console.log(y)
                                return
                            }
                            outputs[unit] = []
                            inputs[goal].push(x)
                            inputs[goal].push(y)
                        }
                        is[unit] += 2
                        break
                    }
                    case 5: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                        if (c != 0) {
                            is[unit] = b
                        } else {
                            is[unit] += 3
                        }
                        break
                    }
                    case 6: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                        if (c == 0) {
                            is[unit] = b
                        } else {
                            is[unit] += 3
                        }
                        break
                    }
                    case 7: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                        lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c < b ? 1:0
                        is[unit] += 4
                        break
                    }
                    case 8: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                        lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c == b ? 1:0
                        is[unit] += 4
                        break
                    }
                    case 9: {
                        const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                        relBases[unit] += c
                        is[unit]+=2
                        break
                    }
                    default: {
                        throw i
                    }
                }
            }

            
        }
    }

    function getVal(i: number, mode: number, unit: number) {
        switch (mode) {
            case 0: {
                return lists[unit][lists[unit][i]]
            }
            case 1: {
                return lists[unit][i]
            }
            case 2: {
                return lists[unit][lists[unit][i]+relBases[unit]]
            }
            default:
                throw "unknown Mode"
        }
    }

    function getGoalIndex(i: number, mode: number, unit: number) {
        switch (mode) {
            case 0: {
                return lists[unit][i]
            }
            case 1: {
                throw "not supported"
            }
            case 2: {
                return lists[unit][i]+relBases[unit]
            }
            default:
                throw "unknown Mode"
        }
    }

    function getAtDigit(num: number, digit: number) {
        return Math.floor(num / digit) % 10
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const _list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => _list[idx] = i)

    const lists: Record<number, number>[] = Array.from({length:50}, () => JSON.parse(JSON.stringify(_list)))
    const is: number[] = Array.from({length: 50}, () => 0)
    const relBases: number[] = Array.from({length: 50}, () => 0)
    const inputs: Queue<number>[] = Array.from({length: 50}, () => new Queue<number>())
    const outputs: number[][] = Array.from({length: 50}, () => [])  
    let NAT = [-1, -1]
    let lastNumbers = new Set<number>()

    for (let unit = 0; unit < 50; unit++) {
        inputs[unit].push(unit)
    }


    while (true) {
        let successfullIO = false
        for (let unit = 0; unit < 50; unit++) {
            let breakOuter = false;
            if(lists[unit][is[unit]] != 99) {
                while (!breakOuter) {
                    const i = is[unit]
                    const op = lists[unit][i] % 100
                    switch (op) {
                        case 1: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                            lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c + b
                            is[unit]+=4
                            break
                            
                        }
                        case 2: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                            lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c * b
                            is[unit]+=4
                            break
                        }
                        case 3: {
                            if(inputs[unit].isEmpty()) {
                                lists[unit][getGoalIndex(i+1, getAtDigit(lists[unit][i], 100), unit)] = -1
                                breakOuter = true
                            } else {
                                lists[unit][getGoalIndex(i+1, getAtDigit(lists[unit][i], 100), unit)] = inputs[unit].pop()
                                successfullIO = true
                            }
                            is[unit] += 2
                            break
                        }
                        case 4: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            outputs[unit].push(c)
                            if (outputs[unit].length == 3) {
                                const goal = outputs[unit][0]
                                const x = outputs[unit][1]
                                const y = outputs[unit][2]
                                outputs[unit] = []
                                if (goal == 255) {
                                    NAT = [x,y]
                                } else {
                                    inputs[goal].push(x)
                                    inputs[goal].push(y)
                                }
                            }
                            successfullIO = true
                            is[unit] += 2
                            break
                        }
                        case 5: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                            if (c != 0) {
                                is[unit] = b
                            } else {
                                is[unit] += 3
                            }
                            break
                        }
                        case 6: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                            if (c == 0) {
                                is[unit] = b
                            } else {
                                is[unit] += 3
                            }
                            break
                        }
                        case 7: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                            lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c < b ? 1:0
                            is[unit] += 4
                            break
                        }
                        case 8: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            const b = getVal(i+2, getAtDigit(lists[unit][i], 1000), unit)
                            lists[unit][getGoalIndex(i+3, getAtDigit(lists[unit][i], 10000), unit)] = c == b ? 1:0
                            is[unit] += 4
                            break
                        }
                        case 9: {
                            const c = getVal(i+1, getAtDigit(lists[unit][i], 100), unit)
                            relBases[unit] += c
                            is[unit]+=2
                            break
                        }
                        default: {
                            throw `${unit} ${i} ${lists[unit][i]}`
                        }
                    }
                }
            }
        }

        if (!successfullIO) {
            if (lastNumbers.has(NAT[1])) {
                console.log(NAT[1])
                return
            }
            lastNumbers.add(NAT[1])
            inputs[0].push(NAT[0])
            inputs[0].push(NAT[1])

        }
    }

    function getVal(i: number, mode: number, unit: number) {
        switch (mode) {
            case 0: {
                return lists[unit][lists[unit][i]]
            }
            case 1: {
                return lists[unit][i]
            }
            case 2: {
                return lists[unit][lists[unit][i]+relBases[unit]]
            }
            default:
                throw "unknown Mode"
        }
    }

    function getGoalIndex(i: number, mode: number, unit: number) {
        switch (mode) {
            case 0: {
                return lists[unit][i]
            }
            case 1: {
                throw "not supported"
            }
            case 2: {
                return lists[unit][i]+relBases[unit]
            }
            default:
                throw "unknown Mode"
        }
    }

    function getAtDigit(num: number, digit: number) {
        return Math.floor(num / digit) % 10
    }
}