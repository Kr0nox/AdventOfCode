import {MinHeap, Queue} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    
    const Q = new Queue<State>()
    const V = new Set<string>()

    let keyCount = 0
    let start = [-1,-1]
    for(let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            const field = input[y][x]
            if (field == '@') {
                start = [y,x] 
                continue
            }
            if (field == '#' || field == '.') continue
            
            if (field.toLowerCase() == field)
                keyCount++
        }
    }


    Q.push({
        t:0,
        x: start[1],
        y: start[0],
        keys: [],
        keysSorted: []
    })

    while(!Q.isEmpty()) {
        const q = Q.pop()
        const k = toString(q)
        // we have reached the same field with the same keys earlier already
        if (V.has(k)) continue

        //console.log(q)

        // is final
        if (q.keys.length == keyCount) {
            console.log(q.t)
            return
        }

        V.add(k)

        for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const nY = q.y+d[0]
            const nX = q.x+d[1]
            const field = input[nY][nX]
            if (field == '#') continue
            if (field == '.' || field == '@') {
                const cop = copy(q)
                cop.t++
                cop.x = nX
                cop.y = nY
                Q.push(cop)
            } else {
                // if is key
                if (field.toLowerCase() == field) {
                    const cop = copy(q)
                    cop.t++
                    if (!cop.keysSorted.includes(field)) {
                        cop.keys.push(field)
                        cop.keysSorted.push(field)
                        cop.keysSorted.sort()
                    }
                    cop.x = nX
                    cop.y = nY
                    Q.push(cop)
                } else {
                    if (q.keysSorted.includes(field.toLowerCase())) {
                        const cop = copy(q)
                        cop.t++
                        cop.x = nX
                        cop.y = nY
                        Q.push(cop)
                    }
                }
            }
        }
    }

    function toString(s: State) {
        return `${s.x}|${s.y}|${s.keysSorted}`
    }

    interface State {
        x: number
        y: number
        t: number
        keys: string[]
        keysSorted: string[]
    }
}

export async function taskTwo(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(''))

    let keyCount = 0
    let start = [-1,-1]
    const startPoints: number[][] = []
    const positions: Record<string, [number, number]> = {}
    for(let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[0].length; x++) {
            const field = input[y][x]
            if (field == '@') {
                start = [y,x] 
                input[y][x-1] = '#'
                input[y][x+1] = '#'
                input[y-1][x] = '#'
                input[y+1][x] = '#'
                input[y][x] = '#'
                startPoints.push([x+1,y+1])
                startPoints.push([x+1,y-1])
                startPoints.push([x-1,y-1])
                startPoints.push([x-1,y+1])
                continue
            }
            if (field == '#' || field == '.') continue
            positions[field] = [x,y]
            if (field.toLowerCase() == field)
                keyCount++
        }
    }
    const a = 'a'.charCodeAt(0)
    const A = 'A'.charCodeAt(0)
    let keyFinal = 0
    const graph: Record<string, Node> = {}
    for (let i = 0; i < keyCount; i++) {
        const key = String.fromCharCode(a+i)
        const door = String.fromCharCode(A+i)
        const keyId = Math.pow(2, i)
        keyFinal += keyId
        
        const keyNeighbours = findDistances(key)

        graph[key] = {
            keyId: keyId,
            isKey: true,
            siblings: Object.keys(keyNeighbours),
            distances: keyNeighbours
        }
        
        if (positions[door] != undefined) {
            const doorNeighbours = findDistances(door)
            graph[door] = {
                keyId: keyId,
                isKey: false,
                siblings: Object.keys(doorNeighbours),
                distances: doorNeighbours
            }
        }
    }
    let si = 0
    for (const sp of startPoints) {
        positions['s'+si] = sp as [number, number]
        const neighbours = findDistances('s'+si)
        graph['s'+si] = {
            keyId: -1,
            isKey: false,
            siblings: Object.keys(neighbours),
            distances: neighbours
        }

        si++
    }

    //console.log(graph)

    const queue = new MinHeap<State>()
    let curMin = Infinity 
    const minDist = new Map<string, number>()
    queue.push({
        pos: ['s0','s1','s2','s3'],
        keys: 0,
        t: 0
    }, 0)
    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (q.t >= curMin) continue
        const k = q.pos + '|' + q.keys
        if ((minDist.get(k)??Infinity) <= q.t) continue
        minDist.set(k, q.t)
        // final check
        if (q.keys == keyFinal) {
            curMin = q.t
            continue
        }

        for(let bot of [0,1,2,3]) {
            const node = graph[q.pos[bot]]
            for (const sib of node.siblings) {
                const nextNode = graph[sib]
                if (!nextNode.isKey) {
                    if ((q.keys & nextNode.keyId) == 0) {
                        continue
                    }
                }

                const cop: State = {
                    pos: [q.pos[0],q.pos[1],q.pos[2],q.pos[3]],
                    keys: q.keys,
                    t: q.t + node.distances[sib]
                }
                cop.pos[bot] = sib

                if (nextNode.isKey) {
                    if ((cop.keys & nextNode.keyId) == 0) {
                        cop.keys += nextNode.keyId
                    }
                }
                queue.push(cop, cop.t)
            }
        }
    }
    console.log(curMin)

    function findDistances(start: string) {
        const queue = new Queue<SearchState>()
        queue.push({
            x:positions[start][0],
            y:positions[start][1],
            d: 0
        })
        const visited = new Set<string>()
        const distances: Record<string, number> = {}
        while(!queue.isEmpty()) {
            const q = queue.pop()
            const k = q.x + '-' + q.y
            if (visited.has(k)) continue
            visited.add(k)
            if (input[q.y][q.x] != '.' && q.d > 0) {
                distances[input[q.y][q.x]] = q.d
                continue
            }

            for (const dir of [[1,0],[0,1],[-1,0],[0,-1]]) {
                const nX = q.x + dir[0]
                const nY = q.y + dir[1]
                if (input[nY][nX] == '#') continue
                queue.push({x:nX,y:nY,d:q.d+1})
            }
        }
        return distances

        interface SearchState {
            x: number, y:number, d: number
        }
    }

    interface State {
        pos: string[]
        keys: number
        t: number
    }

    interface Node {
        keyId: number,
        isKey: boolean
        siblings: string[]
        distances: Record<string, number>
    }
}

function copy<T>(v:T):T {
    return JSON.parse(JSON.stringify(v))
}

