import {Queue} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const grid = input.map(i => i.split('').map(Number))

    let s = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == 0) {
                s += exploreFrom(x,y)
            }
        }
    }
    console.log(s)

    function exploreFrom(x: number, y: number) {
        const queue = new Queue<Pos>()
        const visited = new Set<string>()
        let nines = 0
        queue.push({x,y})
        while(!queue.isEmpty()) {
            const q = queue.pop()
            const k = q.x + '|' + q.y
            if (visited.has(k)) continue
            visited.add(k)
            if (grid[q.y][q.x] == 9) {
                nines++
                continue
            }
            for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                if (q.x+d[1] < 0 || q.y+d[0] < 0 || q.x+d[1] >= grid[0].length || q.y+d[0] >= grid.length) continue
                if (grid[q.y+d[0]][q.x+d[1]] == grid[q.y][q.x] + 1) {
                    queue.push({y:q.y+d[0],x:q.x+d[1]})
                }
            }
        }
        return nines
    }

    interface Pos {
        x: number
        y: number
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = input.map(i => i.split('').map(Number))

    let s = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] == 0) {
                s += exploreFrom(x,y)
            }
        }
    }
    console.log(s)

    function exploreFrom(x: number, y: number) {
        const queue = new Queue<Pos>()
        let nines = 0
        queue.push({x,y})
        while(!queue.isEmpty()) {
            const q = queue.pop()

            if (grid[q.y][q.x] == 9) {
                nines++
                continue
            }
            for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                if (q.x+d[1] < 0 || q.y+d[0] < 0 || q.x+d[1] >= grid[0].length || q.y+d[0] >= grid.length) continue
                if (grid[q.y+d[0]][q.x+d[1]] == grid[q.y][q.x] + 1) {
                    queue.push({y:q.y+d[0],x:q.x+d[1]})
                }
            }
        }
        return nines
    }

    interface Pos {
        x: number
        y: number
    }
}