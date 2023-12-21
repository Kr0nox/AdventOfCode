import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const grid = input.map(i => parseNumberList(i, ""))
    let count = 0
    for (let co = 0; co < 100; co++) {
        count += doStep(grid)
    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = input.map(i => parseNumberList(i, ""))

    let count = 0
    while(grid.map(i => i.reduce((a,b)=>a+b, 0)).reduce((a,b)=>a+b,0) > 0) {
        doStep(grid)
        count++
    }
    console.log(count)
}

function doStep(grid: number[][]) {
    let count = 0
    const tens: [number, number][] = []
    for (let j = 0; j < grid.length; j++) {
        for (let k = 0; k < grid[j].length; k++) {
            grid[j][k]++
            if (grid[j][k] == 10) tens.push([j,k])
        }
    }
    while(tens.length > 0) {
        count++
        const q = tens.pop() as [number,number]
        for (let i = -1;i<=1;i++) {
            for (let j=-1;j<=1;j++) {
                if (q[0]+i < 0 || q[0]+i >= grid.length) continue
                if (q[1]+j < 0 || q[1]+j >= grid[0].length) continue
                grid[q[0]+i][q[1]+j]++
                if (grid[q[0]+i][q[1]+j] == 10) tens.push([q[0]+i,q[1]+j])
            }
        }
    }
    for (let j = 0; j < grid.length; j++) {
        for (let k = 0; k < grid[j].length; k++) {
            if (grid[j][k] >= 10) grid[j][k] = 0
        }
    }
    return count
}