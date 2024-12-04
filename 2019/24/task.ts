export async function taskOne(input: string[]): Promise<void> {
    let grid = input.join('')
    let Y = input.length
    let X = input[0].length

    const seen = new Set<string>()
    while(!seen.has(grid)) {
        seen.add(grid)
        let copy = grid.split('')

        for (let x = 0; x < X; x++) {
            for (let y = 0; y < Y; y++) {
                let nC = 0
                for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    if (get(grid,x+d[0], y+d[1]) == '#') nC++
                }
                if (get(grid,x,y) == '#') {
                    if (nC != 1) copy[x + y*X] = '.'
                } else {
                    if (nC == 1 || nC == 2) copy[x + y*X] = '#'
                }
            }
        }

        grid = copy.join('')
    }
    console.log(grid)
    let s = 0
    for (let y = 0; y < Y; y++) {
        for (let x = 0; x < X; x++) {
            const i = x + y*X
            if (get(grid,x,y) == '#') s += Math.pow(2,i)
        }
    }

    console.log(s)

    function get(s: string, x: number, y: number) {
        if (x < 0) return '.'
        if (y < 0) return '.'
        if (x >= X) return '.'
        if (y >= Y) return '.'
        return s[x + y*X]
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    let startGrid = input.join('')    
    let Y = input.length
    let X = input[0].length
    let grid: Record<number, string> = {0: startGrid}
    let curMax = 0
    let curMin = 0
    for (let i = 0; i < 200; i++) {
        let newGrid: Record<number, string> = {}
        for (let lvl = curMin; lvl <= curMax; lvl++) {
            newGrid[lvl] = calcLevel(lvl)
        }
        const below = calcLevel(curMin-1)
        if (below.includes('#')) {
            curMin--
            newGrid[curMin] = below
        }
        const above = calcLevel(curMax+1)
        if (below.includes('#')) {
            curMax++
            newGrid[curMax] = above
        }
        grid = newGrid
    }
    let s = 0
    for (let lvl = curMin; lvl <= curMax; lvl++) {
        for (let x = 0; x < X; x++) {
            for (let y = 0; y < Y; y++) {
                s += grid[lvl][x+y*X] == '#' ? 1:0
            }
        }
    }
    console.log(s)

    function calcLevel(lvl: number) {
        let curLvl = (grid[lvl] ?? '.'.repeat(25)).split('')
        for (let x = 0; x < X; x++) {
            for (let y = 0; y < Y; y++) {
                if (x==2 && y==2) continue
                let nC = 0
                for (const d of [[1,0],[-1,0],[0,1],[0,-1]]) {
                    nC += get(x, y, d, lvl)
                }
                if (curLvl[x+y*X] == '#') {
                    if (nC != 1) curLvl[x + y*X] = '.'
                } else {
                    if (nC == 1 || nC == 2) curLvl[x + y*X] = '#'
                }
            }
        }
        return curLvl.join('')
    }



    function get(ox: number, oy: number, dir: number[], lvl: number): number {
        const x = ox + dir[0]
        const y = oy + dir[1]
        if (x < 0) return get(1, 2, [0,0], lvl-1)
        if (y < 0) return get(2, 1, [0,0], lvl-1)
        if (x >= X) return get(3, 2, [0,0], lvl-1)
        if (y >= Y) return get(2, 3, [0,0], lvl-1)
        if (x == 2 && y == 2) {
            let r = 0
            for (let i = 0; i < 5; i++) {
                let nx = i
                if (dir[0] == 1) nx = 0
                if (dir[0] == -1) nx = 4
                let ny = i
                if (dir[1] == 1) ny = 0
                if (dir[1] == -1) ny = 4
                r += get(
                    nx,
                    ny,
                    [0,0],
                    lvl+1
                )
            }
            return r
        }
        if (grid[lvl] == undefined) return 0
        return grid[lvl][x + y*X] == '#' ? 1:0
    }

    function print(s: string) {
        for (let x = 0; x < X; x++) {
            let r = ""
            for (let y = 0; y < Y; y++) {
                if (x ==2 && y==2) r+='?'
                else
                r += s[x+y*X] 
            }
            console.log(r)
        }
    }
}

