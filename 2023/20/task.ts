export async function taskOne(input: string[]): Promise<void> {
    const g: Record<string, Node> = {}
    input.map(parseRow).forEach(([s,n]) => {
        g[s] = n
    })
    Object.keys(g).forEach(i => {
        Object.keys(g).forEach(j => {
            if (g[j].outs.includes(i)) g[i].ins.push(j)
        })
    })
    let i = 0
    let hs = 0
    let ls = 0
    const keys = Object.keys(g)
    while (i < 1000) {
        const [_h, _l, _s] = execute(g)
        hs += _h
        ls += _l
        let init = true
        for (const i of keys) {
            if (!g[i].isInit()) {
                init = false
                break
            }
        }
        i++
        if (init) break;
    }
    const runs = Math.floor(1000/i)
    i *= runs
    hs *= runs
    ls *= runs
    while (i < 1000) {
        const [_h, _l] = execute(g)
        hs += _h
        ls += _l
        i++
    }
    console.log(hs*ls)
}

export async function taskTwo(input: string[]): Promise<void> {
    const g: Record<string, Node> = {}
    input.map(parseRow).forEach(([s,n]) => {
        g[s] = n
    })
    Object.keys(g).forEach(i => {
        Object.keys(g).forEach(j => {
            if (g[j].outs.includes(i)) g[i].ins.push(j)
        })
    })
    let i = 0
    let found = false
}

type Signal = 'H'|'L'|'N'

abstract class Node {
    ins: string[] = []
    outs: string[] = []

    abstract getResult(input:Signal, source: string): Signal

    abstract isInit(): boolean
}

class FlipFlop extends Node {

    private state: boolean = false

    getResult(input: Signal, source: string): Signal {
        if (input == 'L') {
            this.state = !this.state
            return this.state ? 'H':'L'
        }
        return 'N'
    }

    isInit(): boolean {
        return !this.state
    }

}

class Conju extends Node {
    private memory: Map<string, Signal> = new Map()
    getResult(input: Signal, source: string): Signal {
        this.memory.set(source, input)
        if (this.memory.size < this.ins.length) {
            return 'H'
        }
        let acc = true
        for (const v of this.memory.values()) {
            if (v == 'L') {
                acc = false
                break
            }
        }
        return acc ? 'L':'H'
    }

    isInit(): boolean {
        let acc = true
        for (const v of this.memory.values()) {
            if (v == 'L') {
                acc = false
                break
            }
        }
        return !acc
    }

}

class Broad extends Node {
    getResult(input: Signal, source: string): Signal {
        return input
    }
    isInit(): boolean {
        return true
    }
    
}

function parseRow(s: string): [string, Node] {
    if (s.startsWith('broadcaster')) {
        const dest = s.split('->')[1].split(',').map(i => i.trim())
        const n = new Broad()
        n.outs.push(...dest)
        return ['broadcaster', n]
    }
    const r = /(&|%)([^ ]+) -> (.+)/.exec(s)
    if (r == null) throw s
    const name = r[2]
    const dest = r[3].split(',').map(i => i.trim())
    if (r[1] == '&') {
        const n = new Conju()
        n.outs.push(...dest)
        return [name, n]
    } else {
        const n = new FlipFlop()
        n.outs.push(...dest)
        return [name, n]
    }
}

function execute(nodes: Record<string, Node>): [number, number] {
    const queue: [string, Signal, string][] = [...nodes['broadcaster'].outs.map(i => [i, 'L', 'broadcaster'])] as [string, Signal, string][]
    let hs = 0
    let ls = queue.length + 1
    while(queue.length>0) {
        const q = queue.shift() as [string, Signal, string]
        if (nodes[q[0]] == undefined) continue
        const s = nodes[q[0]].getResult(q[1], q[2])
        if (s == 'N') continue
        if (s == 'H') hs += nodes[q[0]].outs.length
        if (s == 'L') ls += nodes[q[0]].outs.length
        queue.push(...(nodes[q[0]].outs.map(i => [i, s, q[0]]) as [string, Signal, string][]))
    }
    return [hs, ls,]
}