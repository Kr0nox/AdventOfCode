import {JsonSet} from '../../base/simpleStructure'
let registers: Record<string, number>


export async function taskOne(input: string[]): Promise<void> {
    let i = 1
   while(true) {
        registers = {'a':i, 'b':0, 'c':0, 'd':0}
        if (task(input)) {
            console.log(i)
            return
        }

        i++
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    
}

function task(input: string[]): boolean {
    interface State {
        r: Record<string, number>
        i: number
    }
    const set: JsonSet<State> = new JsonSet()
    let i = 0
    let lastOut = -1
    let firstOut = -1
    while(i < input.length) {
        if (set.has({r: registers, i})) {
            if (lastOut != firstOut) return true
            else return false
        }
        set.add({r: registers, i})
        loopCheck1()
        if (!doIns(input[i])) return false
    }
    return false

    function doIns(ins: string): boolean {
        let r = /inc (a|b|c|d)/.exec(ins)
        if (r) {
            registers[r[1]]++
            i++
            return true
        }
        r = /dec (a|b|c|d)/.exec(ins)
        if (r) {
            registers[r[1]]--
            i++
            return true
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
            return true
        }
        r = /cpy (-?[0-9]+|a|b|c|d) (a|b|c|d)/.exec(ins)
        if (r) {
            if (/-?[0-9]+/.test(r[1])) registers[r[2]] = parseInt(r[1])
            else registers[r[2]] = registers[r[1]]
            i++
            return true
        }
        r = /add (a|b|c|d) (a|b|c|d) (a|b|c|d)/.exec(ins)
        if (r) {
            registers[r[3]] += Math.abs(registers[r[1]]) * Math.abs(registers[r[2]])
            i++
            return true
        }
        if (ins == 'blk') {
            i++
            return true
        }
        r = /out (.)/.exec(ins)
        if (r) {
            let t = registers[r[1]]

            //console.log('out',t, registers)
            if (t != 0 && t != 1) return false
            if (t == lastOut) return false
            if (firstOut < 0) firstOut = t
            lastOut = t
            i++
            return true
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
        input[i+1] = `add ${loopVar1} ${loopVar2} ${setVar}`
        input[i+2] = `cpy 0 ${loopVar1}`
        input[i+3] = `cpy 0 ${loopVar2}`
        input[i+4] = 'blk'
        input[i+5] = 'blk'
    }
}