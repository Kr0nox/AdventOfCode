import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const grid = input.map(i => parseNumberList(i, ""))

    let sum = 0;
    for (let i = 0; i < input.length; i++) {
        for (let j = 0; j < input[i].length; j++) {
            let temp = false
            if (i > 0 && grid[i-1][j] <= grid[i][j]) temp = true
            if (i < grid.length - 1 && grid[i+1][j] <= grid[i][j]) temp = true
            if (j > 0 && grid[i][j-1] <= grid[i][j]) temp = true
            if (j < grid[i].length - 1 && grid[i][j+1] <= grid[i][j]) temp = true
            if (!temp) sum += 1 + grid[i][j]
        }
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = input.map(i => parseNumberList(i, ""))
    const visited = Array.from({length: grid.length}, ()=>Array.from({length:grid[0].length}, () => false))
    const sizes: number[] = []
     for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] == 9 || visited[i][j]) continue
            const queue: [number,number][] = [[i,j]]
            let size = 0
            while(queue.length > 0) {
                const q = queue.shift() as [number, number]
                if (q[0] < 0 || q[0] >= grid.length || q[1] < 0 || q[1] >= grid[0].length) continue
                if (grid[q[0]][q[1]] == 9) continue
                if (visited[q[0]][q[1]]) continue
                visited[q[0]][q[1]] = true
                size++
                queue.push(...([
                    [q[0]+1,q[1]],
                    [q[0]-1,q[1]],
                    [q[0],q[1]+1],
                    [q[0],q[1]-1],
                ] as [number, number][]))
            }
            sizes.push(size)
        }
    }
    console.log(sizes.sort((a,b) => b-a).slice(0,3).reduce((a,b) => a*b,1))
}


