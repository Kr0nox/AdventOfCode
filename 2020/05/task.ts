export async function taskOne(input: string[]): Promise<void> {
    let max = 0
    for (const i of input) {
        const v = getRow(i)*8+getSeat(i)
        if(v > max) max =v
    }
    console.log(max)
}

export async function taskTwo(input: string[]): Promise<void> {
    const seats = new Set<number>()
    let MAX = 128*8
    for (const i of input) {
        const v = getRow(i)*8+getSeat(i)
        seats.add(v)
    }
    for (let i = 0; i < MAX; i++) {
        if (!seats.has(i) && seats.has(i+1) && seats.has(i-1)) console.log(i)
    }
}

function getRow(s: string) {
    const mults = [64,32,16,8,4,2,1]
    let c = 0
    for (let i = 0; i < mults.length; i++) {
        if (s[i] == 'B') c += mults[i]
    }
    return c
}

function getSeat(s: string) {
    const mults = [4,2,1]
    let c = 0;
    for (let i = 0; i < mults.length; i++) {
        if (s[i+7] == 'R') c += mults[i]
    }
    return c
}