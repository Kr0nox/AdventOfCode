export async function taskOne(input: string[]): Promise<void> {
    const rec: Record<string, Rec> = {}
    for (const i of input) {
        const p1 = i.split(' => ')
        const ing = p1[0].split(', ').map(j => {
            const r = /^([0-9]+) (.*)$/.exec(j)!
            return {n: r[2], c: Number(r[1])} as Ing
        })
        const r =/^([0-9]+) (.*)$/.exec(p1[1])!
        rec[r[2]] = {c: Number(r[1]), i:ing}
    }

    const needed: Record<
    function get(i: string, c: number): number {
        if (i == 'ORE') return c
        const r = rec[i]
        const f = Math.ceil(c/r.c)
        return  f * (r.i.map(j => get(j.n, j.c)).reduce((a,b)=>a+b,0))
    }
    console.log(get('FUEL',1))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface Ing {
    n: string, c: number
}

interface Rec {
    c: number, i: Ing[]
}