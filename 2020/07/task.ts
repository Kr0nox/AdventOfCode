export async function taskOne(input: string[]): Promise<void> {
    const bags = input.map(i => {
        const s1 = i.split(' contain ')
        const p = extractColor(s1[0])
        if (s1[1] == 'no other bags.') return {p: p, c: []}
        const s2 = s1[1].substring(0, s1[1].length-1).split(', ')
        const r = s2.map(s => {
            return /[0-9]+ (.*)$/.exec(s)![1]
        }).map(extractColor)
        return {p:p, c: r}
    })
    const reverseBags: Record<string, string[]> = {}
    for (const k of bags) {
        reverseBags[k.p] = []
        for (const j of k.c) {
            reverseBags[j] = []
        }
    }
    for (const b of bags) {
        for (const k of b.c) {
            reverseBags[k].push(b.p)
        }
    }
    const possibles = new Set<string>()

    reverseBags['shiny gold'].forEach(b => possibles.add(b))
    let lastSize = reverseBags.size
    do {
        lastSize = reverseBags.size
        for (const b of possibles) {
            reverseBags[b].forEach(c => possibles.add(c))
        }

    } while(lastSize != reverseBags.size)
    console.log(possibles.size)
}

export async function taskTwo(input: string[]): Promise<void> {
    const bagMap: Record<string, Rule[]> = {}
    input.forEach(i => {
        const s1 = i.split(' contain ')
        const p = extractColor(s1[0])
        if (s1[1] == 'no other bags.') {
            bagMap[p] = []
            
        } else {
            const s2 = s1[1].substring(0, s1[1].length-1).split(', ')
            const r = s2.map(s => {
                const t = /([0-9]+) (.*)$/.exec(s)!
                return {b: extractColor(t[2]), n:Number(t[1])}
            })
            bagMap[p] = r
        }
    })

    console.log(goDeeper('shiny gold'))

    function goDeeper(name: string): number {
        if (bagMap[name].length == 0) return 0
        let c = 0
        for (const r of bagMap[name]) {
            c += r.n + r.n * goDeeper(r.b)
        }
        return c
    }

    interface Rule {
        b : string
        n: number
    }
}

function extractColor(j:string) {
    const t = j.split(' ')
    t.pop()
    return t.join(' ')
}