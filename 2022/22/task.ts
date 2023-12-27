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
    //console.log(grid.map(i => i.join("")).join("\n"))

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
                const [_x, _y, _dirX, _dirY] = newPosDir(x,y, dirX, dirY)
                console.log(_x, _y, _dirX, _dirY)
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
        //console.log(dirX, dirY)
        //console.log(" ")
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

function newPosDir(x: number, y: number, dirX: number, dirY: number, sideLength = 50): [number, number, number, number] {
    let fieldX = -1
    if (x >= 1 && x <= sideLength) fieldX = 0
    if (x >= sideLength+1 && x <= 2*sideLength) fieldX = 1
    if (x>=1+2*sideLength && x <= 3*sideLength) fieldX = 2
    if (x >= 4*sideLength) fieldX= 3
    let fieldY = -1
    if (y>=1 && y <= sideLength) fieldY = 0
    if (y>=1+sideLength && y<=2*sideLength) fieldY = 1
    if (y>=1+2*sideLength) fieldY = 2
    let cubeSide = -1
    if (fieldY == 0) cubeSide = 1
    else if (fieldY == 1) {
        cubeSide = [2,3,4][fieldX]
    } else {
        cubeSide = [-1, -1, 5, 6][fieldX]
    }
    console.log('leaving side', cubeSide, 'at', x, y, 'field', fieldX, fieldY, 'with dir', dirX, dirY)

    if (cubeSide == 1) {
        if (dirY == -1) {
            // 2
            return [sideLength - (x-2*sideLength) + 1, 1 + sideLength, 0, 1]
        }
        if (dirX == 1) {
            // 6
            return [4*sideLength, 3* sideLength - y + 1, -1, 0]
        } else {
            return [y+sideLength, 1 + sideLength, 0, -1]
        }
    }

    if (cubeSide == 2) {
        if (dirX == -1) {
            // 6
            return [3*sideLength+(sideLength-(y-sideLength)+1), 3*sideLength, 0, 1]
        } 
        if (dirY == 1) {
            // 5
            return [2*sideLength+ (sideLength-x+1), 3*sideLength, 0, -1]
        } else {
            // 1
            return [2*sideLength + (sideLength- x + 1), 1, 0, 1]
        }
    }

    if (cubeSide == 3) {
        if (dirY == -1) {
            // 1
            return [2*sideLength+1, (x-sideLength), 1, 0]
        } else {
            // 5
            return [3*sideLength+1, 2*sideLength+(sideLength-(x-sideLength)+1), 1, 0]
        }
    }

    if (cubeSide == 4) {
        // 6
        return [3*sideLength + (sideLength-(y-sideLength)+1), 2*sideLength+1, 0, 1]
    }

    // ab hier extra abgezogen schon
    if (cubeSide == 5) {
        if (dirX == -1) {
            //3
            return [sideLength+(sideLength-(y-2*sideLength)+1), 2*sideLength, 0, -1]
        } else {
            // 2
            return [sideLength-(x-2*sideLength)+1, 2*sideLength, 0, -1]
        }
    }

    if (cubeSide == 6) {
        if (dirX == 1) {
            // 1
            return [3*sideLength, sideLength-(y-2*sideLength)+1, -1, 0]
        }
        if (dirY == 1) {
            // 4
            return [3*sideLength, sideLength + (sideLength-(y-3*sideLength)+1), -1, 0]
        } else {
            // 2
            return [1, sideLength+(sideLength-(x-3*sideLength)+1), 1, 0]
        }
    }

    console.log(x,y,fieldX,fieldY,dirX, dirY,cubeSide)
    throw "MEP"
}