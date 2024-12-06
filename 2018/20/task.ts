import {Queue} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    let edges = new Set<string>()

    process(input[0].substring(1, input[0].length-1), [[0,0]])
    //console.log(edges.size, edges)

    const minDistances = new Map<string, number>()
    const queue = new Queue<Position>()
    queue.push({x:0,y:0,d:0})
    let max = 0
    while(!queue.isEmpty()) {
        const q = queue.pop()
        const k = q.x + '_' + q.y
        if (minDistances.has(k)) continue
        minDistances.set(k, q.d)
        if (q.d > max) max = q.d
        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const a = s([q.x+dir[0],q.y+dir[1]],[q.x,q.y])
            if (edges.has(a)) {
                queue.push({x:q.x+dir[0],y:q.y+dir[1],d:q.d+1})
            }
        }
    }
    console.log(max)

    function process(re: string, pos: number[][]): number[][] {
        let ors: string[] = []
        let openBrackets = 0
        let cur = ''
        let i = 0
        while(i < re.length) {
            if (re[i] == '(') {
                openBrackets++
                cur += re[i]
            } else if (re[i] == ')') {
                openBrackets--
                cur += re[i]
            } else if (re[i] == '|' && openBrackets == 0) {
                ors.push(cur)
                cur = ''
            } else {
                cur += re[i]
            }
            i++
        }
        ors.push(cur)
        const finalPos: number[][] = []
        for (const r of ors) {
            let newPos = copy(pos)
            for (let l = 0; l < r.length; l++) {
                if (r[l] == '(') {
                    let lastBrack = l
                    let openBrackets = 0
                    do {
                        if (r[lastBrack] == '(') openBrackets++
                        if (r[lastBrack] == ')') openBrackets--
                        lastBrack++
                    } while(openBrackets > 0);
                    const result = process(r.substring(l+1, lastBrack-1),newPos)
                    newPos = result
                    l = lastBrack - 1
                    continue
                } else {
                    const d = [0,0]
                    if (r[l] == 'N') {
                        d[1] = -1
                    } else if (r[l] == 'S') {
                        d[1] = 1
                    } else if (r[l] == 'W') {
                        d[0] = -1
                    } else if (r[l] == 'E') {
                        d[0] = 1
                    } else {
                        //console.log(r[l])
                    }
                    for (let p = 0; p < newPos.length; p++) {
                        addEdge(newPos[p], [newPos[p][0]+d[0],newPos[p][1]+d[1]])
                        newPos[p][0] += d[0]
                        newPos[p][1] += d[1]
                    }
                }
            }
            newPos.forEach(element => finalPos.push(element))
        }
        

        // deduplicate
        return finalPos.filter((p,idx) => finalPos.findIndex(j => p[0]==j[0]&&p[1]==j[1]) == idx)
    }

    function addEdge(e1: number[], e2: number[]) {
        
        edges.add(s(e1,e2))
        
    }
    function s(e1: number[],e2:number[]) {

        if (e1[0] == e2[0]) {
            if (e1[1] < e2[1]) {
                return si(e1,e2)
            } else {
                return si(e2,e1)
            }
        } else {
            if (e1[0] < e2[0]) {
                return si(e1,e2)
            } else {
                return si(e2,e1)
            }
        }
        function si(c1: number[],c2:number[]) {

            return `${c1[0]}_${c1[1]}|${c2[0]}_${c2[1]}`
        }

    }
    interface Position {
        x: number,y:number,d:number
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    let edges = new Set<string>()

    process(input[0].substring(1, input[0].length-1), [[0,0]])
    //console.log(edges.size, edges)

    const minDistances = new Map<string, number>()
    const queue = new Queue<Position>()
    queue.push({x:0,y:0,d:0})
    let count = 0
    while(!queue.isEmpty()) {
        const q = queue.pop()
        const k = q.x + '_' + q.y
        if (minDistances.has(k)) continue
        minDistances.set(k, q.d)
        if (q.d >= 1000) count++
        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            const a = s([q.x+dir[0],q.y+dir[1]],[q.x,q.y])
            if (edges.has(a)) {
                queue.push({x:q.x+dir[0],y:q.y+dir[1],d:q.d+1})
            }
        }
    }
    console.log(count)

    function process(re: string, pos: number[][]): number[][] {
        let ors: string[] = []
        let openBrackets = 0
        let cur = ''
        let i = 0
        while(i < re.length) {
            if (re[i] == '(') {
                openBrackets++
                cur += re[i]
            } else if (re[i] == ')') {
                openBrackets--
                cur += re[i]
            } else if (re[i] == '|' && openBrackets == 0) {
                ors.push(cur)
                cur = ''
            } else {
                cur += re[i]
            }
            i++
        }
        ors.push(cur)
        const finalPos: number[][] = []
        for (const r of ors) {
            let newPos = copy(pos)
            for (let l = 0; l < r.length; l++) {
                if (r[l] == '(') {
                    let lastBrack = l
                    let openBrackets = 0
                    do {
                        if (r[lastBrack] == '(') openBrackets++
                        if (r[lastBrack] == ')') openBrackets--
                        lastBrack++
                    } while(openBrackets > 0);
                    const result = process(r.substring(l+1, lastBrack-1),newPos)
                    newPos = result
                    l = lastBrack - 1
                    continue
                } else {
                    const d = [0,0]
                    if (r[l] == 'N') {
                        d[1] = -1
                    } else if (r[l] == 'S') {
                        d[1] = 1
                    } else if (r[l] == 'W') {
                        d[0] = -1
                    } else if (r[l] == 'E') {
                        d[0] = 1
                    } else {
                        //console.log(r[l])
                    }
                    for (let p = 0; p < newPos.length; p++) {
                        addEdge(newPos[p], [newPos[p][0]+d[0],newPos[p][1]+d[1]])
                        newPos[p][0] += d[0]
                        newPos[p][1] += d[1]
                    }
                }
            }
            newPos.forEach(element => finalPos.push(element))
        }
        

        // deduplicate
        return finalPos.filter((p,idx) => finalPos.findIndex(j => p[0]==j[0]&&p[1]==j[1]) == idx)
    }

    function addEdge(e1: number[], e2: number[]) {
        
        edges.add(s(e1,e2))
        
    }
    function s(e1: number[],e2:number[]) {

        if (e1[0] == e2[0]) {
            if (e1[1] < e2[1]) {
                return si(e1,e2)
            } else {
                return si(e2,e1)
            }
        } else {
            if (e1[0] < e2[0]) {
                return si(e1,e2)
            } else {
                return si(e2,e1)
            }
        }
        function si(c1: number[],c2:number[]) {

            return `${c1[0]}_${c1[1]}|${c2[0]}_${c2[1]}`
        }

    }
    interface Position {
        x: number,y:number,d:number
    }
}

function copy<T>(v:T):T {
    return JSON.parse(JSON.stringify(v))
}