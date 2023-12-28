export async function taskOne(input: string[]): Promise<void> {
    const elfs: Elf[] = []
    input.forEach((i, ind) => {
        i.split("").forEach((j, jnd)=>{
            if (j == '#') {
                elfs.push({
                    postion: [jnd,ind],
                    hasNeighbour: false
                })
            }
        })
    })

    const moveList = [propN, propS, propW, propE]
    for (let _c = 0; _c < 10; _c++) {
        const proposedMoves: Set<string> = new Set()
        const duplicate: Set<string> = new Set()
        for (const e1 of elfs) {
            for (const e2 of elfs) {
                const p1 = Math.abs(e1.postion[0]-e2.postion[0])
                const p2 = Math.abs(e1.postion[1]-e2.postion[1])
                if (p1 <= 1 && p2 <=1 && p1+p2 > 0) {
                    e1.hasNeighbour = true
                    e2.hasNeighbour = true
                    break;
                }
            }
        }

        for (const e of elfs) {
            if (!e.hasNeighbour) continue
            for (let f = 0; f < 4; f++) {
                const r = moveList[f](elfs, e)
                if (r != undefined) {
                    e.proposed = r
                    if (proposedMoves.has(r[0]+","+r[1])) {
                        duplicate.add(r[0]+","+r[1])
                    } else {
                        proposedMoves.add(r[0]+","+r[1])
                    }
                    break
                }
            }
        }
        
        const F = moveList.shift() as ProposeMove
        moveList.push(F)
        for (const e of elfs) {
            e.hasNeighbour = false
            if (e.proposed == undefined) continue
            if (!duplicate.has(e.proposed[0]+","+e.proposed[1])) e.postion = e.proposed
            e.proposed = undefined
        }
    }
    let x = [Infinity, -Infinity]
    let y = [Infinity, -Infinity]
    for (const e of elfs) { 
        if (e.postion[0] > x[1]) x[1] = e.postion[0]
        if (e.postion[0] < x[0]) x[0] = e.postion[0]
        if (e.postion[1] > y[1]) y[1] = e.postion[1]
        if (e.postion[1] < y[0]) y[0] = e.postion[1]
    }
    console.log((x[1]-x[0]+1)*(y[1]-y[0]+1)-elfs.length)
}

export async function taskTwo(input: string[]): Promise<void> {
    const elfs: Elf[] = []
    input.forEach((i, ind) => {
        i.split("").forEach((j, jnd)=>{
            if (j == '#') {
                elfs.push({
                    postion: [jnd,ind],
                    hasNeighbour: false
                })
            }
        })
    })

    const moveList = [propN, propS, propW, propE]
    let moved = true
    let i = 0
    while(moved) {
        i++
        moved = false
        let anyNeighbour = false
        const proposedMoves: Set<string> = new Set()
        const duplicate: Set<string> = new Set()
        for (let e1 = 0; e1 < elfs.length; e1++) {
            for (let e2 = e1+1; e2 < elfs.length; e2++) {
                const p1 = Math.abs(elfs[e1].postion[0]-elfs[e2].postion[0])
                const p2 = Math.abs(elfs[e1].postion[1]-elfs[e2].postion[1])
                if (p1 <= 1 && p2 <=1 && p1+p2 > 0) {
                    elfs[e1].hasNeighbour = true
                    elfs[e2].hasNeighbour = true
                    anyNeighbour = true
                }
            }
        }
        //console.log(elfs.filter(e => e.hasNeighbour))
        if (!anyNeighbour) break;
        for (const e of elfs) {
            if (!e.hasNeighbour) continue
            for (let f = 0; f < 4; f++) {
                const r = moveList[f](elfs, e)
                if (r != undefined) {
                    e.proposed = r
                    if (proposedMoves.has(r[0]+","+r[1])) {
                        duplicate.add(r[0]+","+r[1])
                    } else {
                        proposedMoves.add(r[0]+","+r[1])
                    }
                    break
                }
            }
        }
        
        const F = moveList.shift() as ProposeMove
        moveList.push(F)
        for (const e of elfs) {
            e.hasNeighbour = false
            if (e.proposed == undefined) continue
            if (!duplicate.has(e.proposed[0]+","+e.proposed[1])) e.postion = e.proposed
            e.proposed = undefined
            moved = true
        }
    }
    console.log(i)
}

type Pos = [number, number]

interface Elf {
    postion: Pos,
    proposed?: Pos,
    hasNeighbour: boolean
}

type ProposeMove = (elfs: Elf[],elf:Elf) => Pos|undefined

function propN(elfs: Elf[],elf:Elf): Pos|undefined {
    for (const e of elfs) {
        if (e.postion[1]==elf.postion[1]-1 && (
            e.postion[0] == elf.postion[0] ||
            e.postion[0] == elf.postion[0]+1 ||
            e.postion[0] == elf.postion[0]-1
        )) return undefined
    }
    return [elf.postion[0], elf.postion[1]-1]
}
function propS(elfs: Elf[],elf:Elf): Pos|undefined {
    for (const e of elfs) {
        if (e.postion[1]==elf.postion[1]+1 && (
            e.postion[0] == elf.postion[0] ||
            e.postion[0] == elf.postion[0]+1 ||
            e.postion[0] == elf.postion[0]-1
        )) return undefined
    }
    return [elf.postion[0], elf.postion[1]+1]
}

function propE(elfs: Elf[],elf:Elf): Pos|undefined {
    for (const e of elfs) {
        if (e.postion[0]==elf.postion[0]+1 && (
            e.postion[1] == elf.postion[1] ||
            e.postion[1] == elf.postion[1]+1 ||
            e.postion[1] == elf.postion[1]-1
        )) return undefined
    }
    return [elf.postion[0]+1, elf.postion[1]]
}
function propW(elfs: Elf[],elf:Elf): Pos|undefined {
    for (const e of elfs) {
        if (e.postion[0]==elf.postion[0]-1 && (
            e.postion[1] == elf.postion[1] ||
            e.postion[1] == elf.postion[1]+1 ||
            e.postion[1] == elf.postion[1]-1
        )) return undefined
    }
    return [elf.postion[0]-1, elf.postion[1]]
}

function hasNeighbours(elfs: Elf[], elf: Elf) {
    return elfs.some(e => {
        let isNeighbour = false
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if (i == 0 && j == 0) continue
                if (e.postion[0] == elf.postion[0]+i && e.postion[1] == elf.postion[1]+j) {
                    isNeighbour = true
                }
            }
        }
        return isNeighbour
    })
}

function print(elfs: Elf[]) {
    let x = [Infinity, -Infinity]
    let y = [Infinity, -Infinity]
    for (const e of elfs) { 
        if (e.postion[0] > x[1]) x[1] = e.postion[0]
        if (e.postion[0] < x[0]) x[0] = e.postion[0]
        if (e.postion[1] > y[1]) y[1] = e.postion[1]
        if (e.postion[1] < y[0]) y[0] = e.postion[1]
    }
    const grid = Array.from({length:y[1]-y[0]+1}, () => Array.from({length:x[1]-x[0]+1}, () => '.'))
    elfs.forEach(e => {
        grid[e.postion[1]-y[0]][e.postion[0]-x[0]] = '#'
    })
    console.log(grid.map(i => i.join("")).join("\n"))
}