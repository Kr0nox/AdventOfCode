export async function taskOne(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    const r = run(list, [])[1]
    const grid = buildGrid(r)[0]

    let c = 0
    for (let y = 1; y < grid.length-1; y++) {
        for (let x = 1; x < grid[y].length-1; x++) {
            if (grid[y][x] != '#') continue
            let all = true
            for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
                if (grid[y+dir[0]][x+dir[1]] != '#') all = false
            }
            if (all) c += x*y
        }
    }
    console.log(c)
    
}

export async function taskTwo(input: string[]): Promise<void> {
    const list: Record<number, number> = {}
    input[0].split(',').map(Number).forEach((i,idx) => list[idx] = i)
    const r = run(list, [])[1]
    const [grid, [rX, rY]] = buildGrid(r)

    //const poi: IntersectionData[] = [[rX,rY]]
    const intersections: number[][] = [[rX, rY]]
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            if (grid[y][x] != '#') continue
            let bottom = y+1 < grid.length ? (grid[y+1][x]) : '.'
            let top = y-1 >= 0 ? (grid[y-1][x]) : '.'
            let left = x-1 >= 0 ? (grid[y][x-1]) : '.'
            let right = x+1 < grid[0].length ? grid[y][x+1] : '.'
            let checkSum = 0
            if (bottom == '#') checkSum += 1
            if (top == '#') checkSum += 2
            if (left == '#') checkSum += 4
            if (right == '#') checkSum += 8
            if ([1,2,4,8,15].includes(checkSum)) {
                intersections.push([x,y])
            }
            if ([1,2,4,8].includes(checkSum)) {
                console.log('end')
            }
        }
    }

    console.log(rX, rY)
    for (const r of grid) {
        console.log(r)
    }

    console.log(intersections.length)

    
    function buildGraph(points: number[][]) {
        const graph: Record<number, Neighbour> = {}
        const visited = new Set<number>()
    }

    interface Neighbour {
        id: number,
        way: string[]
    }

    function splitPath(path: string): { r: 'false' } | { r: 'maybe', } {

    }
}

function buildGrid(nums: number[]): [string[], number[]] {
    let row = ''
    const robotPos = [-1,-1]
    const grid = [] as string[]
    for (const n of nums) {
        if (n == 10) {
            grid.push(row)
            row = ''
        } else if (n == 35) {
            row += '#'
        } else if (n == 46) {
            row += '.'
        } else {
            robotPos[0] = row.length
            robotPos[1] = grid.length
            row += '#'
        }
    }
    return [grid, robotPos]
}

function run(list: Record<number, number>, inputs: number[]): [Record<number, number>, number[]] {
    let relBase = 0
    let i = 0
    inputs.reverse()
    const out: number[] = []
    while(list[i] != 99) {
        const op = list[i] % 100
        switch (op) {
            case 1: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c + b
                i+=4
                break
                
            }
            case 2: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c * b
                i+=4
                break
            }
            case 3: {
                list[getGoalIndex(i+1, getAtDigit(list[i], 100))] = inputs.pop()!
                i += 2
                break
            }
            case 4: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                out.push(c)
                i += 2
                break
            }
            case 5: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                if (c != 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            }
            case 6: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                if (c == 0) {
                    i = b
                } else {
                    i += 3
                }
                break
            }
            case 7: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c < b ? 1:0
                i += 4
                break
            }
            case 8: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                const b = getVal(i+2, getAtDigit(list[i], 1000))
                list[getGoalIndex(i+3, getAtDigit(list[i], 10000))] = c == b ? 1:0
                i += 4
                break
            }
            case 9: {
                const c = getVal(i+1, getAtDigit(list[i], 100))
                relBase += c
                i+=2
                break
            }
            default: {
                throw i
            }
        }
    }
    return [list, out]

    function getVal(i: number, mode: number) {
        switch (mode) {
            case 0: {
                return list[list[i]]
            }
            case 1: {
                return list[i]
            }
            case 2: {
                return list[list[i]+relBase]
            }
            default:
                throw "unknown Mode"
        }
    }

    function getGoalIndex(i: number, mode: number) {
        switch (mode) {
            case 0: {
                return list[i]
            }
            case 1: {
                throw "not supported"
            }
            case 2: {
                return list[i]+relBase
            }
            default:
                throw "unknown Mode"
        }
    }

    function getAtDigit(num: number, digit: number) {
        return Math.floor(num / digit) % 10
    }
}