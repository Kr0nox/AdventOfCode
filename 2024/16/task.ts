import { ComplexNumber, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const grid = input.map(i => i.split(''))

    let start = [-1,-1]
    let end = [-1,-1]
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if(grid[y][x] == 'E') end = [x,y]
            if (grid[y][x] == 'S') start = [x,y]
        }
    }
    
    
    const queue = new MinHeap<State>()
    const visited = new Map<string, number>()
    queue.push({
        x: start[0], y: start[1], d:0, dir: new ComplexNumber(1,0)
    }, 0)
    
    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (grid[q.y][q.x] == '#') continue
        const k = q.x + '|' + q.y + '|' +q.dir.rel + '|' + q.dir.img
        if (visited.get(k) ?? Infinity < q.d) continue
        visited.set(k, q.d)
    
        if (q.x == end[0] && q.y == end[1]) {
            console.log(q.d)
            return
        }

        queue.push({
            x: q.x + q.dir.rel,
            y: q.y + q.dir.img,
            d: q.d+1,
            dir: q.dir
        }, q.d+1)
        queue.push({
            x:q.x,
            y:q.y,
            d: q.d+1000,
            dir: q.dir.mul(new ComplexNumber(0,1))
        },q.d+1000)
        queue.push({
            x:q.x,
            y:q.y,
            d: q.d+1000,
            dir: q.dir.mul(new ComplexNumber(0,-1))
        },q.d+1000)
    }
    
    interface State {
        x: number
        y: number,
        dir: ComplexNumber
        d: number
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = input.map(i => i.split(''))

    let start = [-1,-1]
    let end = [-1,-1]
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if(grid[y][x] == 'E') end = [x,y]
            if (grid[y][x] == 'S') start = [x,y]
        }
    }
    
    
    const queue = new MinHeap<State>()
    const visited = new Map<string, number>()
    const parents = new Map<string, Set<string>>()
    queue.push({
        x: start[0], y: start[1], d:0, dir: new ComplexNumber(1,0), v: new Set<string>()
    }, 0)
    let minD = Infinity
    let total = new Set<string>()
    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (grid[q.y][q.x] == '#') continue
        if (q.d > minD) continue
        const k = q.x + '|' + q.y + '|' +q.dir.rel + '|' + q.dir.img
        if ((visited.get(k) ?? Infinity) < q.d) continue
        visited.set(k, q.d)
    
        if (q.x == end[0] && q.y == end[1]) {
            q.v.forEach(v => total.add(v))
            minD = q.d
            continue
        }

        const c = new Set(q.v);
        c.add(q.x + '|' + q.y)
        queue.push({
            x: q.x + q.dir.rel,
            y: q.y + q.dir.img,
            d: q.d+1,
            v: c,
            dir: q.dir
        }, q.d+1)
        queue.push({
            x:q.x,
            y:q.y,
            v: q.v,
            d: q.d+1000,
            dir: q.dir.mul(new ComplexNumber(0,1))
        },q.d+1000)
        queue.push({
            x:q.x,
            y:q.y,
            v: q.v,
            d: q.d+1000,
            dir: q.dir.mul(new ComplexNumber(0,-1))
        },q.d+1000)
    }
    console.log(total.size + 1)

    
    interface State {
        x: number
        y: number,
        v: Set<string>
        dir: ComplexNumber,
        d: number
    }
}
