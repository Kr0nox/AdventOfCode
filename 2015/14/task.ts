const d: Record<string, [number, number, number]> = {}

export async function taskOne(input: string[]): Promise<void> {
    parseInput(input)
    console.log(Math.max(...Object.keys(d).map(i => getDist(2503, d[i]))))
    function getDist(time: number, d: [number, number, number]) {
        const times = Math.floor(time / (d[1] + d[2]))
        const rest = time % (d[1]+d[2])
    
        let dist = times * d[0] * d[1]
        if (rest > d[1]) return dist + d[0] * d[1]
        return dist + rest * d[0]
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    parseInput(input)
    const points: Record<string, number> = {}
    const dist: Record<string, number> = {}
    const r = Object.keys(d)
    for (const k of r) {
        points[k] = 0
        dist[k] = 0 
    }

    for (let i = 0; i < 2503; i++) {
        let max = -1
        for (const k of r) {
            if (moves(i, k)) dist[k] += d[k][0]
            if (dist[k] > max) max = dist[k]
        }
        for (const k of r) {
            if (dist[k] >= max) points[k]++
        }
    }

    console.log(Math.max(...r.map(i => points[i])))

    function moves(time: number, racer: string) {
        const rest = time % (d[racer][1]+d[racer][2])
        if (rest < d[racer][1]) return true
        return false
    }
}

function parseInput(input: string[]) {
    input.forEach(i => {
        const r = /([A-Za-z]+) can fly ([0-9]+) km\/s for ([0-9]+) seconds, but then must rest for ([0-9]+) seconds\./.exec(i)
        if (!r) throw i
        d[r[1]] = [parseInt(r[2]), parseInt(r[3]), parseInt(r[4])]
    })
}

