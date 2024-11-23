export async function taskOne(input: string[]): Promise<void> {
    const inNums = input[0].split(',').map(Number)
    const lastSeen = new Map<number, number>()
    let lastNumber = inNums[0]

    for(let i = 1; i < inNums.length; i++) {
        lastSeen.set(lastNumber, i)
        lastNumber = inNums[i]
    }
    let i = inNums.length
    while (i < 2020) {
        let said = 0
        if (lastSeen.has(lastNumber)) {
            said = i - lastSeen.get(lastNumber)!
        }
        lastSeen.set(lastNumber, i)
        lastNumber = said
        i++
    }
    console.log(lastNumber)
}

export async function taskTwo(input: string[]): Promise<void> {
    const inNums = input[0].split(',').map(Number)
    const lastSeen = new Map<number, number>()
    let lastNumber = inNums[0]

    for(let i = 1; i < inNums.length; i++) {
        lastSeen.set(lastNumber, i)
        lastNumber = inNums[i]
    }
    let i = inNums.length
    while (i < 30000000) {
        let said = 0
        if (lastSeen.has(lastNumber)) {
            said = i - lastSeen.get(lastNumber)!
        }
        lastSeen.set(lastNumber, i)
        lastNumber = said
        i++
    }
    console.log(lastNumber)
}