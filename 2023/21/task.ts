export async function taskOne(_input: string[]): Promise<void> {
    const sRow = _input.findIndex(i => i.includes('S'))
    const input = _input.map(s => s.split(""))
    const sCol = input[sRow].indexOf('S')
    console.log(explore(input, [sRow, sCol]))
}

export async function taskTwo(_input: string[]): Promise<void> {
    // You will never go back in an old field
    // Row and coloumn of S are empty
    // Always enter from corner or center
    // start is center
    // border empty
    const sRow = _input.findIndex(i => i.includes('S'))
    const input = _input.map(s => s.split(""))
    const sCol = input[sRow].indexOf('S')
    console.log(sCol, sRow)
    const cardinals = (26501365-sCol)/(input.length)
    const sBlock = explore(input, [sCol, sRow], 262+65)
    let cards = 0
    for (const dir of [[0,sCol],[sCol,0],[input.length-1,sCol],[sCol, input.length-1]]) {
        cards += explore(input, dir as [number,number], 262) * (cardinals-1)
        cards += explore(input, dir as [number,number], 131)
    }
    let corners = 0
    for (const dir of [[0,0],[input.length-1,0],[0,input.length-1],[input.length-1, input.length-1]]) {
        corners += explore(input, dir as [number,number], 131+65) * (((cardinals-2)*(cardinals-3))/2)
        corners += explore(input, dir as [number,number], 131) * (cardinals-1)
    }
    console.log(sBlock+cards+corners)

}



function explore(grid: string[][], start: [number, number], num = 64) {

    function inp(i: number) {
        const temp = i % grid.length
        if (temp < 0) {
            return grid.length + temp
        }
        return temp
    }

    let next: Set<string> = new Set()
    let qu: Set<string> = new Set([to(start)])

    for (let i = 0; i < num; i++) {
        for (const _q of qu) {
            const q = from(_q)
            for (let i = q[0]-1; i <= q[0]+1; i++) {
                for (let j = q[1]-1; j <= q[1]+1; j++) {
                    if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) continue
                    if (i != q[0] && j != q[1]) continue
                    if (i == q[0] && j == q[1]) continue
                    if (grid[i][j] == '#') continue
                    next.add(to([i,j]))
                }
            }
        }
        qu = next
        next = new Set()
    }
    return qu.size
}

function to(c: [number, number]) {
    return c[0]+","+c[1]
}

function from(s: string): [number,number] {
    const sp = s.split(",").map(i => parseInt(i.trim()))
    return [sp[0],sp[1]]
}
