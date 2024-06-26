export async function taskOne(_input: string[]): Promise<void> {
    let jumps = 0
    let i = 0
    const input = _input.map(Number)
    while (i < input.length) {
        let j = i
        i += input[i]
        input[j]++
        jumps++
    }
    console.log(jumps)
}

export async function taskTwo(_input: string[]): Promise<void> {
    let jumps = 0
    let i = 0
    const input = _input.map(Number)
    while (i < input.length) {
        let j = i
        i += input[i]
        if (input[j] >= 3) input[j]--
        else input[j]++
        
        jumps++
    }
    console.log(jumps)
}