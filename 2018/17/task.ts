export async function taskOne(input: string[]): Promise<void> {
    const ranges = parseInput(input)
    let minX = 500
    let minY = Infinity
    let maxX = 500
    let maxY = -Infinity
    for (const r of ranges) {
        if (r.x1 < minX) minX = r.x1
        if (r.x2 > maxX) maxX = r.x2
        if (r.y1 < minY) minY = r.y1
        if (r.y2 > maxY) maxY = r.y2
    }
    maxX++
    minX--
    const grid = Array.from({length: maxX-minX+1}, () => Array.from({length: maxY-minY+1}, ()=>WaterState.NONE))
    for (const r of ranges) {
        for (let x = r.x1; x <= r.x2; x++) {
            for (let y = r.y1; y <= r.y2; y++) {
                grid[x-minX][y-minY] = WaterState.SAND
            }
        }
    }
    let curFlowSpots: {x:number,y:number}[] = [{x:500-minX, y:0}]
    grid[500-minX][0] = WaterState.WATER
    //print(grid)

    while(curFlowSpots.length > 0) {
        let newSpots: {x:number,y:number}[] = []
        for (const spot of curFlowSpots) {
            if (spot.y+1 >= grid[0].length) continue
            if (grid[spot.x][spot.y+1] == WaterState.NONE) {
                grid[spot.x][spot.y+1] = WaterState.WATER
                newSpots.push({x: spot.x, y: spot.y+1})
            } else {
                let leftBlocked = false
                let x1 = spot.x-1
                let leftSand = false
                while(x1 >= 0 && grid[x1][spot.y+1] != WaterState.NONE) {
                    if (grid[x1][spot.y] != WaterState.NONE) {
                        leftBlocked = true
                        break
                    } else if(grid[x1][spot.y+1] == WaterState.SAND) {
                        leftSand = true
                    }
                    x1--
                }
                if (!leftBlocked && leftSand) {
                    grid[x1][spot.y] = WaterState.WATER
                    newSpots.push({x:x1,y:spot.y})
                }
                let rightBlocked = false
                let rightSand = false
                let x2 = spot.x+1
                while(x2 < grid.length && grid[x2][spot.y+1] != WaterState.NONE) {
                    if (grid[x2][spot.y] != WaterState.NONE) {
                        rightBlocked = true
                        break
                    } else if(grid[x2][spot.y+1] == WaterState.SAND) {
                        rightSand = true
                    }
                    x2++
                }

                if (!rightBlocked && rightSand) {
                    grid[x2][spot.y] = WaterState.WATER
                    newSpots.push({x:x2,y:spot.y})
                } 
                if (!(!rightBlocked && rightSand) && !(!leftBlocked && leftSand)) {
                    newSpots.push({x:spot.x,y:spot.y-1})
                } 
                if ((leftSand || leftBlocked) && (rightSand||rightBlocked)) {
                    for (let x = x1+1; x < x2; x++) {
                        grid[x][spot.y] = WaterState.WATER
                    }
                }
            }
        }
        curFlowSpots = newSpots
    }
    let count = 0

    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] == WaterState.WATER) count++
        }
    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

interface Range {
    x1: number, x2: number, y1: number, y2: number
}

enum WaterState {
    NONE, SAND, WATER
}

function parseInput(input: string[]) {
    return input.map(i => {
        const p = i.split(', ')
        const r = {} as Range
        
        const n = Number(p[0].split('=')[1])
        const n2 = p[1].split('=')[1].split('..').map(Number)
        if (p[0].startsWith('x')) {
            r.x1 = n
            r.x2 = n
            r.y1 = n2[0]
            r.y2 = n2[1]
        } else {
            r.y1 = n
            r.y2 = n
            r.x1 = n2[0]
            r.x2 = n2[1]
        }
        return r
    })
}

function print(grid: WaterState[][]) {
    const p = Array.from({length: grid[0].length}, () => Array.from({length: grid.length}, () => ' '))
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] == WaterState.WATER) p[y][x] = '~'
            if (grid[x][y] == WaterState.SAND) p[y][x] = '#'
        }
    }
    p.forEach(i => console.log(i.join('')))
}