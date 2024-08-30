export async function taskOne(input: string[]): Promise<void> {
    console.log(input.map(Number).reduce((a,b)=>a+b,0));
}

export async function taskTwo(_input: string[]): Promise<void> {
    const S: Set<number> = new Set()
    const input = _input.map(Number)

    let f = 0
    let i = 0
    while(!S.has(f)) {
        S.add(f)
        f += input[i%input.length]
        i++
    }
    console.log(f)
}