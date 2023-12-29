export async function taskOne(input: string[]): Promise<void> {
    const maxX = Math.max(...input.slice(0,-2).map(i => i.length))
    const grid = Array.from({length:input.length}, ()=>Array.from({length: maxX + 2}, ()=>' '))
    input.slice(0,-2).forEach((i, ind) => {
        i.split("").forEach((j, jnd)=>{
            grid[ind + 1][jnd + 1] = j 
        })
    })

    let dirX = 1
    let dirY = 0
    let y = 1
    let x = 0
    while(grid[1][x] == ' ') {x++}
    let i = 0;
    const instructions = input[input.length-1]
    while(i < instructions.length) {
        let test = ""
        while(i < instructions.length && !['L','R'].includes(instructions[i])) {
            test += instructions[i]
            i++
        }
        const steps = parseInt(test.trim())
        for (let j = 0; j < steps; j++) {
            if (grid[y+dirY][x+dirX] == '#') break
            else if (grid[y+dirY][x+dirX] == ' ') {
                let _x = dirX == 0 ? x : (dirX > 0 ? 0 : grid[0].length-1)
                let _y = dirY == 0 ? y : (dirY > 0 ? 0 : grid.length-1)
                while(grid[_y][_x] == ' ') {
                    _x += dirX
                    _y += dirY
                }
                if (grid[_y][_x] == '#') break
                else {
                    x = _x
                    y = _y
                }
            } else {
                x += dirX
                y += dirY
            }
        }
        
        if (i < instructions.length) {
            if (instructions[i] == 'R') {
                const newX = -dirY
                const newY = dirX
                dirX = newX
                dirY = newY
            } else {
                const newX = dirY
                const newY = -dirX
                dirX = newX
                dirY = newY
            }
        }
        i++
    }
    let F = -1
    if (dirX == 1 && dirY == 0) F = 0
    if (dirX == -1 && dirY == 0) F = 2
    if (dirX == 0 && dirY == 1) F = 1
    if (dirX == 0 && dirY == -1) F = 3
    console.log(y, x, dirX, dirY,F)
    console.log(1000*y+4*x+F)
}

export async function taskTwo(input: string[]): Promise<void> {
    const maxX = Math.max(...input.slice(0,-2).map(i => i.length))
    const grid = Array.from({length:input.length}, ()=>Array.from({length: maxX + 2}, ()=>' '))
    input.slice(0,-2).forEach((i, ind) => {
        i.split("").forEach((j, jnd)=>{
            grid[ind + 1][jnd + 1] = j 
        })
    })
    const sideLength = 50
    const sideMap = getCubeEntrySides(grid, sideLength)

    let dirX = 1
    let dirY = 0
    let y = 1
    let x = 0
    while(grid[1][x] == ' ') {x++}
    let i = 0;
    const instructions = input[input.length-1]
    while(i < instructions.length) {
        let test = ""
        while(i < instructions.length && !['L','R'].includes(instructions[i])) {
            test += instructions[i]
            i++
        }
        const steps = parseInt(test.trim())
        for (let j = 0; j < steps; j++) {
            if (grid[y+dirY][x+dirX] == '#') break
            else if (grid[y+dirY][x+dirX] == ' ') {
                //console.log('space')
                //console.log(x,y, dirX, dirY)
                const [_x, _y, _dirX, _dirY] = newPosDir(x,y, dirX, dirY, sideMap, sideLength)
                //console.log(_x, _y, _dirX, _dirY)
                //console.log(" ")
                if (grid[_y][_x] == '#') break
                else {
                    x = _x
                    y = _y
                    dirX = _dirX
                    dirY = _dirY
                }
            } else {
                x += dirX
                y += dirY
            }
        }
        //console.log(x,y)
        
        if (i < instructions.length) {
            if (instructions[i] == 'R') {
                const newX = -dirY
                const newY = dirX
                dirX = newX
                dirY = newY
            } else {
                const newX = dirY
                const newY = -dirX
                dirX = newX
                dirY = newY
            }
        }
        i++
    }
    let F = -1
    if (dirX == 1 && dirY == 0) F = 0
    if (dirX == -1 && dirY == 0) F = 2
    if (dirX == 0 && dirY == 1) F = 1
    if (dirX == 0 && dirY == -1) F = 3
    console.log(y, x, dirX, dirY,F)
    console.log(1000*y+4*x+F)
}

type CubeSide = 't'|'b'|'l'|'r'
type SideMap = Record<CubeSide, [number, number, CubeSide]>

