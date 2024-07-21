export async function taskOne(input: string[]): Promise<void> {
    const nums = input.map(i => i.split(': ').map(Number))
    let sum = 0;
    for (const n of nums) {
        if ((n[0] % (n[1]*2-2)) == 0) {
            sum += n[1] * n[0]
        }
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input.map(i => i.split(': ').map(Number))
    let i = 0
    while (true) {
        let passed = true
        for (const n of nums) {
            if (((n[0] + i) % (n[1]*2-2)) == 0) {
                passed = false
                break;
            }
        }
        if (passed) break
        i++
        continue
    }
    console.log(i)
    
}
