export async function taskOne(input: string[]): Promise<void> {
    const winds: number[][] = []
    const grid = input.map(i => i.split(""))
    grid.forEach((i,ind) => {
        i.forEach((j,jnd)=> {
            if (j != '.' && j != '#') {
                let temp = [ind, jnd]
                if (j == '^') temp= temp.concat([-1,0])
                else if (j == 'v') temp=temp.concat([1,0])
                else if (j == '>') temp=temp.concat([0,1])
                else if (j == '<') temp=temp.concat([0,-1])
                else console.log(j)
                grid[ind][jnd] = 'o'
                winds.push(temp)
            }
        })
    })

    console.log(walk(grid, winds, [0,1], [grid.length-1, grid[0].length-2]))
}

export async function taskTwo(input: string[]): Promise<void> {
    const winds: number[][] = []
    const grid = input.map(i => i.split(""))
    grid.forEach((i,ind) => {
        i.forEach((j,jnd)=> {
            if (j != '.' && j != '#') {
                let temp = [ind, jnd]
                if (j == '^') temp= temp.concat([-1,0])
                else if (j == 'v') temp=temp.concat([1,0])
                else if (j == '>') temp=temp.concat([0,1])
                else if (j == '<') temp=temp.concat([0,-1])
                else console.log(j)
                grid[ind][jnd] = 'o'
                winds.push(temp)
            }
        })
    })

    const t1 = walk(grid, winds, [0,1], [grid.length-1, grid[0].length-2])
    const t2 = walk(grid, winds, [grid.length-1, grid[0].length-2], [0,1])
    const t3 = walk(grid, winds, [0,1], [grid.length-1, grid[0].length-2])
    console.log(t1 + t2 + t3)
}

function print(grid: string[][]) {
    for (let j = 0; j < grid.length; j++) {
        
        let line = ""
        for (let i = 0 ; i <grid[0].length; i++) {
            line += grid[j][i]
        }
        console.log(line)
    }
    console.log(" ")
}

function walk(grid: string[][], winds: number[][], start: number[], end: number[]) {
    function toSet(nums: number[]) {
        return nums[0] + nums[1]*grid.length
    }

    function fromSet(num: number) {
        return [num % grid.length, Math.floor(num/grid.length)]
    }
        

    let oldQ: number[] = [toSet(start)]
    let round = 0
    while(true) {
        let newQ: Set<number> = new Set()
        while(oldQ.length > 0) {
            const q = fromSet(oldQ.pop() as number)
            if (q[0] < 0 || q[0] >= grid.length) continue
            if(q[0] == end[0] && q[1]==end[1]) {
                return round
            }
            if (grid[q[0]][q[1]]!='.') continue
            for (const d of [[0,1], [0,-1],[-1,0],[1,0], [0,0]]) {
                newQ.add(toSet([q[0]+d[0], q[1]+d[1]]))
            }
        }
        winds.forEach(w => {
            grid[w[0]][w[1]] = '.'
            w[0] += w[2]
            w[1] += w[3]
            if (grid[w[0]][w[1]] == '#') {
                	if(w[0] == 0) w[0] = grid.length-2
                    if (w[0] ==  grid.length-1) w[0] = 1
                    if(w[1] == 0) w[1] = grid[0].length-2
                    if (w[1] ==  grid[0].length-1) w[1] = 1
            }
        })
        winds.forEach(w => grid[w[0]][w[1]]='o')
        oldQ = Array.from(newQ)
        round++
    }
}