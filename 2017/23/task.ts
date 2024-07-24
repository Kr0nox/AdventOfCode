export async function taskOne(input: string[]): Promise<void> {
    const registers: Record<string, number> = {}
    for (const c of 'abcdefgh'.split('')) registers[c] = 0

    function get(val: string) {
        if (val.match(/[0-9-]+/)) {
            return parseInt(val)
        }
        return registers[val]
    }

    let i = 0
    let muls = 0
    while (i < input.length) {
        const ins = input[i].split(' ')
        switch(ins[0]) {
            case 'set':
                registers[ins[1]] = get(ins[2])
                break;
            case 'sub':
                registers[ins[1]] -= get(ins[2])
                break;
            case 'mul':
                registers[ins[1]] *= get(ins[2])
                muls++
                break;
            case 'jnz':
                if (get(ins[1]) != 0) {
                    i += get(ins[2]) - 1
                }
                break;
            default:
                throw input[i]
        }
        i++
    }
    console.log(muls)
}

export async function taskTwo(input: string[]): Promise<void> {
    const registers: Record<string, number> = {}
    for (const c of 'abcdefgh'.split('')) registers[c] = 0
    registers['a'] = 1
    registers['b'] = 67 * 100 + 100000
    registers['c'] = registers['b'] + 17000

    do {
        registers['f'] = 1
        registers['d'] = 2
        do {
            if (registers['b'] % registers['d'] == 0) {
                registers['f'] = 0
            }
            registers['e'] = registers['b']
            registers['d'] += 1
            registers['g'] = registers['d'] - registers['b']
    
        } while (registers['g'] != 0)
        
        if (registers['f'] == 0) {
            registers['h'] += 1
        }
        registers['g'] = registers['b'] - registers['c']
        registers['b'] += 17
    } while (registers['g'] != 0)
    

    console.log(registers['h'])
}