export async function taskOne(input: string[]): Promise<void> {
    const cardKey = Number(input[0])
    const doorKey = Number(input[1])
    let cardLoop = 0
    let v = 1
    while(v != cardKey) {
        v *= 7
        v %= 20201227
        cardLoop++
    }
    v = 1
    for (let i = 0; i < cardLoop; i++) {
        v *= doorKey
        v %= 20201227
    }
    console.log(v)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}