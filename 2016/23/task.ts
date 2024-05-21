let registers: Record<string, number>

export async function taskOne(input: string[]): Promise<void> {
    registers = {'a':7, 'b':0, 'c':0, 'd':0}
    task(input)
}

export async function taskTwo(input: string[]): Promise<void> {
    registers = {'a':12, 'b':0, 'c':0, 'd':0}
    task(input)
}

function task(_input: string[]) {
/*
    for (let i = 0; i < _input.length; i++) {
        if (/jnz (a|b|c|d) -5/.test(_input[i])) {
            _input[i-]
        }
    }*/

    const input = _input.filter(i => i != '')
    let i = 0
    

    while(i < input.length) {
        loopCheck1()
        doIns(input[i])
    }
    console.log(registers['a'])

    function doIns(ins: string) {
        let r = /inc (a|b|c|d)/.exec(ins)
        if (r) {
            registers[r[1]]++
            i++
            return
        }
        r = /dec (a|b|c|d)/.exec(ins)
        if (r) {
            registers[r[1]]--
            i++
            return
        }
        r = /jnz (a|b|c|d|-?[0-9]+) (-?[0-9]+|a|b|c|d)/.exec(ins)
        if(r) {
            let j = 0
            if (/-?[0-9]+/.test(r[2])) j = parseInt(r[2])
            else j = registers[r[2]]
            let t = 0
            if (/-?[0-9]+/.test(r[1])) t = parseInt(r[1])
            else t = registers[r[1]]
            if (t != 0) i += j
            else i++
            return
        }
        r = /cpy (-?[0-9]+|a|b|c|d) (a|b|c|d)/.exec(ins)
        if (r) {
            if (/-?[0-9]+/.test(r[1])) registers[r[2]] = parseInt(r[1])
            else registers[r[2]] = registers[r[1]]
            i++
            return
        }
        if (ins.startsWith('cpy')) {
            i++
            return
        }
        r = /tgl ([0-9]+|a|b|c|d)/.exec(ins)
        if (r) {
            let j = i
            if (/-?[0-9]+/.test(r[1])) j += parseInt(r[1])
            else j += registers[r[1]]
            if (j < input.length) {
                const argsCount = input[j].split(' ').length-1
                if (argsCount == 1) {
                    if (input[j].startsWith('inc')) input[j] = 'dec' + input[j].substring(3)
                    else input[j] = 'inc' + input[j].substring(3)
                } else if (argsCount == 2) {
                    if (input[j].startsWith('jnz')) input[j] = 'cpy' + input[j].substring(3)
                    else input[j] = 'jnz' + input[j].substring(3)
                } else {
                    throw "Could not toggle"
                }
            }
            i++
            return
             
        }
        r = /add (a|b|c|d) (a|b|c|d) (a|b|c|d)/.exec(ins)
        if (r) {
            registers[r[3]] += Math.abs(registers[r[1]]) * Math.abs(registers[r[2]])
            i++
            return
        }
        if (ins == 'blk') {
            i++
            return
        }
        throw ins
    }

    function loopCheck1() {
        if (i+5 >= input.length) return
        if (!/jnz . -5/.test(input[i+5])) return
        if (!input[i].startsWith('cpy')) return
        if (!/jnz . -2/.test(input[i+3])) return
        if (!input[i+1].startsWith('inc') && !input[i+1].startsWith('dec')) return
        if (!input[i+2].startsWith('inc') && !input[i+2].startsWith('dec')) return
        if (!input[i+4].startsWith('inc') && !input[i+4].startsWith('dec')) return

        const loopVar1 = input[i+3][4]
        const loopVar2 = input[i+5][4]
        const setVar = input.slice(i+1, i+3).map(i => i[4]).filter(i => i!=loopVar1)[0]
        console.log(i, loopVar1, loopVar2, setVar)
        input[i+1] = `add ${loopVar1} ${loopVar2} ${setVar}`
        input[i+2] = `cpy 0 ${loopVar1}`
        input[i+3] = `cpy 0 ${loopVar2}`
        input[i+4] = 'blk'
        input[i+5] = 'blk'
    }
}