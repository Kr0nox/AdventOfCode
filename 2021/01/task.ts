export async function taskOne(input: string[]): Promise<void> {
    const inp = input.map(i => parseInt(i.trim()))
    let sum = 0
    for (let i = 1; i < inp.length; i++) {
        if (inp[i] > inp[i-1]) sum++
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const inp = input.map(i => parseInt(i.trim()))
    let sum = 0
    let A = inp[0]+inp[1]+inp[2]
    let B = inp[1]+inp[2]+inp[3]
    for (let i = 0; i < inp.length - 4; i++) {
        if (A < B) sum++
        A -= inp[i] 
        A += inp[i+3]
        B -= inp[i+1]
        B += inp[i+4]
    }
    if (A < B) sum++
    console.log(sum)
}