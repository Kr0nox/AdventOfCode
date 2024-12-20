import {MinHeap, Queue} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const depth = Number(input[0].split(' ')[1])
    const target = input[1].split(' ')[1].split(',').map(Number)
    const erosionLevel = Array.from({length: target[0]+1},()=>Array.from({length: target[1]+1}, () => -1))
    erosionLevel[0][0] = (depth) % 20183
    for (let x = 0; x <= target[0]; x++) {
        erosionLevel[x][0] = (x*16807 + depth)%20183
    }
    for (let y = 0; y <= target[1]; y++) {
        erosionLevel[0][y] = (y*48271 + depth)%20183
    }
    for (let x = 1; x <= target[0]; x++) {
        for (let y = 1; y <= target[1]; y++) {
            erosionLevel[x][y] = (erosionLevel[x-1][y]*erosionLevel[x][y-1]+depth)%20183
        }
    }
    erosionLevel[target[0]][target[1]] = (depth) % 20183
    let c = 0
    for (let x = 0; x <= target[0]; x++) {
        for (let y = 0; y <= target[1]; y++) {
            c += erosionLevel[x][y] % 3
        }
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const depth = Number(input[0].split(' ')[1])
    const target = input[1].split(' ')[1].split(',').map(Number)
    const erosionLevel = new Map<string,number>()

    // neither = 0, torch = 1, climbing = 2
    const allowedTools = [
        [1,2],[0,2],[0,1]
    ]

    const queue = new MinHeap<State>()
    const minTime = new Map<string, number>()
    let minTimeElapsed = Infinity
    queue.push({
        x:0,y:0,timeElapsed:0,tool:1
    }, target[0]+target[1])

    while(!queue.isEmpty()) {
        const q = queue.pop()        
        const k = stateString(q)
        if ((minTime.get(k) ?? Infinity) > q.timeElapsed) {
            minTime.set(k, q.timeElapsed)
        } else continue

        if (q.x == target[0] && q.y == target[1] && q.tool == 1) {
            minTimeElapsed = q.timeElapsed
            break
        }

        getNextStates(q).forEach(s => {
            queue.push(s, s.timeElapsed + Math.abs(s.x-target[0])+Math.abs(s.y-target[1]))
        })
    }
    console.log(minTimeElapsed)

    function getNextStates(s: State) {
        const curErosion = getErosion(s.x, s.y) % 3
        let r: State[] = [{
            x:s.x,y:s.y,timeElapsed:s.timeElapsed+7,
            tool:allowedTools[curErosion].filter(x => x != s.tool)[0]
        }]

        for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
            if (s.x + d[0] < 0) continue
            if (s.y + d[1] < 0) continue
            const goalErosion = getErosion(s.x+d[0],s.y+d[1]) % 3
            if (!allowedTools[goalErosion].includes(s.tool)) continue
            r.push({
                x: s.x + d[0],
                y: s.y + d[1],
                tool: s.tool,
                timeElapsed: s.timeElapsed+1
            })
            
        }
        return r
    }

    function getErosion(x: number, y: number): number {
        const k = `${x}|${y}`
        if (erosionLevel.has(k)) return erosionLevel.get(k)!
        let r = -1
        if (x == 0 && y == 0) r = depth % 20183
        else if (x == 0) r = (y*48271+depth)%20183
        else if (y == 0) r = (x*16807+depth)%20183
        else if (x == target[0] && y == target[1]) r = depth % 20183
        else r = (getErosion(x-1,y)*getErosion(x,y-1)+depth)%20183

        erosionLevel.set(k, r)
        return r
    }

    function stateString(s: State) {
        return `${s.x}-${s.y}-${s.tool}`
    }

    interface State {
        x: number
        y: number
        // neither = 0, torch = 1, climbing = 2
        tool: number
        timeElapsed: number
    }
}

function print(grid: number[][]) {
    for (let y = 0; y < grid[0].length; y++) {
        let s = ''
        for(let x = 0; x < grid.length; x++) {
            const g = grid[x][y] % 3
            if (g == 0) s +='.'
            else if (g == 1) s += '='
            else if (g == 2) s += '|'
            else console.log(g)
        }
        console.log(s)
    }
}