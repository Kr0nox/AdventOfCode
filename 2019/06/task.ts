import { Queue } from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const parent: Record<string, string> = {}
    const nodes: Set<string> = new Set()
    const depths: Record<string, number> = {}
    depths['COM'] = 0
    for (const i of input) {
        const p = i.split(')')
        parent[p[1]] = p[0]
        nodes.add(p[0])
        nodes.add(p[1])
    }

    let sum = 0
    for (const n of nodes) {
        sum += getDistance(n)
    }

    console.log(sum)

    function getDistance(node: string): number {
        if (depths[node] != undefined) return depths[node]
        const d = getDistance(parent[node]) + 1
        depths[node] = d
        return d
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const graph: Record<string, string[]> = {}
    let S = ''
    let G = ''
    for (const i of input) {
        const p = i.split(')')
        if(graph[p[0]] == undefined) graph[p[0]] = []
        if(graph[p[1]] == undefined) graph[p[1]] = []
        graph[p[0]].push(p[1])
        graph[p[1]].push(p[0])
        if (p[1] == 'YOU') S = p[0]
        if (p[1] == 'SAN') G = p[0]
    }

    const Q = new Queue<[string, number]>()
    const V = new Set<string>()
    Q.push([S,0])
    while(!Q.isEmpty()) {
        const q = Q.pop()
        if (q[0] == G) {
            console.log(q[1])
            return
        }
        if (V.has(q[0])) continue
        V.add(q[0])
        for (const n of graph[q[0]]) {
            Q.push([n, q[1]+1])
        }
    }
}