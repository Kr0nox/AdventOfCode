export async function taskOne(input: string[]): Promise<void> {
    const bs = input.map(i => {
        const re = /Blueprint [0-9]+: Each ore robot costs ([0-9]+) ore\. Each clay robot costs ([0-9]+) ore\. Each obsidian robot costs ([0-9]+) ore and ([0-9]+) clay\. Each geode robot costs ([0-9]+) ore and ([0-9]+) obsidian./
        const r = re.exec(i)
        if (r == null) throw i
        const n = r.slice(1,7).map(j => parseInt(j.trim()))
        return {
            or: n[0],
            c: n[1],
            ob: [n[2], n[3]],
            g: [n[4], n[5]]
        } as Blueprint
    })

    let sum = 0
    for (const [i, b] of bs.entries()) {
        console.log(i+1)
        sum += (i+1)*make(b, 24)
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const bs = input.map(i => {
        const re = /Blueprint [0-9]+: Each ore robot costs ([0-9]+) ore\. Each clay robot costs ([0-9]+) ore\. Each obsidian robot costs ([0-9]+) ore and ([0-9]+) clay\. Each geode robot costs ([0-9]+) ore and ([0-9]+) obsidian./
        const r = re.exec(i)
        if (r == null) throw i
        const n = r.slice(1,7).map(j => parseInt(j.trim()))
        return {
            or: n[0],
            c: n[1],
            ob: [n[2], n[3]],
            g: [n[4], n[5]]
        } as Blueprint
    })

    let sum = 1
    for (const [i, b] of bs.slice(0,3).entries()) {
        console.log(i+1)
        console.log(b)
        sum *= (i+1)*make(b, 32)
    }
    console.log(sum)
}

interface Blueprint {
    // cost of or miner
    or: number
    // cost of clay miner
    c: number
    // cost of obsidian miner [ore, clay]
    ob: [number, number]
    // cost of geode miner [ore, obsidian]
    g: [number, number]
}

interface Universe {
    // robot count
    ro: number[]
    // sceduled for build
    bu: number[]
    // resource count
    re: number[]
}

function make(b: Blueprint, m: number): number {
    const maxSpend = [
        Math.max(b.c, b.or, b.ob[0], b.g[0]),
        b.ob[1],
        b.g[1],
        Infinity
    ]
    console.log(maxSpend)
    let queue: Universe[] = [{
        ro: [1,0,0,0],
        bu: [0,0,0,0],
        re: [0,0,0,0]
    }]
    for(let minute = 0; minute < m; minute++) {
        const newQueue: Universe[] = []
        const duplicate: Set<string> = new Set()

        function add(un: Universe) {
            const j = JSON.stringify(un)
            if (duplicate.has(j)) return
            newQueue.push(un)
            duplicate.add(j)
        }

        while(queue.length > 0) {
            const q = queue.pop() as Universe
            const base = {
                re: [...q.re],
                ro: [...q.ro],
                bu: [0,0,0,0]
            }
            add(base)
            for (let i = 0; i < 4; i++) {
                if (maxSpend[i] <= base.ro[i]) continue
                let can = false
                const re = [...q.re]
                if (i == 0) {
                    can = q.re[0] >= b.or
                    re[0]-=b.or
                } else if (i==1) {
                    can = q.re[0] >= b.c
                    re[0]-=b.c
                } else if(i == 2) {
                    can = q.re[0] >= b.ob[0] && q.re[1] >= b.ob[1]
                    re[0]-=b.ob[0]
                    re[1]-=b.ob[1]
                } else {
                    can = q.re[0] >= b.g[0] && q.re[2] >= b.g[1]
                    re[0]-=b.g[0]
                    re[2]-=b.g[1]
                }
                if (!can) continue
                const bu = [0,0,0,0]
                bu[i] = 1
                add({
                    bu: bu,
                    re: re,
                    ro: [...base.ro]
                })
            }
        }
        let max = 0
        newQueue.forEach(i => {
            i.ro.forEach((j,jnd) => i.re[jnd]+=j)
            i.bu.forEach((j,jnd)=>i.ro[jnd]+=j)
            const possible = i.re[3] + i.ro[3] * ((m-1)-minute)
            if (possible > max) max = possible
        })

        queue = newQueue.filter(i => i.re[3] + i.ro[3] * ((m-1)-minute) >= max)
    }
    console.log(queue[0])
    return queue[0].re[3]
}