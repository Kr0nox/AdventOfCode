export async function taskOne(input: string[]): Promise<void> {
    let i = 0
    let acc = 0
    const V = new Set<number>()

    while(!V.has(i)) {
        V.add(i)

        const parts = input[i].split(' ')
        const n = Number(parts[1])
        if (parts[0] == 'acc') {
            acc += n
        } else if (parts[0] == 'jmp') {
            i += n - 1
        } else if (parts[0] == 'nop') {} else {
            throw i + " | " + input[i]
        }

        i++
    }
    console.log(acc)
}

export async function taskTwo(input: string[]): Promise<void> {
    for (let changeI = 0; changeI < input.length; changeI++) {
        if (input[changeI].startsWith('acc')) continue

        let acc = 0
        let i = 0
        const V = new Set<number>()
        while(!V.has(i) && i < input.length) {
            V.add(i)

            const parts = input[i].split(' ')
            const n = Number(parts[1])
            if (i == changeI) {
                if (parts[0] == 'nop') {
                    i += n - 1
                } else if (parts[0] == 'jmp') {} else {
                    throw i
                }
            } else if (parts[0] == 'acc') {
                acc += n
            } else if (parts[0] == 'jmp') {
                i += n - 1
            } else if (parts[0] == 'nop') {} else {
                throw i + " | " + input[i]
            }

            i++
        }
        if (i >= input.length) {
            console.log(acc)
        }
    }
}
