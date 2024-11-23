export async function taskOne(input: string[]): Promise<void> {
    let memory: Record<number, number> = {}
    let mask = ""
    for (const i of input) {
        if (i.startsWith('mask')) {
            mask = i.split(' = ')[1]
        } else {
            const r = /mem\[([0-9]+)\] = ([0-9]+)/.exec(i)!
            memory[Number(r[1])] = applyMask(Number(r[2]))
        }
    }

    console.log(Object.keys(memory).map(k => memory[Number(k)]).reduce((a,b) => a+b, 0))

    function applyMask(n: number) {
        let r = dec2bin(n).split('')
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] == "1") r[i] = "1"
            if (mask[i] == "0") r[i] = "0"
        }
        return parseInt(r.join(''), 2)
    } 
}

export async function taskTwo(input: string[]): Promise<void> {
    let memory: Map<number, number> = new Map()
    let mask = ""
    for (const i of input) {
        if (i.startsWith('mask')) {
            mask = i.split(' = ')[1]
        } else {
            const r = /mem\[([0-9]+)\] = ([0-9]+)/.exec(i)!
            const mems = applyMask(Number(r[1]))
            const n = Number(r[2])
            mems.forEach(i => memory.set(i,n))
        }
    }

    let c = 0
    for (const v of memory) {
        c += v[1]
    }
    console.log(c)

    function applyMask(n: number) {
        let r = dec2bin(n).split('')
        for (let i = 0; i < mask.length; i++) {
            if (mask[i] == "1") r[i] = "1"
            if (mask[i] == "X") r[i] = "X"
        }
        let options = [r]
        for (let i = 0; i < mask.length; i++) {
            if (r[i] != 'X') continue
            let newOptions = [] as string[][]
            for (const o of options) {
                const c1 = Array.from(o)
                const c2 = Array.from(o)
                c1[i] = "1"
                c2[i] = "0"
                newOptions.push(c1)
                newOptions.push(c2)
            }
            options = newOptions
        }
        return options.map(i=> parseInt(i.join(''),2))
    }
}





function dec2bin(dec: number) {
    const l = (dec >>> 0).toString(2);
    return "0".repeat(36-l.length) + l
}