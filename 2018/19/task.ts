export async function taskOne(input: string[]): Promise<void> {
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
    while(reg[iR] < coms.length) {
        reg = execute(reg, coms[reg[iR]])
        reg[iR]++
        if(reg[0] == 1)
        console.log(reg)
    }
    console.log(reg[0])
}

export async function taskTwo(input: string[]): Promise<void> {
    const reg = [1,0,0,0,0,0]
    const iR = Number(input[0].split(' ')[1])
    while (reg[iR] < 36) {
        switch (reg[iR]) {
            case 0:
                reg[3] += 16
                break;
            case 1: 
                reg[5] = 1
                while(true) {
                    reg[4] = reg[1]+1
                    const div = reg[1] / reg[5]
                    if (reg[1] % reg[5] == 0 && div <= reg[1]) {
                        reg[0] += reg[5]
                    }
                    reg[5]++
                    if (reg[5] > reg[1]) {
                        reg[2] = 0
                        break
                    }
                    reg[2] = 1
                }
                reg[3] = 15
                break
            case 16:
                reg[3] *= reg[3]
                break;
            case 17:
                reg[1] += 2
                break;
            case 18:
                reg[1] *= reg[1]
                break;
            case 19:
                reg[1] *= reg[3]
                break;
            case 20:
                reg[1] *= 11
                break;
            case 21:
                reg[2] += 2
                break;
            case 22:
                reg[2] *= reg[3]
                break;
            case 23:
                reg[2] += 20
                break;
            case 24:
                reg[1] += reg[2]
                break;
            case 25:
                reg[3] += reg[0]
                break;
            case 26:
                reg[3] = 0
                break;
            case 27:
                reg[2] = reg[3]
                break;
            case 28:
                reg[2] *= reg[3]
                break;
            case 29:
                reg[2] += reg[3]
                break;
            case 30:
                reg[2] *= reg[3]
                break;
            case 31:
                reg[2] *= 14
                break;
            case 32:
                reg[2] *= reg[3]
                break;
            case 33:
                reg[1] += reg[2]
                break;
            case 34:
                reg[0] = 0
                break;
            case 35:
                reg[3] = 0
                break;
            default:
                throw reg[iR]
                break
        }
        reg[iR]++
    }
    console.log(reg[0])
    
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