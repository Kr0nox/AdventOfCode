import {Queue} from '../../base/simpleStructure'

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
    const Q = new Queue<State>()
    const V = new Set<string>()

    let keyCount = 0
    let start = [-1,-1]
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
                continue
            }
            if (field == '#' || field == '.') continue
            
            if (field.toLowerCase() == field)
                keyCount++
        }
    }


    Q.push({
        t:0,
        x: [start[1]+1,start[1]+1,start[1]-1,start[1]-1],
        y: [start[0]+1,start[0]-1,start[0]+1,start[0]-1],
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

        for (const r of [0,1,2,3]) {
            for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                const nY = q.y[r]+d[0]
                const nX = q.x[r]+d[1]
                const field = input[nY][nX]
                if (field == '#') continue
                if (field == '.' || field == '@') {
                    const cop = copy(q)
                    cop.t++
                    cop.x[r] = nX
                    cop.y[r] = nY
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
                        cop.x[r] = nX
                        cop.y[r] = nY
                        Q.push(cop)
                    } else {
                        if (q.keysSorted.includes(field.toLowerCase())) {
                            const cop = copy(q)
                            cop.t++
                            cop.x[r] = nX
                            cop.y[r] = nY
                            Q.push(cop)
                        }
                    }
                }
            }
        }
        
    }

    function toString(s: State) {
        return `${s.x.join('-')}|${s.y.join('-')}|${s.keysSorted}`
    }

    interface State {
        x: number[]
        y: number[]
        t: number
        keys: string[]
        keysSorted: string[]
    }
}

function copy<T>(v:T):T {
    return JSON.parse(JSON.stringify(v))
}

