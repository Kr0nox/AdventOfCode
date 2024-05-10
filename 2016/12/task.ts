let registers: Record<string, number>

export async function taskOne(input: string[]): Promise<void> {
    registers = {'a':0, 'b':0, 'c':0, 'd':0}
    task(input)
}

export async function taskTwo(input: string[]): Promise<void> {
    registers = {'a':0, 'b':0, 'c':1, 'd':0}
    task(input)
}

function task(input: string[]) {
    let i = 0
    while(i < input.length) {
        doIns(input[i])
        //i++
        //console.log(i, registers)
    }
    console.log(registers['a'])

    function doIns(ins: string) {
        let r = /inc (.)/.exec(ins)
        if (r) {
            registers[r[1]]++
            i++
            return
        }
        r = /dec (.)/.exec(ins)
        if (r) {
            registers[r[1]]--
            i++
            return
        }
        r = /jnz (.) (-?[0-9]+)/.exec(ins)
        if(r) {
            if (registers[r[1]] != 0) i += parseInt(r[2])
            else i++
            return
        }
        r = /cpy (-?[0-9]+|.) (.)/.exec(ins)
        if (r) {
            if (/-?[0-9]+/.test(r[1])) registers[r[2]] = parseInt(r[1])
            else registers[r[2]] = registers[r[1]]
            i++
            return
        }
        throw ins
    }
}