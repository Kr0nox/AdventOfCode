export async function taskOne(input: string[]): Promise<void> {
    const registers: Record<string, number> = {}

    for (const i of input) {
        let s = i.split(' ')
        registers[s[0]] = 0
    }

    for (const i of input) {
        let r = /([a-z]+) (inc|dec) (-?[0-9]+) if ([a-z]+) (>|<|>=|<=|!=|==) (-?[0-9]+)/.exec(i)
        if (!r) throw i
        let checkIns = r[5]
        let checkReg = r[4]
        let checkVal = parseInt(r[6])
        let pass = false
        switch(checkIns) {
            case '>':
                pass = registers[checkReg] > checkVal
                break
            case '>=':
                pass = registers[checkReg] >= checkVal
                break
            case '<':
                pass = registers[checkReg] < checkVal
                break
            case '<=':
                pass = registers[checkReg] <= checkVal
                break
            case '!=':
                pass = registers[checkReg] != checkVal
                break
            case '==':
                pass = registers[checkReg] == checkVal
                break
        }
        if (!pass) {
            continue
        }
        registers[r[1]] = registers[r[1]] + parseInt(r[3]) * (r[2] == 'inc' ? 1:-1)
    }

    console.log(Math.max(...Object.values(registers)))
}

export async function taskTwo(input: string[]): Promise<void> {
    const registers: Record<string, number> = {}
    let max = 0

    for (const i of input) {
        let s = i.split(' ')
        registers[s[0]] = 0
    }

    for (const i of input) {
        let r = /([a-z]+) (inc|dec) (-?[0-9]+) if ([a-z]+) (>|<|>=|<=|!=|==) (-?[0-9]+)/.exec(i)
        if (!r) throw i
        let checkIns = r[5]
        let checkReg = r[4]
        let checkVal = parseInt(r[6])
        let pass = false
        switch(checkIns) {
            case '>':
                pass = registers[checkReg] > checkVal
                break
            case '>=':
                pass = registers[checkReg] >= checkVal
                break
            case '<':
                pass = registers[checkReg] < checkVal
                break
            case '<=':
                pass = registers[checkReg] <= checkVal
                break
            case '!=':
                pass = registers[checkReg] != checkVal
                break
            case '==':
                pass = registers[checkReg] == checkVal
                break
        }
        if (!pass) {
            continue
        }
        registers[r[1]] = registers[r[1]] + parseInt(r[3]) * (r[2] == 'inc' ? 1:-1)
        if (registers[r[1]] > max) max = registers[r[1]]
    }

    console.log(max)
}