function getNewPos(exit: CubeSide, entry: CubeSide, s: [number, number], l: number): [number, number] {
    if (exit == 't') {
        if (entry == 't') return [l-s[0]+1,1]
        if (entry == 'b') return [s[0], l]
        if (entry == 'l') return [1, s[0]]
        if (entry == 'r') return [l, l-s[0]+1]
    }
    if (exit == 'b') {
        if (entry == 'b') return [l-s[0]+1, l]
        if (entry == 't') return [s[0], 1]
        if (entry == 'l') return [1, l-s[0]+1]
        if (entry == 'r') return [l, s[0]]
    }
    if (exit == 'l') {
        if (entry == 'l') return [1, l-s[1]+1]
        if (entry == 'r') return [l, s[0]]
        if (entry == 't') return [s[1], 1]
        if (entry == 'b') return [l-s[1]+1 ,l]
    }
    if (exit == 'r') {
        if (entry == 'r') return [l, l-s[1]+1]
        if (entry == 'l') return [1, s[1]]
        if (entry == 't') return [l-s[1]+1, 1]
        if (entry == 'b') return [s[1], l]
    }

    console.log(exit, entry, s, l)
    throw "Could not map exit to entry"

}

function entryDir(entry: CubeSide): [number, number] {
    switch(entry) {
        case 't': return [0, 1]
        case 'b': return [0, -1]
        case 'r': return [1, 0]
        case 'l': return [-1, 0] 
    }
}

function exitSide(xDir: number, yDir: number): CubeSide {
    if (xDir == 1) return 'r'
    if (xDir == -1) return 'l'
    if (yDir == 1) return 'b'
    if (yDir == -1) return 't'
    throw "Unknown Dir"
}

function getCubeEntrySides(grid: string[][], sideLength: number) {
    const isSide = Array.from({length: (grid.length-2)/sideLength}, () => Array.from({length: (grid[0].length-2)/sideLength}, () => false))
    for (let y = 1; y < grid.length-1; y+=sideLength) {
        for (let x = 1; x < grid[y].length-1; x+=sideLength) {
            //console.log(y,x, (y-1)/sideLength, (x-1)/sideLength)
            isSide[(y-1)/sideLength][(x-1)/sideLength] = grid[y][x] != ' '
        }
    }

    const sides:SideMap[][] = isSide.map((i) => i.map((j) => ({} as SideMap)))

    for (let i = 0; i < sides.length; i++) {
        for (let j = 0; j < sides[i].length -1; j++) {
            if (!isSide[i][j]) continue
            if (isSide[i][j+1]) {
                sides[i][j]['r'] = [i, j+1, 'l'];
                sides[i][j+1]['l'] = [i, j, 'r']
            }
            if (i+1 >= sides.length) continue
            if (isSide[i+1][j]) {
                sides[i][j]['b'] = [i+1, j, 't']
                sides[i+1][j]['t'] = [i, j, 'b']
            }
        }
    }
    let updated = false
    const clockwise: Record<CubeSide, CubeSide> = {
        'l': 't',
        't': 'r',
        'r': 'b',
        'b': 'l'
    }
    const cClockwise: Record<CubeSide, CubeSide> = {
        'r': 't',
        't': 'l',
        'l': 'b',
        'b': 'r'
    }
    do {
         updated = false
        for (let i = 0; i < sides.length; i++) {
            for (let j = 0; j < sides[i].length; j++) {
                if (!isSide[i][j]) continue
                for (const d of ['t','b','l','r'] as CubeSide[]) {
                    if (sides[i][j][d] != undefined) continue
                    for (const c of [clockwise, cClockwise]) {
                        const aC1 = sides[i][j][c[d]]
                        if (aC1 == undefined) continue
                        const ac2 = sides[aC1[0]][aC1[1]][c[aC1[2]]]
                        if (ac2 == undefined) continue
                        sides[i][j][d] = [ac2[0],ac2[1],c[ac2[2]]]
                        sides[ac2[0]][ac2[1]][c[ac2[2]]] = [i,j,d]
                        updated = true
                    }
                }
            }
        }

    } while(updated)

    console.log(sides)

    return sides
}

function newPosDir(x: number, y: number, dirX: number, dirY: number, sideMap: SideMap[][], sideLength = 50): number[] {
    const fieldX = Math.floor((x-1)/sideLength)
    const fieldY = Math.floor((y-1)/sideLength)
    //console.log(fieldX, fieldY)

    const exit = exitSide(dirX, dirY)
    const next = sideMap[fieldY][fieldX][exit]
    const newPos = getNewPos(exit, next[2], [x-fieldX*sideLength,y-fieldY*sideLength], sideLength)
    const newDir = entryDir(next[2])

    return [newPos[0]+next[1]*sideLength, newPos[1]+next[0]*sideLength, newDir[0], newDir[1]]
}
