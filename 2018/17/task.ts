export async function taskOne(input: string[]): Promise<void> {
    const grid = task(input)
    let c = 0
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] == WaterState.WATER || grid[x][y] == WaterState.FLOWING) c++
        }
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = task(input)
    let c = 0
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
            if (grid[x][y] == WaterState.WATER) c++
        }
    }
    console.log(c)
}

function task(input: string[]) {
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

    for (let y = grid[0].length-2; y >= 0; y--) {
        let x = 0
        let hadLeft = false
        let hadFloorSinceLast = true
        while(x < grid.length) {
            if (grid[x][y] == WaterState.SAND) {
                if (hadLeft && hadFloorSinceLast) {
                    let dX = x - 1
                    while(grid[dX][y] != WaterState.SAND) {
                        grid[dX][y] = WaterState.POTENTIAL_WATER
                        dX--
                    }
                }
                hadFloorSinceLast = true
                hadLeft = true
            } 
            if (grid[x][y+1] == WaterState.NONE) hadFloorSinceLast = false
            x++
        }
    }
    const yLen = grid[0].length
    drop(500-minX,0)
    return grid

    

    function drop(x: number, y: number) {
        while(y < yLen && grid[x][y] == WaterState.NONE) {
            grid[x][y] = WaterState.FLOWING
            y++
        }
        if (y >= yLen) return
        if (grid[x][y] == WaterState.WATER || grid[x][y] == WaterState.FLOWING) return

        fillPotential(x,y)

        let dX = x + 1
        y--
        while((grid[dX][y+1] == WaterState.SAND || grid[dX][y+1] == WaterState.WATER) && grid[dX][y] == WaterState.NONE) {
            grid[dX][y] = WaterState.FLOWING
            dX++
        }
        
        if (grid[dX][y] == WaterState.NONE) {
            drop(dX, y)
        }

        dX = x - 1
        while((grid[dX][y+1] == WaterState.SAND || grid[dX][y+1] == WaterState.WATER) && grid[dX][y] == WaterState.NONE) {
            grid[dX][y] = WaterState.FLOWING
            dX--
        }
        if (grid[dX][y] == WaterState.NONE) {
            drop(dX, y)
        }
    }

    function fillPotential(x: number, y: number) {
        let tY = y
        while (grid[x][tY] == WaterState.POTENTIAL_WATER) {
            let dX = x
            while(grid[dX][tY] != WaterState.SAND) {
                grid[dX][tY] = WaterState.WATER
                if (grid[dX][tY+1] == WaterState.POTENTIAL_WATER) {
                    fillPotential(dX,tY+1)
                }
                dX++
            }
            dX = x
            while(grid[dX][tY] != WaterState.SAND) {
                grid[dX][tY] = WaterState.WATER
                if (grid[dX][tY+1] == WaterState.POTENTIAL_WATER) {
                    fillPotential(dX,tY+1)
                }
                dX--
            }
            tY++
        }
    }
}


interface Range {
    x1: number, x2: number, y1: number, y2: number
}

enum WaterState {
    NONE, SAND, WATER, POTENTIAL_WATER, FLOWING
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