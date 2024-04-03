const MASK = 0xFFFF
let n: Record<string, number> = {}

export async function taskOne(input: string[]): Promise<void> {
    const tasks: [string, boolean][] = input.map(i => [i, false])
    let done = 0;
    let i = 0
    while (done < input.length) {
        if (tasks[i][1]) {
            i++
            i %= input.length
            continue;
        }
        if (process(tasks[i][0])) {
            tasks[i][1] = true
            done++
        }

        i++
        i %= input.length
    }
    console.log(n['a'])
}

export async function taskTwo(input: string[]): Promise<void> {
    let tasks: [string, number][] = input.map(i => [i, 0])
    let done = 0;
    let i = 0
    while (done < input.length) {
        if (tasks[i][1] > 0) {
            i++
            i %= input.length
            continue;
        }
        if (process(tasks[i][0])) {
            tasks[i][1] = 1
            done++
        }

        i++
        i %= input.length
    }
    tasks = tasks.filter(([i,_]) => !i.endsWith('-> b'))
    const b = n['a']
    n = {}
    n['b'] = b
    done = 0;
    i = 0
    while (done < tasks.length) {
        if (tasks[i][1] > 1) {
            i++
            i %= tasks.length
            continue;
        }
        if (process(tasks[i][0])) {
            tasks[i][1] = 2
            done++
        }

        i++
        i %= tasks.length
    }
    console.log(n['a'])
}

function process(ins: string) {
    if (ins.includes('NOT')) {
        let r = m(/NOT ([a-z0-9]+) -> ([a-z]+)/,ins)
        if (!valid(r[1])) return false
        n[r[2]] = (~get(r[1])) & MASK
    } else if (ins.includes('AND')) {
        const r = m(/([a-z0-9]+) AND ([a-z0-9]+) -> ([a-z]+)/, ins)
        if (!valid(r[1]) || !valid(r[2])) return false
        n[r[3]] = get(r[1]) & get(r[2])
    } else if (ins.includes('OR')) {
        const r = m(/([^A]+) OR ([^-]+) -> ([a-z]+)/, ins)
        if (!valid(r[1]) || !valid(r[2])) return false
        n[r[3]] = get(r[1]) | get(r[2])
    } else if (ins.includes('LSHIFT')) {
        const r = m(/([a-z0-9]+) LSHIFT ([0-9]+) -> ([a-z]+)/, ins)
        if (!valid(r[1])) return false
        n[r[3]] =  (get(r[1]) << parseInt(r[2])) & MASK
    } else if (ins.includes('RSHIFT')) {
        const r = m(/([a-z0-9]+) RSHIFT ([0-9]+) -> ([a-z]+)/, ins)
        if (!valid(r[1])) return false
        n[r[3]] = get(r[1]) >> parseInt(r[2])
    } else {
        const r = m(/([a-z0-9]+) -> ([a-z]+)/, ins)
        if(!valid(r[1])) return false
        n[r[2]] = get(r[1])
    }
    return true
}

function valid(s: string) {
    return !isOp(s) || (n[s] != undefined) 
}

function get(s: string) {
    if (isOp(s)) return n[s]
    return parseInt(s)
}

function m(r: RegExp, t: string) {
    const re = r.exec(t)
    if (!re) throw t
    return re
}

function isOp(s: string) {
    return /[a-z]+/.test(s)
}