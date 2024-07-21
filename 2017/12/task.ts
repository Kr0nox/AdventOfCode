export async function taskOne(input: string[]): Promise<void> {
    const graph: Record<string, string[]> = {}
    input.forEach(i => {
        const r = /([0-9]+) <-> (.*)/.exec(i)!
        graph[r[1]] = r[2].split(', ')
    })

    const V = new Set<string>()
    const Q = ['0']
    while(Q.length > 0) {
        const q = Q.pop() as string
        if (V.has(q)) continue;
        V.add(q)
        Q.push(...graph[q])
    }
    console.log(V.size)
}

export async function taskTwo(input: string[]): Promise<void> {
    const graph: Record<string, string[]> = {}
    input.forEach(i => {
        const r = /([0-9]+) <-> (.*)/.exec(i)!
        graph[r[1]] = r[2].split(', ')
    })

    const V = new Set<string>()
    const Q = [] as string[]
    const keys = Object.keys(graph)
    let groupCount = 0;
    for (const k of keys) {
        if (V.has(k)) continue
        groupCount++
        Q.push(k)
        while(Q.length > 0) {
            const q = Q.pop() as string
            if (V.has(q)) continue;
            V.add(q)
            Q.push(...graph[q])
        }
    }
    
    console.log(groupCount)
}