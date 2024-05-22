import {JsonSet, Queue, Stack} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    task(parse(input))
}

export async function taskTwo(input: string[]): Promise<void> {
    const floors = parse(input)
    const newElementCount = 4
    for (let f = 0; f < floors.length; f++) {
        for (let i = 0; i < newElementCount; i++) floors[f].push(false)
    }
    for (let i = floors[0].length-newElementCount; i < floors[0].length; i++) {
        floors[0][i] = true
    }
    task(floors)
}

function task(floors: boolean[][]) {
    const floorCount = floors.length
    interface State1 {
        f:boolean[][]
    }
    interface State extends State1 {
        c:number
        e:number
    }
    const Q:Queue<State> = new Queue()
    const V:Map<string, Representation[]> = new Map()
    Q.push({
        f: floors,
        e: 0,
        c:0
    })

    while(!Q.isEmpty()) {
        const q = Q.pop()

        if (q.f[floorCount-1].every(i => i)) {
            console.log(q.c)
            return
        }

        const h = hash(q.f, q.e)
        const hF = V.get(h)
        const rep = floorToRep(q.f)
        if (hF) {
            if (hF.some(r => repEqual(rep, r))) continue
            hF.push(rep)
        } else {
            V.set(h, [rep])
        }

        for (const de of [-1,1]) {
            if(q.e+de < 0 || q.e+de >= floorCount) continue
            for (let i = 0; i < floors[q.e].length; i++) {
                if(!q.f[q.e][i]) continue
                if (de > 0) {
                    for (let j = i+1; j < floors[q.e].length; j++) {
                        if(!q.f[q.e][j]) continue
                        const newF = copy(q.f)
                        newF[q.e+de][i] = true
                        newF[q.e+de][j] = true
                        newF[q.e][i] = false
                        newF[q.e][j] = false
                        if (!isValidFloor(newF[q.e]) || !isValidFloor(newF[q.e+de])) continue
                        Q.push({
                            c: q.c+1,
                            e: q.e+de,
                            f:newF
                        })
                    }
                }
                
                const newF = copy(q.f)
                newF[q.e+de][i] = true
                newF[q.e][i] = false
                if (!isValidFloor(newF[q.e]) || !isValidFloor(newF[q.e+de])) continue
                Q.push({
                    c: q.c+1,
                    e: q.e+de,
                    f:newF
                })
            }
        }
    }
}

function parse(_input: string[]): boolean[][] {
    const input = _input.map(i=> i.split("contains")[1])
    let id = 0
    let floorCount = input.length
    const nameMap: Record<string, number> = {}
    input.forEach(i => {
        if (i.includes('nothing relevant.')) return
        i.split(',').forEach(j => {
            let r = /a (.+) generator/.exec(j)
            if (r) {
                nameMap[r[1]] = id
                id++
                return
            }
            r = /a (.+)-compatible microchip/.exec(j)
            if (r) {
                return
            }
            throw i + " | " + j
        })
    })

    const floors: boolean[][] = []
    for (let i of input) {
        floors.push(Array.from({length: id*2}, ()=> false))
    } 
    input.forEach((i, idx) => {
        if (i.includes('nothing relevant.')) return
        i.split(',').forEach(j => {
            let r = /a (.+) generator/.exec(j)
            if (r) {
                floors[idx][nameMap[r[1]]* 2] = true
                return
            }
            r = /a (.+)-compatible microchip/.exec(j)
            if (r) {
                floors[idx][nameMap[r[1]]* 2 + 1] = true
                return
            }
            throw "2 " + i + " | " + j
        })
    })
    return floors
}

type Representation = [number, number][]

function copy<T>(s: T): T {
    return JSON.parse(JSON.stringify(s))
}

function debug(arr: boolean[][]) {
    copy(arr).reverse().forEach(i => console.log(i.map(b => b?'#':'.').join('')))
    console.log("")
}

function isValidFloor(floor: boolean[]) {
    let hasGenerator = false
    for (let i = 0; i < floor.length; i+=2) {
        if (floor[i]) hasGenerator = true
    }
    if (!hasGenerator) return true

    for (let i = 1; i < floor.length; i+=2) {
        if (!floor[i]) continue
        if(!floor[i-1]) return false
    }
    return true
}

function floorToRep(floors: boolean[][]): Representation {
    const r: Representation = []
    for (let x = 0; x < floors[0].length; x+=2) {
        let gF = -1
        for (let i = 0; i < floors.length; i++) {
            if (floors[i][x]) gF = i
        }
        let cF = -1
        for (let i = 0; i < floors.length; i++) {
            if (floors[i][x]) cF = i
        }
        r.push([gF, cF])
    }
    return r.sort(([_1, a], [_2, b]) => a-b).sort(([a,_a], [b,_b]) => a-b)
}

function repEqual(a: Representation, b: Representation) {
    for (let i = 0; i < a.length; i++) {
        if (a[i][0] != b[i][0]) return false
        if (a[i][1] != b[i][1]) return false
    }
    return true
}

function hash(floors: boolean[][], e: number) {
    function floorHash(floor: boolean[]) {
        let pairs = 0
        let generators = 0
        let chips = 0
        for (let i = 0; i < floor.length; i+=2) {
            if (floor[i]) generators++
            if (floor[i+1]) chips++
            if (floor[i] && floor[i+1]) pairs++
        }
        return `${pairs}A${generators}${chips}`
    }
    return floors.map(floorHash).join('B') + 'C' + e
}