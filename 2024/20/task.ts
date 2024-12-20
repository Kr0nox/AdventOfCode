import {  Queue } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const grid = input.map(i => i.split(''))

    let start = [0,0]
    let end = [0,0]
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'S') start = [x,y]
            if (grid[y][x] == 'E') end = [x,y]
        }
    }
    const queue = new Queue<State>()
    const distancesFromStart = new Map<string, number>()
    const distancesFromEnd = new Map<string, number>()
    queue.push({x:start[0], y: start[1], d: 0})

    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (grid[q.y][q.x] == '#') continue
        const k = q.x + '|' + q.y
        if (distancesFromStart.has(k)) continue
        distancesFromStart.set(k, q.d)

        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            queue.push({
                x: q.x + dir[0],
                y: q.y + dir[1],
                d: q.d+1
            })
        }
    }
    queue.push({x:end[0], y: end[1], d: 0})
    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (grid[q.y][q.x] == '#') continue
        const k = q.x + '|' + q.y
        if (distancesFromEnd.has(k)) continue
        distancesFromEnd.set(k, q.d)

        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            queue.push({
                x: q.x + dir[0],
                y: q.y + dir[1],
                d: q.d+1
            })
        }
    }
    let totalDistance = distancesFromStart.get(end[0]+'|'+end[1])!
    let s = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') continue
            const distanceToGetHere = distancesFromStart.get(x+'|'+y)!
            for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
                if (grid[y+dir[1]][x+dir[0]] == '#') {
                    try {
                        if (grid[y+2*dir[1]][x+2*dir[0]] != '#') {
                            const stillNeeded = distancesFromEnd.get((x+2*dir[0])+'|'+(y+2*dir[1]))!
                            let totalTime = distanceToGetHere + 2 + stillNeeded
                            let savedTime = totalDistance - totalTime
                            if (savedTime >= 100) {
                                s++
                            }
                        }
                    } catch(e){}
                    
                }
            }

        }
    }
    console.log(s)


    interface State {
        x: number
        y: number
        d: number
    }

}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = input.map(i => i.split(''))

    let start = [0,0]
    let end = [0,0]
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'S') start = [x,y]
            if (grid[y][x] == 'E') end = [x,y]
        }
    }
    const queue = new Queue<State>()
    const distancesFromStart = new Map<string, number>()
    const distancesFromEnd = new Map<string, number>()
    queue.push({x:start[0], y: start[1], d: 0})

    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (grid[q.y][q.x] == '#') continue
        const k = q.x + '|' + q.y
        if (distancesFromStart.has(k)) continue
        distancesFromStart.set(k, q.d)

        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            queue.push({
                x: q.x + dir[0],
                y: q.y + dir[1],
                d: q.d+1
            })
        }
    }
    queue.push({x:end[0], y: end[1], d: 0})
    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (grid[q.y][q.x] == '#') continue
        const k = q.x + '|' + q.y
        if (distancesFromEnd.has(k)) continue
        distancesFromEnd.set(k, q.d)

        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            queue.push({
                x: q.x + dir[0],
                y: q.y + dir[1],
                d: q.d+1
            })
        }
    }
    let totalDistance = distancesFromStart.get(end[0]+'|'+end[1])!
    let s = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '#') continue
            const distanceToGetHere = distancesFromStart.get(x+'|'+y)!
            for (let nX =-20; nX <= 20; nX++) {
                for (let nY = -20; nY <= 20; nY++) {
                    if (Math.abs(nX) + Math.abs(nY) > 20) continue
                    if (x + nX < 0 || x + nX >= grid[0].length) continue
                    if (y + nY < 0 || y + nY >= grid.length) continue
                    if (grid[y+nY][x+nX] == '#') continue
                    
                    const stillNeeded = distancesFromEnd.get((x+nX)+'|'+(y+nY))!
                    let totalTime = distanceToGetHere + Math.abs(nX) + Math.abs(nY) + stillNeeded
                    let savedTime = totalDistance - totalTime
                    if (savedTime >= 100) {
                        s++
                    }
                }
            }
        }
    }
    console.log(s)


    interface State {
        x: number
        y: number
        d: number
    }
}

