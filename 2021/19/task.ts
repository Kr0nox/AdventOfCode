import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    let i = 1
    const s: Scanner[] = []
    while(i < input.length) {
        const scanner: Scanner = {b:[],mid:[],max:[],min:[]}
        while(i < input.length && input[i] != "") {
            const coord = (parseNumberList(input[i]) as Coord)
            scanner.b.push(coord)
            i++
        }
        s.push(scanner)
        i+=2
    }
    s.forEach(i => {
        for (let j = 0; j < i.b.length; j++) {
            for (let k = 0; k < i.b.length;k++) {
                const rel = i.b[j].map((a,ind) => Math.abs(a-i.b[k][ind]))
                const ma = Math.max(...rel)
                const mi = Math.min(...rel)
                i.max.push(ma)
                i.min.push(mi)
                i.mid.push(rel.filter(i=>i!=ma && i!=mi)[0])
            }
        }
    })
    let pot = findMatches(s)
    const scanner: Record<number, {sc: Coord}&Scanner> = {}
    scanner[0]= {
        sc: [0,0,0],
        b: s[0].b,
        ...buildRels(s[0].b)
    }
    i = -1
    while(pot.length > 0) {
        i++
        if (i >= pot.length) i = 0
        const p = pot[i]
        if (scanner[p[0]] != undefined && scanner[p[1]] != undefined) {
            pot = pot.slice(0,i).concat(pot.slice(i+1))
            i--
            continue
        }
        if (scanner[p[0]] == undefined && scanner[p[1]] == undefined) continue

        let known = -1
        let unknown = -1
        if (scanner[p[0]] != undefined) {
            known = p[0]
            unknown = p[1]
        } else {
            known = p[1]
            unknown = p[0]
        }

        for (let or = 0; or < 48; or++) {
            const perm = getPermutation(s[unknown].b, or)
            const rels = buildRels(perm)
            if (isMatch(scanner[known], rels)) {
                console.log("match")
                let knownPoints: Coord[] = []
                for (let j = 0; j < scanner[known].b.length; j++) {
                    const knownRels = scanner[known].b.map(f => singleRel(scanner[known].b[j], f))
                    for (let k = 0; k < perm.length; k++) {
                        const unknownRels = perm.map(f => singleRel(perm[k],f))
                        let count = 0
                        for (let l = 0; l < knownRels.length; l++) {
                            for (let m = 0; m < unknownRels.length; m++) {
                                if (knownRels[l].max == unknownRels[m].max && knownRels[l].min == unknownRels[m].min && knownRels[l].mid == unknownRels[m].mid)  count++
                                //if (knownRels[l].max == unknownRels[m].max && knownRels[l].min == unknownRels[m].min && knownRels[l].mid == unknownRels[m].mid)  count++
                            }
                        }
                        //console.log(count)
                        if (count >= 12) {
                            knownPoints = [scanner[known].b[j], perm[k]]
                            break;
                        }
                    }
                    if (knownPoints.length == 2) {
                        break;
                    }
                }
                if (knownPoints.length < 2) continue
                scanner[unknown] = {
                    sc: scanner[known].sc.map((a, ind) => a+knownPoints[0][ind]-knownPoints[1][ind]) as Coord,
                    b: perm,
                    ...rels
                }
                break;
            }
        }
    }

    const pointSet: Set<string> = new Set()
    for (let i = 0; i < s.length; i++) {
        scanner[i].b.forEach(j => {
            pointSet.add(j.map((a, ind)=>scanner[i].sc[ind]+a).join(","))
        })
    }

    console.log(scanner)
    for (let i = 0; i < s.length; i++) {
        console.log(scanner[i].sc)
    }
    console.log("done")
    console.log(pointSet.size)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

type Coord = [number, number, number]
interface Scanner {
    b: Coord[]
    mid: number[]
    max: number[]
    min: number[]
}

function findMatches(s: Scanner[]): [number,number][] {
    const pot: [number,number][] = []

    for (let i = 0; i < s.length; i++) {
        for (let j = i+1; j < s.length; j++) {
            if (isMatch(s[i], s[j])) pot.push([i, j])
        }
    }

    return pot
}

function isMatch(a: {mid: number[], min: number[], max: number[]}, b: {mid: number[], min: number[], max: number[]}) {
    let count = 0
    for (let k = 0; k < a.mid.length; k++) {
        for (let l = 0; l < b.mid.length; l++) {
            if (a.mid[k] == b.mid[l] && a.min[k] == b.min[l] && a.max[k] == b.max[l]) count++
            //if (a.mid[k] == -b.mid[l] && a.min[k] == -b.min[l] && a.max[k] == -b.max[l]) count++
        }
    }
    return count >= 12*12
}

const coordSwitch = [
    [0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]
]

const sign = [
    [1,1,1],[-1,1,1],[1,-1,1],[1,1,-1],[-1,-1,1],[-1,1,-1],[1,-1,-1],[-1,-1,-1]
]

function getPermutation(c: Coord[], num: number): Coord[] {
    const s = sign[num % sign.length]
    const m = coordSwitch[Math.floor(num/sign.length)]
    return c.map(i => {
        const temp = i.map((j,ind) => j*s[ind])
        return [temp[m[0]], temp[m[1]], temp[m[2]]]
    })
}

function buildRels(b: Coord[]) {
    const temp = {
        max: [] as number[],
        min: [] as number[],
        mid: [] as number[]
    }
    for (let j = 0; j < b.length; j++) {
        for (let k = 0; k < b.length;k++) {
            const t = singleRel(b[j],b[k])
            temp.max.push(t.max)
            temp.min.push(t.min)
            temp.mid.push(t.mid)
        }
    }
    return temp
}

function singleRel(a: Coord, b: Coord) {
    const rel = b.map((v,ind) => v-a[ind])
    const ma = Math.max(...rel)
    const mi = Math.min(...rel)
    return {
        max: ma,
        min: mi,
        mid: rel.reduce((a,b)=>a+b,0)-ma-mi
    }
}