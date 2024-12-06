export async function taskOne(input: string[]): Promise<void> {
    const coms: Command[] = []
    const iR = Number(input[0].split(' ')[1])
    for (let i = 1; i < 29; i++) {
        const s = input[i].split(' ')
        coms.push({
            ins: s[0], 
            a: Number(s[1]),
            b: Number(s[2]),
            c: Number(s[3])
        })
    }

    let reg = [0,0,0,0,0,0]
    while(reg[iR] < coms.length) {
        reg = execute(reg, coms[reg[iR]])
        reg[iR]++
    }
    // specific to my input
    console.log(reg[1])
}

export async function taskTwo(input: string[]): Promise<void> {
    const coms: Command[] = []
    const iR = Number(input[0].split(' ')[1])
    for (let i = 1; i < input.length; i++) {
        const s = input[i].split(' ')
        coms.push({
            ins: s[0], 
            a: Number(s[1]),
            b: Number(s[2]),
            c: Number(s[3])
        })
    }


    let reg = [0,0,0,0,0,0]
    let last = 0
    const seen = new Set<number>()
    while(reg[iR] < coms.length) {
        if (reg[iR] == 28) {
            if (registerRegs()) {
                break
            }
            if (last != reg[1]) last = reg[1]
        }

        reg = execute(reg, coms[reg[iR]])
        reg[iR]++
    }
    console.log(last)


    function registerRegs() {
        const k = reg[1]
        if (seen.has(k)) return true
        seen.add(k)
        return false
    }
}

function execute(input: number[], c: Command) {
    const output = [input[0], input[1], input[2], input[3], input[4], input[5]]
    function get(x: number, i: boolean) {
        if (i) return x
        return input[x]
    }
    if (c.ins.startsWith('gt') || c.ins.startsWith('eq')) {
        const aI = c.ins[2] == 'i'
        const bI = c.ins[3] == 'i'
        const a = get(c.a, aI)
        const b = get(c.b, bI)
        let cond = false
        if (c.ins.startsWith('gt')) {
            cond = a > b
        } else {
            cond = a == b
        }
        output[c.c] = cond ? 1 : 0
    } else if (c.ins.startsWith("set")) {
        const isI = c.ins[3] == 'i'
        const a = get(c.a, isI)
        output[c.c] = a
    } else {
        const isI = c.ins[3] == 'i'
        const a = get(c.a, false)
        const b = get(c.b, isI)
        let out = 0
        switch(c.ins.substring(0,3)) {
            case 'add':
                out = a+b
                break
            case 'mul':
                out = a*b
                break;
            case 'ban':
                out = a&b
                break
            case 'bor':
                out = a|b
                break
        }
        output[c.c] = out 
    }
    return output
}

interface Command {
    ins: string,
    a: number,
    b: number,
    c: number
}