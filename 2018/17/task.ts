
import { readdir, writeFile } from 'fs/promises';

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
    
    const yLen = grid[0].length
    grid[500-minX][0] = WaterState.WATER
    recurseFrom(500-minX, 0,)
    //print(grid)
    
    await writeFile("test.txt", toStringArray(grid).join('\n'))


    function recurseFrom(x: number, y: number) {
        if (grid[x][y+1] == WaterState.NONE) {
            let curY = y
            while((curY + 1) < yLen && grid[x][curY+1] == WaterState.NONE) curY++
            if ((curY + 1) < yLen) {
                let filledRow = true
                while(curY > y) {
                    while(y < curY && canFillRow(x,curY)) {
                        fillRow(x,curY)
                        filledRow = true
                        curY--
                    }
                    if (filledRow)
                        fillDropRow(x, curY)
                    else 
                        curY--
                    filledRow = false
                }
                
            }
            curY = y + 1
            while(grid[x][curY] == WaterState.NONE) {
                grid[x][curY] = WaterState.WATER
                curY++
            }
            
            
            
        }
    }

    function canFillRow(x: number, y:number) {
        let cX = x
        while(cX < grid.length && grid[cX][y] != WaterState.SAND && grid[cX][y+1] != WaterState.NONE) cX++
        if (cX >= grid.length || grid[cX][y+1] == WaterState.NONE) return false
        cX = x
        while(cX >= 0 && grid[cX][y] != WaterState.SAND && grid[cX][y+1] != WaterState.NONE) cX--
        if (cX < 0 || grid[cX][y+1] == WaterState.NONE) return false
        return true
    }

    function fillRow(x: number, y: number) {
        let cX = x
        while(cX >= 0 && grid[cX][y] != WaterState.SAND && grid[cX][y+1] != WaterState.NONE) cX--
        
        cX++
        while(grid[cX][y] != WaterState.SAND) {
            grid[cX][y] = WaterState.WATER
            cX++
        }
    }

    function fillDropRow(x: number, y: number) {
        let cX = x
        while(cX < grid.length && grid[cX][y+1] != WaterState.NONE && grid[cX][y] != WaterState.SAND) {
            grid[cX][y] = WaterState.WATER
            cX++
        }
        if (cX < grid.length && grid[cX][y+1] == WaterState.NONE && grid[cX][y] != WaterState.SAND) {
            grid[cX][y] = WaterState.WATER
            recurseFrom(cX,y)
        }
        cX = x - 1
        while(cX >= 0 && grid[cX][y+1] != WaterState.NONE && grid[cX][y] != WaterState.SAND) {
            grid[cX][y] = WaterState.WATER
            cX--
        }

        if (cX >= 0 && grid[cX][y+1] == WaterState.NONE && grid[cX][y] != WaterState.SAND) {
            grid[cX][y] = WaterState.WATER
            recurseFrom(cX,y)
        }
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
    console.log(toStringArray(grid))
}

function toStringArray(grid: WaterState[][]) {
    const p = Array.from({length: grid[0].length}, () => Array.from({length: grid.length}, () => ' '))
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] == WaterState.WATER) p[y][x] = '~'
            if (grid[x][y] == WaterState.SAND) p[y][x] = '#'
            //if (grid[x][y] == WaterState.TEST1) p[y][x] = '1'
            //if (grid[x][y] == WaterState.TEST2) p[y][x] = '2'
        }
    }
    return p.map(i => i.join(''))
}