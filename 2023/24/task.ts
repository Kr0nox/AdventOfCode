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
    console.log("Implemented in python")
}

type TwoVector = [number, number]
type TwoLine = [TwoVector, TwoVector]


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