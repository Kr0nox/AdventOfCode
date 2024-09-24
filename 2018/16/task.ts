export async function taskOne(input: string[]): Promise<void> {
    let i = 0;
    const instructions: BeforeAfter[] = []
    while(input[i].startsWith('Before')) {
        instructions.push({
            before: JSON.parse(input[i].substring(8)),
            command: input[i+1].split(' ').map(Number),
            after: JSON.parse(input[i+2].substring(8))
        })
        i += 4
    }   

    console.log(instructions.map(i => getOptions(i).length).filter(i => i>=3).length)

}

export async function taskTwo(input: string[]): Promise<void> {
    let i = 0;
    const bfs: BeforeAfter[] = []
    while(input[i].startsWith('Before')) {
        bfs.push({
            before: JSON.parse(input[i].substring(8)),
            command: input[i+1].split(' ').map(Number),
            after: JSON.parse(input[i+2].substring(8))
        })
        i += 4
    } 
    const options: Record<number, string[]> = {}
    for (let j = 0; j < 16; j++) {
        options[j] = commands
    }
    for (const bf of bfs) {
        const r = getOptions(bf)
        options[bf.command[0]] = getIntersection(r, options[bf.command[0]])
    }
    const reverseOptions: Record<string, number[]> = {}
    for (const c of commands) {
        reverseOptions[c] = []
    }
    for (let j = 0; j < 16; j++) {
        for (const c of options[j]) {
            reverseOptions[c].push(j)
        }
    }
    const finalMapping: Record<number, string> = {}
    while(Object.keys(finalMapping).length != 16) {
        let found = false
        do {
            found = false
            for (const c of commands) {
                if (reverseOptions[c].length == 1) {
                    finalMapping[reverseOptions[c][0]] = c
                    removeFromOldMapping(c, reverseOptions[c][0])
                    found = true
                }
            }
        } while(found);
    }

    while(input[i].trim() == '') i++
    let registers = [0,0,0,0]
    while(i < input.length) {
        const com = input[i].split(' ').map(Number)
        registers = execute(registers, {
            ins: finalMapping[com[0]],
            a: com[1],
            b: com[2],
            c: com[3]
        })
        i++
    }
    console.log(registers[0])

    function removeFromOldMapping(com: string, num: number) {
        for (const c of commands) {
            const idx = reverseOptions[c].indexOf(num)
            if (idx != -1) {
                reverseOptions[c].splice(idx, 1)
            }
        }
        for (let j = 0; j < 16; j++) {
            const idx = options[j].indexOf(com)
            if (idx != -1) {
                options[j].splice(idx, 1)
            }
        }
    }
}

interface BeforeAfter {
    before: number[]
    command: number[]
    after: number[]
}

interface Command {
    ins: string,
    a: number,
    b: number,
    c: number
}

const commands = ['addr', 'addi', 'mulr', 'muli', 'banr', 'bani', 'borr', 'bori', 'setr', 'seti', 
'gtir', 'gtri', 'gtrr', 'eqir', 'eqri', 'eqrr']

function getOptions(bf: BeforeAfter) {
    const results: string[] = []
    for (const c of commands) {
        const r = execute(bf.before, {ins: c, a: bf.command[1], b: bf.command[2], c: bf.command[3]})
        let matches = true
        for (let i = 0; i < r.length; i++) {
            if (r[i] != bf.after[i]) {
                matches = false
                break
            }
        }
        if (matches) results.push(c)
    }
    return results
}

function getIntersection(a: string[], b: string[]) {
    return a.filter(i => b.indexOf(i) != -1)
}

function execute(input: number[], c: Command) {
    const output = [input[0], input[1], input[2], input[3]]
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