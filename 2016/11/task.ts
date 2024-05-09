export async function taskOne(_input: string[]): Promise<void> {
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
    interface State {
        floors: boolean[][]
        e: number
        steps: number
    }
    //debug(floors)
    const Q: State[] = [{floors: copy(floors), e: 0, steps:0}]
    const visited: Set<string> = new Set()
    //console.log(nameMap)
    //console.log(floors)
    let curMin = Infinity
    while(Q.length > 0) {
        const q = Q.pop() as State
        if (visited.has(JSON.stringify({floors: q.floors, e: q.e}))) continue
        visited.add(JSON.stringify({floors: q.floors, e: q.e}))

        // check for final
        if (q.floors[floorCount-1].every(i=>i)) {
            console.log(q.steps)
            debug(q.floors)
            if (q.steps < curMin) curMin = q.steps
            continue
        }
        // check for validity
        //if (q.steps >= curMin) continue
        let validity = true
        for (let f = 0; f < floorCount; f++) {
            let hasRTG = false
            for (let i = 0; i < q.floors[f].length*2; i+=2) {
                if (q.floors[f][i]) hasRTG = true
            }
            if (hasRTG) {
                //console.log("rtg on: ", f)
                for (let i = 1; i < q.floors[f].length*2; i+=2) {
                    if (q.floors[f][i] && !q.floors[f][i-1]) validity = false 
                }
            }
            
        }
        //console.log(validity, q.e)
        //debug(copy(q.floors))
        if (!validity) {
            //console.log("invalid")
            //debug(copy(q.floors))
            continue
        } else {
            //console.log("valid", q.e)
            //debug(copy(q.floors))
        }


        for (let i = 0; i < q.floors[q.e].length; i++) {
            if (!q.floors[q.e][i]) continue
            let moveP = copy(q)
            let moveM = copy(q)
            moveP.e++
            moveM.steps++
            moveP.steps++
            moveM.e--
            if (moveM.e >= 0) {
                moveM.floors[q.e][i] = false
                moveM.floors[q.e-1][i] = true
                //console.log("M1", moveM)
                Q.push(moveM)
            }  
            if (moveP.e < floorCount) {
                moveP.floors[q.e][i] = false
                moveP.floors[q.e+1][i] = true
               // console.log("P1",i, moveP, q.e)
                Q.push(moveP)
                //console.log(Q)
            }
        }
        

        for (let i = 0; i < q.floors[q.e].length; i++) {
            if (!q.floors[q.e][i]) continue
            for (let j = i+1; j < q.floors[q.e].length; j++) {
                if (!q.floors[q.e][j]) continue
                let moveP = copy(q)
                let moveM = copy(q)
                moveP.e++
                moveM.e--
                moveM.steps++
                moveP.steps++
                if (moveM.e >= 0) {
                    moveM.floors[q.e][i] = false
                    moveM.floors[q.e-1][i] = true
                    moveM.floors[q.e][j] = false
                    moveM.floors[q.e-1][j] = true
                   // console.log("M2", moveM)
                    Q.push(moveM)
                }  
                if (moveP.e < floorCount) {
                    //debug(moveP.floors)
                    moveP.floors[q.e][i] = false
                    moveP.floors[q.e+1][i] = true
                    moveP.floors[q.e][j] = false
                    moveP.floors[q.e+1][j] = true
                   // console.log("P2", moveP)
                    Q.push(moveP)
                }
            }
        }
    }
    console.log(curMin)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

function copy<T>(s: T): T {
    return JSON.parse(JSON.stringify(s))
}

function debug(arr: boolean[][]) {
    copy(arr).reverse().forEach(i => console.log(i.map(b => b?'#':'.').join('')))
    console.log("")
}