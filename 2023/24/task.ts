import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const lines = input.map(i => i.replace(" ", "").split("@").map(i => parseNumberList(i).slice(0,2) as TwoVector) as TwoLine)
    const min = 200000000000000
    const max = 400000000000000
    //console.log(lines)

    let count = 0
    for (let i = 0; i < lines.length; i++) {
        for (let j = i+1; j < lines.length; j++) {
            const intersection = intersect2(lines[i], lines[j])
            if (intersection == undefined) continue
            if (intersection[0] >= min && intersection[0] <= max && intersection[1] >= min && intersection[1] <= max) {
                count++
            }
        }
    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    const lines = input.map(i => i.replace(" ", "").split("@").map(i => parseNumberList(i) as ThreeVector) as ThreeLine)
    
    console.log(getPossible(lines, 0, 1))
    //console.log(getPossible(lines, 1, 2))
    
}

type TwoVector = [number, number]
type TwoLine = [TwoVector, TwoVector]

type ThreeVector = [number, number, number]
type ThreeLine = [ThreeVector, ThreeVector]

function intersect2(_a: TwoLine, _b: TwoLine): TwoVector|undefined {
    const [a, b] = _a
    const i = twoIntersect(_a, _b)
    if (!i) return undefined
    const [t,r] = i

    if (r < 0 || t < 0) return undefined

    return [a[0] + t*b[0], a[1] + t*b[1]]
}

function twoIntersect(_a: TwoLine, _b: TwoLine): [number, number]|undefined {
    const [a, b] = _a
    const [c, d] = _b
    let t: number = NaN
    let r: number = NaN
    const l = (c[1]-a[1]) - (b[1]/b[0])*(c[0]-a[0])
    const den = (-d[1]+(b[1]/b[0]*d[0]))
    r = l/den
    t = (c[0] - a[0] + r*d[0])/b[0]
    

    if (!isNaN(t) && isFinite(t) && !isNaN(r) && isFinite(r)) 
        return [t, r]
    return undefined
}

function getPossible(lines: ThreeLine[], ind1: number, ind2: number) {
    const possible: TwoVector[] = []
    /*for (let vr = -1000; vr < 1000; vr++) {
        let foundPossible = false
        for (let p0 = 0; p0 < lines.length; p0++) {
            let possible = true;
            //console.log(" ")
            for (let i = 0; i < 10; i++) {
                if (i == p0) continue

                const t = (lines[p0][0][ind] + 962702686958 * lines[p0][1][ind] - lines[i][0][ind]-962702686958*vr)/(lines[i][1][ind]-vr)
                if (isNaN(t) || !isFinite(t)) continue
                //console.log(t)
                const diff = Math.abs(t - Math.round(t))
                if (diff > 0.001) {
                    possible = false
                    break
                }
            }
            if (possible) {
                foundPossible = true
                break
            }
        }
        if (foundPossible) {
            possible.push(vr)
        }
    }*/
    const p0 = lines[0]
    const p1 = lines[1]

    const limit = 350

    for (let vrX = -limit; vrX < limit; vrX++) {
        for (let vrY = -limit; vrY < limit; vrY++) {
            //let vrX = -330
            //let vrY = 63
            const _a = [[p0[0][ind1], p0[0][ind2]], [p0[1][ind1]-p1[1][ind1], p0[1][ind2]-p1[1][ind2]]] as TwoLine
            const _b = [[p1[0][ind1], p1[0][ind2]], [p1[1][ind1]-vrX, p1[1][ind2]-vrY]] as TwoLine
            const int = twoIntersect(_a, _b)
            if (!int) {
                continue
            }
            let [r,t] = int
            const diffT = Math.abs(t-Math.round(t)) 
            const diffR = Math.abs(r-Math.round(r)) 
            if (diffT > 0.01 || diffR > 0.01) {
                continue
            }
            r = Math.round(r)
            t = Math.round(t)
            //console.log(t, r,vrX, vrY)
            let isPossible = true
            const origin = p0[0].map((i, ind)=> i + r*p0[1][ind])
            for (let i = 2; i < lines.length; i++) {    
                //const pI = lines[i][0].map((i, ind)=> i + r*lines[i][1][ind])
                if (lines[i][1][0] - vrX < 0.01 || lines[i][1][1] - vrY < 0.01) {
                    isPossible = false
                    break
                }
            }
            if (isPossible) {
                console.log(vrX, vrY)
            }
            //for (let j = 0; j < lines.length; j++) {
               // let j = 20
            //const p0 = lines[j]
            /*for (let i = 0; i < lines.length; i++) {
                if (i == j) continue
                const _a = [[p0[0][ind1], p0[0][ind2]], [p0[1][ind1]-lines[i][1][ind1], p0[1][ind2]-lines[i][1][ind2]]] as TwoLine
                const _b = [[lines[i][0][ind1], lines[i][0][ind2]], [lines[i][1][ind1]-vrX, lines[i][1][ind2]-vrY]] as TwoLine
                const int = twoIntersect(_a, _b)
                if (!int) {
                    isPossible = false
                    console.log(_a, _b)
                    break
                }
                    
                const [t,r] = int
                const diffT = Math.abs(t-Math.floor(t)) 
                const diffR = Math.abs(r-Math.floor(r)) 
                if (diffT > 0.001 || diffR > 0.001) {
                    isPossible = false
                    break
                }
            }

            //if(isPossible) break
        //}
        if (isPossible) {
            possible.push([vrX,vrY])
        }*/
        }
    }
    return possible
}