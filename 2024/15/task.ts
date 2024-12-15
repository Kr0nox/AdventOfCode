export async function taskOne(input: string[]): Promise<void> {
    let i = 0
    const grid: string[][] = []
    while (input[i] != '') {
        grid.push(input[i].split(''))
        i++
    }
    i++
    let instructions = ''
    while(i < input.length) {
        instructions += input[i]
        i++
    }
    let pos = [-1,-1]
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == '@') pos = [y,x]
        }
    }

    for (const i of instructions) {
        let dir = [0,0]
        if (i == '>') dir = [0,1]
        if (i == '<') dir = [0,-1]
        if (i == 'v') dir = [1,0]
        if (i == '^') dir = [-1,0]

        let c = [pos[0], pos[1]]
        let foundFree = false
        while(grid[c[0]][c[1]] != '#') {
            if (grid[c[0]][c[1]] == '.') {
                foundFree = true
                break
            }
            c[0] += dir[0]
            c[1] += dir[1]
        }
        if (!foundFree) continue


        while(c[0] != pos[0] || c[1] != pos[1]) {
            grid[c[0]][c[1]] = grid[c[0]-dir[0]][c[1]-dir[1]]
            grid[c[0]-dir[0]][c[1]-dir[1]] = '.'
            c[0] -= dir[0]
            c[1] -= dir[1]
        }
        pos[0] += dir[0]
        pos[1] += dir[1]
    }

    let s = 0
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] == 'O') {
                s += y*100+x
            }
        }
    }  
    console.log(s)  
}

export async function taskTwo(input: string[]): Promise<void> {
    let i = 0
    let oggrid: string[][] = []
    while (input[i] != '') {
        const row: string[] = []
        for (const c of input[i]) {
            if (c == '#') {
                row.push('#')
                row.push('#')
            } else
            if (c == '.') {
                row.push('.')
                row.push('.')
            } else
            if (c == '@') {
                row.push('@')
                row.push('.')
            } else
            if (c == 'O') {
                row.push('[')
                row.push(']')
            }
        }
        oggrid.push(row)
        i++
    }
    i++
    let instructions = ''
    while(i < input.length) {
        instructions += input[i]
        i++
    }
    let pos = [-1,-1]
    for (let y = 0; y < oggrid.length; y++) {
        for (let x = 0; x < oggrid[y].length; x++) {
            if (oggrid[y][x] == '@') pos = [y,x]
        }
    }

    for (const i of instructions) {
        const grid = JSON.parse(JSON.stringify(oggrid)) as string[][]
        let dir = [0,0]
        if (i == '>') dir = [0,1]
        if (i == '<') dir = [0,-1]
        if (i == 'v') dir = [1,0]
        if (i == '^') dir = [-1,0]

        let c = [pos[0], pos[1]]
        let foundEmpty = false
        while(grid[c[0]][c[1]] != '#') {
            if (grid[c[0]][c[1]] == '.') {
                foundEmpty = true
                break
            }

            c[0] += dir[0]
            c[1] += dir[1]
        }

        if (!foundEmpty) continue

        if (dir[0] == 0) {
            while(c[0] != pos[0] || c[1] != pos[1]) {
                grid[c[0]][c[1]] = grid[c[0]-dir[0]][c[1]-dir[1]]
                grid[c[0]-dir[0]][c[1]-dir[1]] = '.'
                c[0] -= dir[0]
                c[1] -= dir[1]
            }
        } else {
            if (!push(pos[1],pos[0],dir[1],dir[0])) continue
        }

        pos[0] += dir[0]
        pos[1] += dir[1]
        oggrid = grid

        function push(x: number, y: number, dX: number, dY: number): boolean {
            let orth = new ComplexNumber(1,0)
            if (grid[y+dY][x+dX] == '#') return false
            if (grid[y+dY][x+dX] == '.') {
                grid[y+dY][x+dX] = grid[y][x]
                grid[y][x] = '.'
                return true
            }
            if (grid[y+dY][x+dX] == '[') {
                if (!push(x+orth.rel+dX,y+orth.img+dY,dX,dY)) return false
                if (!push(x+dX,y+dY,dX,dY)) return false
                grid[y+dY][x+dX] = grid[y][x]
                grid[y][x] = '.'
                return true
            }
            if (grid[y+dY][x+dX] == ']') {
                if (!push(x-orth.rel+dX,y-orth.img+dY,dX,dY)) return false
                if (!push(x+dX,y+dY,dX,dY)) return false
                grid[y+dY][x+dX] = grid[y][x]
                grid[y][x] = '.'
                return true
            }


            throw "how?"
        }
    }

    let s = 0
    for (let y = 0; y < oggrid.length; y++) {
        for (let x = 0; x < oggrid[y].length; x++) {
            if (oggrid[y][x] == '[') {
                s += y*100+x
            }
        }
    }  
    console.log(s)  
    
}