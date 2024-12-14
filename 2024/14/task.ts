export async function taskOne(input: string[]): Promise<void> {
    const H = 103
    const W = 101

    const robots = input.map(i => {
        const r = /p=([0-9]+),([0-9]+) v=([-0-9]+),([-0-9]+)/.exec(i)!
        return [r[1],r[2],r[3],r[4]].map(Number)
    })

    for (let round = 0; round < 100; round++) {
        for (const r of robots) {
            r[0] = (r[0] + r[2]) % W
            r[1] = (r[1] + r[3]) % H
            while(r[0] < 0) r[0] += W
            while(r[1] < 0) r[1] += H
        }
    }
    let q1 = 0
    let q2 = 0
    let q3 = 0
    let q4 = 0
    const cW = Math.floor(W/2)
    const cH = Math.floor(H/2)
    for (const r of robots) {
        if (r[0] < cW && r[1] < cH) q1++
        if (r[0] > cW && r[1] < cH) q2++
        if (r[0] < cW && r[1] > cH) q3++
        if (r[0] > cW && r[1] > cH) q4++
    }
    console.log(q1*q2*q3*q4)
}

export async function taskTwo(input: string[]): Promise<void> {
    const H = 103
    const W = 101

    const robots = input.map(i => {
        const r = /p=([0-9]+),([0-9]+) v=([-0-9]+),([-0-9]+)/.exec(i)!
        return [r[1],r[2],r[3],r[4]].map(Number)
    })

    let minDist = Infinity
    for (let round = 0; round < 100000; round++) {
        for (const r of robots) {
            r[0] = (r[0] + r[2]) % W
            r[1] = (r[1] + r[3]) % H
            while(r[0] < 0) r[0] += W
            while(r[1] < 0) r[1] += H
        }
        let d = 0
        for (const r of robots) {
            d += Math.abs(r[0] -robots[0][0])
            d += Math.abs(r[1] -robots[0][1])
        }
        if (d < minDist) {
            minDist = d
            console.log(round)
            toGrid()
        }
    }

    function toGrid() {
        const g = Array.from({length: H}, () => Array.from({length: W}, () => ' '))
        for (const r of robots) {
            g[r[1]][r[0]] = '#'
        }
        for (const r of g) {
            console.log(r.join())
        }
    }
}