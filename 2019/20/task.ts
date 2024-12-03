import {Queue, MinHeap} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const gateWays: Record<string, Pos[]> = {}
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    // x then y
    const actualGateWays: Record<number, Record<number, Pos>> = {}

    for (let y = 0; y < input.length - 1; y++) {
        for (let x = 0; x < input[y].length - 1; x++) {
            if (letters.includes(input[y][x])) {
                let pos = {x,y}
                let name = input[y][x]
                if (letters.includes(input[y][x+1])) {
                    pos.x += input[y][x-1] == '.' ? -1 : 2
                    name += input[y][x+1]
                }
                if (letters.includes(input[y+1][x])) {
                    pos.y += y != 0 && input[y-1][x] == '.' ? -1:2
                    name += input[y+1][x]
                }
                if (name.length == 1) continue
                if (gateWays[name] == undefined) gateWays[name] = []
                gateWays[name].push(pos)
            }
        }
    }
    for (const k of Object.keys(gateWays)) {
        if (gateWays[k].length == 1) continue
        const p1 = gateWays[k][0]
        const p2 = gateWays[k][1]

        if (actualGateWays[p1.x] == undefined) actualGateWays[p1.x] = {}
        if (actualGateWays[p2.x] == undefined) actualGateWays[p2.x] = {}

        actualGateWays[p1.x][p1.y] = p2
        actualGateWays[p2.x][p2.y] = p1
    }


    const goal = gateWays['ZZ'][0]
    const queue = new Queue<State>()
    queue.push({...gateWays['AA'][0], time: 0})
    const visited = new Map<string, number>()
    let minTotal = Infinity
    //console.log(gateWays)
    //test()

    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (q.time >= minTotal) continue
        const k = str(q)
        if ((visited.get(k)??Infinity) < q.time) continue
        visited.set(k, q.time)

        if (q.x == goal.x && q.y == goal.y) {
            minTotal = q.time
            continue
        }

        const next = getNextStates(q)
        next.forEach(n => queue.push(n))
    }
    console.log(minTotal)

    function getNextStates(s: State) {
        const r: State[] = []
        for (let d of [[1,0],[-1,0],[0,-1],[0,1]]) {
            const nX = s.x+d[0]
            const nY = s.y+d[1]
            if (input[nY][nX] != '.') continue
            if (actualGateWays[nX] != undefined && actualGateWays[nX][nY] != undefined) {
                r.push({
                    x: actualGateWays[nX][nY].x,
                    y: actualGateWays[nX][nY].y,
                    time: s.time+2
                })
            } else {
                r.push({
                    x: nX,y:nY,time:s.time+1
                })
            }
        }
        return r
    }
 
    function str(s: State) {
        return s.x + "-" + s.y
    }

    interface State extends Pos {
        time: number
    }
    
    interface Pos {
        x: number,
        y: number
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const gateWays: Record<string, Pos[]> = {}
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')
    // x then y
    const actualGateWays: Record<number, Record<number, Gate>> = {}

    for (let y = 0; y < input.length - 1; y++) {
        for (let x = 0; x < input[y].length - 1; x++) {
            if (letters.includes(input[y][x])) {
                let pos = {x,y}
                let name = input[y][x]
                if (letters.includes(input[y][x+1])) {
                    pos.x += input[y][x-1] == '.' ? -1 : 2
                    name += input[y][x+1]
                }
                if (letters.includes(input[y+1][x])) {
                    pos.y += y != 0 && input[y-1][x] == '.' ? -1:2
                    name += input[y+1][x]
                }
                if (name.length == 1) continue
                if (gateWays[name] == undefined) gateWays[name] = []
                gateWays[name].push(pos)
            }
        }
    }
    for (const k of Object.keys(gateWays)) {
        if (gateWays[k].length == 1) continue
        const p1 = gateWays[k][0]
        const p2 = gateWays[k][1]

        if (actualGateWays[p1.x] == undefined) actualGateWays[p1.x] = {}
        if (actualGateWays[p2.x] == undefined) actualGateWays[p2.x] = {}

        const p1IsOutsideRing = p1.x == 2 || p1.y == 2 || p1.x == input[0].length - 3 || p1.y == input.length - 3

        actualGateWays[p1.x][p1.y] = {...p2, depthModifier: p1IsOutsideRing ? -1:1}
        actualGateWays[p2.x][p2.y] = {...p1, depthModifier: p1IsOutsideRing ? 1:-1}
    }


    const goal = gateWays['ZZ'][0]
    const queue = new MinHeap<State>()
    queue.push({...gateWays['AA'][0], time: 0, depth:0},0)
    const visited = new Map<string, number>()
    let minTotal = Infinity

    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (q.time >= minTotal) continue
        if (q.depth < 0) continue
        const k = str(q)
        if ((visited.get(k)??Infinity) < q.time) continue
        visited.set(k, q.time)

        if (q.x == goal.x && q.y == goal.y && q.depth == 0) {
            minTotal = q.time
            continue
        }

        const next = getNextStates(q)
        next.forEach(n => queue.push(n,n.time))
    }
    console.log(minTotal)

    function getNextStates(s: State) {
        const r: State[] = []
        for (let d of [[1,0],[-1,0],[0,-1],[0,1]]) {
            const nX = s.x+d[0]
            const nY = s.y+d[1]
            if (input[nY][nX] != '.') continue
            if (actualGateWays[nX] != undefined && actualGateWays[nX][nY] != undefined) {
                r.push({
                    x: actualGateWays[nX][nY].x,
                    y: actualGateWays[nX][nY].y,
                    time: s.time+2,
                    depth:s.depth+actualGateWays[nX][nY].depthModifier
                })
            } else {
                r.push({
                    x: nX,y:nY,time:s.time+1,depth:s.depth
                })
            }
        }
        return r
    }
 
    function str(s: State) {
        return s.x + "-" + s.y + '-' + s.depth 
    }

    interface State extends AcPos {
        time: number
    }
    
    interface Pos {
        x: number,
        y: number
    }

    interface Gate extends Pos {
        depthModifier: number
    }

    interface AcPos extends Pos {
        depth:  number
    }
}

