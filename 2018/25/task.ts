export async function taskOne(input: string[]): Promise<void> {
    const points = input.map(i=>i.split(',').map(Number))
    const graph: number[][] = Array.from({length:input.length}, () => [])

    for (let i = 0; i < points.length; i++) {
        for (let j = i+1; j < points.length; j++) {
            let dist = [
                points[i][0]-points[j][0],
                points[i][1]-points[j][1],
                points[i][2]-points[j][2],
                points[i][3]-points[j][3],
            ].map(Math.abs).reduce((a,b)=>a+b,0)
            if (dist <= 3) {
                graph[i].push(j)
                graph[j].push(i)
            }
        }
    }

    const visited = new Set<number>
    let groups = 0
    for (let i = 0; i < graph.length; i++) {
        if (visited.has(i)) continue
        groups++
        const stack = [i]
        while(stack.length > 0) {
            const q = stack.pop()!
            if (visited.has(q)) continue
            visited.add(q)
            for (const n of graph[q]) {
                stack.push(n)
            }
        }
    }
    console.log(groups)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}