import { Stack, Queue } from '../../base/simpleStructure'

const M: Record<string, string[]> = {}
const P: Prod[] = []

export async function taskOne(input: string[]): Promise<void> {
    parse(input)

    const initial = input[input.length-1]
    const S: Set<string> = new Set()
    for (let i = 0; i < initial.length; i++) {
        const o1 = initial[i]
        const o2 = initial[i] + initial[i+1]
        //console.log(i, o1, o2)
        if (M[o1]) for (let j = 0; j < M[o1].length; j++) S.add(rep(o1, M[o1][j], i, initial))
        
        if (M[o2]) for (let j = 0; j < M[o2].length; j++) S.add(rep(o2, M[o2][j], i,initial))
        //console.log(S)
    }
    console.log(S.size)

    
}

export async function taskTwo(input: string[]): Promise<void> {
    parse(input)
    const GOAL = input[input.length-1]

    let cur = GOAL
    let c = 0
    while(cur != 'e') {
        c++
        for (const p of P) {
            if (cur.includes(p.g)) {
                cur = cur.replace(p.g, p.s)
                break;
            }
        }
    }
    console.log(c)
    
}

function parse(input: string[]) {
    input.slice(0, input.length-2).forEach(i => {
        const r = /([A-Za-z]+) => ([A-Za-z]+)/.exec(i)
        if (!r) throw i
        if(!M[r[1]]) M[r[1]] = []
        M[r[1]].push(r[2])
        P.push({g:r[2], s: r[1]})
    })
    P.sort((a,b) => b.g.length-a.g.length)
}

interface Prod { g: string, s: string }

function rep(o: string, r: string, i:number, rep: string) {
    return rep.substring(0,i) + rep.substring(i).replace(o, r)
}