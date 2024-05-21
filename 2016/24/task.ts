import {Queue, JsonSet} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const grid = toGrid(input)
    const positions: Record<number, [number, number]> = {}
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] >= 0) {
                positions[grid[x][y]] = [x,y]
            }
        }
    }

    const keys = Object.keys(positions).map(Number)
    const D = Array.from({length:keys.length}, () => Array.from({length:keys.length}, () => 0))
    for(const k1 of keys) {
        for (const k2 of keys) {
            if (k1 <= k2) continue
            const d = shortestWay(k1, k2)
            D[k1][k2] = d
            D[k2][k1] = d
        }
    }

    console.log(findWay([0]))

    function findWay(currentWay: number[]): number {
        const last = currentWay[currentWay.length-1]
        if (currentWay.length == keys.length) return 0
        let min = Infinity
        for (const k of keys) {
            if (currentWay.includes(k)) continue
            const copy = Array.from(currentWay)
            copy.push(k)
            let d = D[last][k] + findWay(copy)
            if (d < min) min = d
        }
        return min
    }

    function shortestWay(s: number, g: number) {
        const Q:Queue<State> = new Queue()
        const V:JsonSet<[number, number]> = new JsonSet()

        Q.push({x:positions[s][0], y:positions[s][1],d:0})

        while(!Q.isEmpty()) {
            const q = Q.pop()
            if (grid[q.x][q.y] < -1) continue
            if(q.x == positions[g][0] && q.y == positions[g][1]) return q.d
            if(V.has([q.x,q.y])) continue
            V.add([q.x,q.y])
            for(const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
                Q.push({x:q.x+dir[0], y:q.y+dir[1],d:q.d+1})
            }
        }
        throw "No way"
    }


    interface State {
        x: number
        y: number
        d: number
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = toGrid(input)
    const positions: Record<number, [number, number]> = {}
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] >= 0) {
                positions[grid[x][y]] = [x,y]
            }
        }
    }

    const keys = Object.keys(positions).map(Number)
    const D = Array.from({length:keys.length}, () => Array.from({length:keys.length}, () => 0))
    for(const k1 of keys) {
        for (const k2 of keys) {
            if (k1 <= k2) continue
            const d = shortestWay(k1, k2)
            D[k1][k2] = d
            D[k2][k1] = d
        }
    }

    console.log(findWay([0]))

    function findWay(currentWay: number[]): number {
        const last = currentWay[currentWay.length-1]
        if (currentWay.length == keys.length) return D[last][0]
        let min = Infinity
        for (const k of keys) {
            if (currentWay.includes(k)) continue
            const copy = Array.from(currentWay)
            copy.push(k)
            let d = D[last][k] + findWay(copy)
            if (d < min) min = d
        }
        return min
    }

    function shortestWay(s: number, g: number) {
        const Q:Queue<State> = new Queue()
        const V:JsonSet<[number, number]> = new JsonSet()

        Q.push({x:positions[s][0], y:positions[s][1],d:0})

        while(!Q.isEmpty()) {
            const q = Q.pop()
            if (grid[q.x][q.y] < -1) continue
            if(q.x == positions[g][0] && q.y == positions[g][1]) return q.d
            if(V.has([q.x,q.y])) continue
            V.add([q.x,q.y])
            for(const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
                Q.push({x:q.x+dir[0], y:q.y+dir[1],d:q.d+1})
            }
        }
        throw "No way"
    }


    interface State {
        x: number
        y: number
        d: number
    }
}



function toGrid(input: string[]): number[][] {
    return input.map(i => i.split('').map(c => {
        if (c == '#') return -2
        if (c == '.') return -1
        return Number(c)
    }))
}

function copy<T>(t:T):T {
    return JSON.parse(JSON.stringify(t))
}