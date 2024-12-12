import {lcmArr, lcm, gcd, ComplexNumber,  Stack, Queue, JsonSet, FunctionSet, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    
    const visited = new Set<string>()
    const grid = input.map(i => i.split(''))

    let s = 0

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const k = x+'|'+y
            if (visited.has(k)) continue
            let curArea = 0
            let curEdge = 0

            const queue = new Queue<State>()
            queue.push({x,y})
            
            while(!queue.isEmpty()) {
                const q = queue.pop()
                if (q.x < 0 || q.y < 0 || q.x >= grid[0].length || q.y >= grid.length) continue
                const k = q.x + '|' + q.y
                if (visited.has(k)) continue
                visited.add(k)

                curArea++
                        if (get(q.x-1,q.y) != grid[y][x]) curEdge++
                        if (get(q.x+1,q.y) != grid[y][x]) curEdge++
                        if (get(q.x,q.y-1) != grid[y][x]) curEdge++
                        if (get(q.x,q.y+1) != grid[y][x]) curEdge++
            
                for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    if (get(q.x+d[0], q.y+d[1]) != grid[y][x]) continue
                    queue.push({x:q.x+d[0],y:q.y+d[1]})
                }
            }

            s += curArea*curEdge
        }
    }
    console.log(s)

    function get(x: number, y: number) {
        if (x < 0 || x >= grid[0].length) return ' '
        if (y < 0 || y >= grid.length) return ' '
        return grid[y][x]
    }
    

    
    interface State {
        x: number
        y: number
    }
}

export async function taskTwo(input: string[]): Promise<void> {
 
    const visited = new Set<string>()
    const grid = input.map(i => i.split(''))

    let s = 0
    const areaMap: Record<string, number> = {}
    const sideLengthMap: Record<string, number> = {}
    const waitingFor: Record<string, string[]> = {}

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const k = x+'|'+y
            if (visited.has(k)) continue
            let curArea = 0
            const edgeSet = new Set<string>()

            const queue = new Queue<State>()
            queue.push({x,y})
            while(!queue.isEmpty()) {
                const q = queue.pop()
                if (q.x < 0 || q.y < 0 || q.x >= grid[0].length || q.y >= grid.length) continue
                const k = q.x + '|' + q.y
                if (visited.has(k)) continue
                visited.add(k)

                curArea++
                if (get(q.x-1,q.y) != grid[y][x]) edgeSet.add((q.x-1)+'|'+q.y)
                if (get(q.x+1,q.y) != grid[y][x]) edgeSet.add((q.x+1)+'|'+q.y)
                if (get(q.x,q.y-1) != grid[y][x]) edgeSet.add(q.x+'|'+(q.y-1))
                if (get(q.x,q.y+1) != grid[y][x]) edgeSet.add(q.x+'|'+(q.y+1))
            
                for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    if (get(q.x+d[0], q.y+d[1]) != grid[y][x]) continue
                    queue.push({x:q.x+d[0],y:q.y+d[1]})
                }
            }

            
            let edgeCount = getEdgeFor(x,y,edgeSet, (x,y,_)=>x+'|'+y)
            sideLengthMap[k] = edgeCount
            waitingFor[k] = []
            areaMap[k] = curArea
            
            while (edgeSet.size > 0) {
                const p = Array.from(edgeSet)[0].split('|').map(Number)
                queue.push({x:p[0],y:p[1]})
                let minY = Infinity
                let minX = Infinity
                const v2 = new Set<string>()
                while(!queue.isEmpty()) {
                    const q = queue.pop()
                    if (get(q.x,q.y) != grid[p[1]][p[0]]) continue
                    const k = q.x+'|'+q.y
                    if (v2.has(k)) continue
                    v2.add(k)
                    if (q.y < minY) {
                        minY = q.y
                        minX = q.x
                    } else if (q.y == minY) {
                        if (q.x < minX) minX = q.x
                    }
                    edgeSet.delete(k)
                    queue.push({x:q.x,y:q.y+1})
                    queue.push({x:q.x+1,y:q.y})
                    queue.push({x:q.x,y:q.y-1})
                    queue.push({x:q.x-1,y:q.y})
                }
                waitingFor[k].push(minX+'|'+minY)
            }
            waitingFor[k] = waitingFor[k].filter((i,idx) => waitingFor[k].indexOf(i) == idx)
        }
    }

    console.log(
    Object.keys(areaMap).map(k => areaMap[k]*getE(k)).reduce((a,b)=>a+b,0))

    

    function getE(k: string): number {
        if (waitingFor[k].length == 0) return sideLengthMap[k]

        let v = sideLengthMap[k] + waitingFor[k].map(i => getE(i)).reduce((a,b)=>a+b,0)
        sideLengthMap[k] = v
        waitingFor[k] = []

        return v
    }

    function get(x: number, y: number, n = 1) {
        if (x < 0 || x >= grid[0].length) return n == 1 ? '+' : '-'
        if (y < 0 || y >= grid.length) return n == 1 ? '+' : '-'
        return grid[y][x]
    }
    
    function getEdgeFor(x: number, y: number, set: Set<string>, sF: (x: number, y: number, d: ComplexNumber) => string) {
        let edgeCount = 0
            let cur = {x,y:y-1}
            let dir = new ComplexNumber(1, 0)
            let start = {x:cur.x,y:cur.y}
            do {
                let sideCheck = dir.mul(ComplexNumber.i)
                if (get(cur.x + sideCheck.rel, cur.y +sideCheck.img) != grid[y][x]) {
                    dir = sideCheck
                    edgeCount++
                    cur.x += dir.rel
                    cur.y += dir.img
                } else if (get(cur.x + dir.rel, cur.y + dir.img) == grid[y][x] && get(cur.x + dir.rel - dir.img, cur.y + dir.rel + dir.img) == grid[y][x]) {
                    dir.mulAdd(new ComplexNumber(0, -1))
                    edgeCount++
                } else {
                    cur.x += dir.rel
                    cur.y += dir.img
                }
                set.delete(sF(cur.x, cur.y, dir))
            } while(cur.x != start.x || cur.y != start.y)
            
            return edgeCount
    }

    
    interface State {
        x: number
        y: number
    }
}

/*
const grid = input.map(i => i.split(''))

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {

    }
}


const queue = new Queue<State>()
const visited = new Set<string>()
queue.push()

while(!queue.isEmpty()) {
    const q = q.pop()
    const k = q.x + '|' + q.y
    if (visited.has(k)) continue
    visited.add(k)

    for () {
        queue.push()
    }
}

interface State {
    x: number
    y: number
}

*/
