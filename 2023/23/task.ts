export async function taskOne(input: string[]): Promise<void> {
    const g = input.map(i => i.split(""))
    const s2 = g[0].findIndex(i=> i=='.')
    console.log(maxPathLenDFS(g, [0,s2], [s2]))
}


export async function taskTwo(input: string[]): Promise<void> {
    const g = input.map(i => i.split(""))
    const s2 = g[0].findIndex(i=> i=='.')
    const e2 = g[g.length-1].findIndex(i=> i=='.')
    const e = parseCoord([g.length-1, e2], g.length)
    const simple: Record<number, {x: number, d: number}[]> = {}
    simple[s2] = []
    simple[e] = []
    g.forEach((i, x) => i.forEach((j, y) => {
        if (j == '#') return
        let count = 0
        if (x > 0 && g[x-1][y] != "#") count++
        if (x < g.length - 1 && g[x+1][y] != "#") count++
        if (y > 0 && g[x][y-1] != "#") count++
        if (y < g[0].length - 1 && g[x][y+1] != "#") count++
        if (count > 2) {
            simple[parseCoord([x,y], g.length)] = []
        }
    }))
    const keys = Object.keys(simple).map(i => parseInt(i.trim()))
    for (const k of keys) {
        const queue: {x:number, d:number, p:number}[] = [{x:k, d:0, p: k}]
        while(queue.length > 0) {
            const q = queue.shift() as {x:number, d:number, p:number}
            const [x,y] = getCoord(q.x, g.length)
            if (x < 0 || x >= g.length || y < 0 || y >= g[0].length) continue
            if (g[x][y] == '#') continue
            if (q.x != k && keys.includes(q.x)) {
                simple[k].push(q)
            } else {
                for (const n of [parseCoord([x+1, y], g.length), parseCoord([x-1, y], g.length), parseCoord([x, y+1], g.length), parseCoord([x, y-1], g.length)]) {
                    if (n != q.p) queue.push({x:n, d: q.d+1, p: q.x})
                }
            }
        }
    }
    const stack: {x:number, d:number, v:number[]}[] = [{x: s2, d:0, v: []}]
    let maxLen = -1
    while(stack.length > 0) {
        const q = stack.pop() as {x:number, d:number, v:number[]}
        if (q.x == e) {
            if (q.d > maxLen) maxLen = q.d
            continue
        }
        const newV = Array.from(q.v)
        newV.push(q.x)

        for (const n of simple[q.x]) {
            if (!newV.includes(n.x)) stack.push({x:n.x, d: q.d+n.d, v: newV})
        }
    }
    console.log(maxLen)
}

function maxPathLenDFS(g: string[][], _x: [number, number], _v: number[]): number {
    const stack: {x: [number, number], d: number, v: number[]}[] = [{x:_x, d:0, v:_v}]
    const results: number[] = []
    while (stack.length > 0) {
        const q = stack.pop() as {x: [number, number], d: number, v: number[]}
        const x = q.x
        const v = q.v

        if (x[0] < 0 || x[0] >= g.length || x[1] < 0 || x[1] >= g[0].length) continue
        if (g[x[0]][x[1]] == '#') continue
        if (x[0] == g.length-1) {
            results.push(q.d)
            continue
        }

        const _p = v[v.length-1]
        const p = [Math.floor(_p/g.length), _p%g.length]
        const xDiff = x[0]-p[0]
        const yDiff = x[1]-p[1]

        if (xDiff == -1 && !['^', '.'].includes(g[p[0]][p[1]])) {
            continue
        } else if (xDiff == 1 && !['v', '.'].includes(g[p[0]][p[1]])) {
            continue
        } else if (yDiff == -1 && !['<', '.'].includes(g[p[0]][p[1]])) {
            continue
        } else if (yDiff == 1 && !['>', '.'].includes(g[p[0]][p[1]])) {
            continue
        }

        const newV = Array.from(v)
        newV.push(x[0]*g.length+x[1])
        const next = [[x[0]-1, x[1]], [x[0]+1, x[1]], [x[0], x[1]-1], [x[0], x[1]+1]].filter(i => !newV.includes(i[0]*g.length+i[1]))
        stack.push(...next.map(i => {return {x: i as [number, number], d: q.d+1, v:newV}}))
    }
    return Math.max(...results)
}

function getCoord(x: number , l: number): [number, number] {
    return [Math.floor(x/l), x%l]
}

function parseCoord(c: [number, number] , l: number) {
    return c[0]*l+c[1]
}