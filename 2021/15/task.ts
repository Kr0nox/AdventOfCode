import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const graph = input.map(i => parseNumberList(i, ""))
    const cost = graph.map(i => i.map(j => Infinity))
    const queue = [[0,0]]
    cost[0][0] = 0
    while(queue.length > 0) {
        const q = queue.shift() as [number, number]
        for (let i = q[0]-1; i <= q[0]+1; i++) {
            for (let j = q[1]-1; j <= q[1]+1; j++) {
                if (i < 0 || j < 0 || i >= graph.length || j >= graph[0].length) continue
                if (i == q[0] && j == q[1] || i != q[0] && j != q[1]) continue
                const temp = cost[q[0]][q[1]] + graph[i][j]
                if (temp < cost[i][j]) {
                    cost[i][j] = temp
                    queue.push([i,j])
                }

            } 
        }
    }
    console.log(cost[graph.length-1][graph[0].length-1])
}

export async function taskTwo(input: string[]): Promise<void> {
    const _graph = input.map(i => parseNumberList(i, ""))
    const cost = Array.from({length: 5*_graph.length}, () => Array.from({length: 5*_graph[0].length}, () => Infinity))
    const queue = [[0,0]]
    cost[0][0] = 0
    function g(i: number, j: number) {
        const temp = (_graph[i%_graph.length][j%_graph[0].length] + Math.floor(i/_graph.length)+ Math.floor(j/_graph[0].length))
        if (temp > 9) {
            return temp - 9
        }
        return temp
    }

    while(queue.length > 0) {
        const q = queue.shift() as [number, number]
        for (let i = q[0]-1; i <= q[0]+1; i++) {
            for (let j = q[1]-1; j <= q[1]+1; j++) {
                if (i < 0 || j < 0 || i >= cost.length || j >= cost[0].length) continue
                if (i == q[0] && j == q[1] || i != q[0] && j != q[1]) continue
                const temp = cost[q[0]][q[1]] + g(i,j)
                if (temp < cost[i][j]) {
                    cost[i][j] = temp
                    queue.push([i,j])
                }

            } 
        }
    }
    console.log(cost[cost.length-1][cost[0].length-1])
}