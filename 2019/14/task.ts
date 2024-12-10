export async function taskOne(input: string[]): Promise<void> {
    const rececpies: Record<string, Rec> = {}
    for (const i of input) {
        const p1 = i.split(' => ')
        const ing = p1[0].split(', ').map(j => {
            const r = /^([0-9]+) (.*)$/.exec(j)!
            return {n: r[2], c: Number(r[1])} as Ing
        })
        const r =/^([0-9]+) (.*)$/.exec(p1[1])!
        rececpies[r[2]] = {c: Number(r[1]), i:ing}
    }

    console.log(get(rececpies))
}

export async function taskTwo(input: string[]): Promise<void> {
    const rececpies: Record<string, Rec> = {}
    for (const i of input) {
        const p1 = i.split(' => ')
        const ing = p1[0].split(', ').map(j => {
            const r = /^([0-9]+) (.*)$/.exec(j)!
            return {n: r[2], c: Number(r[1])} as Ing
        })
        const r =/^([0-9]+) (.*)$/.exec(p1[1])!
        rececpies[r[2]] = {c: Number(r[1]), i:ing}
    }

    const goal = 1000000000000
    let min = 1
    let max = 1
    while(get(rececpies, max) < goal) {
        min = max
        max *= 2
    }

    while(min < max-1) {
        const m = Math.floor((min+max)/2)
        const v = get(rececpies, m)
        if (v == goal) {
            break
        } else if (v < goal) {
            min = m
        } else {
            max = m - 1
        }
    }
    const vMax = get(rececpies, max)
    const vMin = get(rececpies, min)
    if (vMax < goal) console.log(max)
    else console.log(vMin)
}

function get(rececpies: Record<string, Rec>, amount = 1) {
    const needed: Record<string, number> = {'ORE': 0}

    updateNeeded('FUEL', amount)
    return needed['ORE']

    function updateNeeded(inc: string, add: number) {
        if (add < 0) throw inc
        if (inc == 'ORE') {
            needed['ORE']+=add
            return
        }
        if (add == 0) return
        let oldNeeded = needed[inc] ?? 0
        const r = rececpies[inc]
        const oldF = Math.ceil(oldNeeded/r.c)
        const oldIncList = r.i.map(j => {return {n:j.n, c: oldF*j.c}})
        needed[inc] = oldNeeded + add
        const newF = Math.ceil(needed[inc]/r.c)
        const newIncList = r.i.map((j,idx) => {return {n:j.n, c: newF*j.c - oldIncList[idx].c}})
        for (const i of newIncList) {
            updateNeeded(i.n, i.c)
        }
    }
}

interface Ing {
    n: string, c: number
}

interface Rec {
    c: number, i: Ing[]
}