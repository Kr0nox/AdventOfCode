import {lcmArr, lcm, gcd, ComplexNumber,  Stack, Queue, JsonSet, FunctionSet, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    let bytes = input.map(i => i.split(',').map(Number))
    let borders = new Set<string>()
    for (let i = 0; i < 1024; i++) {
        borders.add(bytes[i][0]+'|'+bytes[i][1])
    }
    let goal = {x:70,y:70}

    const queue = new Queue<State>()
    const visited = new Set<string>()
    queue.push({x:0,y:0,d:0})
    console.log(borders)

    while(!queue.isEmpty()) {
        const q = queue.pop()
        if (q.x < 0 || q.x > 70 || q.y < 0 || q.y > 70) continue
        const k = q.x + '|' + q.y
        if (borders.has(k)) continue
        if (visited.has(k)) continue
        visited.add(k)
        if (q.x == 70 && q.y == 70) {
            console.log(q.d)
            return
        }

        for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
            queue.push({
                x:q.x+dir[0],y:q.y+dir[1], d:q.d+1
            })
        }
    }

    interface State {
        x: number
        y: number,
        d: number
    }

}

export async function taskTwo(input: string[]): Promise<void> {
    let bytes = input.map(i => i.split(',').map(Number))
    const MAX_L = 70


    
    let borders = new Set<string>()
    for (let i = 0; i < bytes.length; i++) {
        borders.add(bytes[i][0]+'|'+bytes[i][1])
        if (!reach()) {
            console.log(bytes[i].join(','))
            return
        }
    }
    function reach() {
        const queue = new Queue<State>()
        const visited = new Set<string>()
        queue.push({x:0,y:0,d:0})

        while(!queue.isEmpty()) {
            const q = queue.pop()
            if (q.x < 0 || q.x > MAX_L || q.y < 0 || q.y > MAX_L) continue
            const k = q.x + '|' + q.y
            if (borders.has(k)) continue
            if (visited.has(k)) continue
            visited.add(k)
            if (q.x == MAX_L && q.y == MAX_L) {
                return true
            }

            for (const dir of [[1,0],[-1,0],[0,1],[0,-1]]) {
                queue.push({
                    x:q.x+dir[0],y:q.y+dir[1], d:q.d+1
                })
            }
        }
        return false
    }

    interface State {
        x: number
        y: number,
        d: number
    }
}

/*
const grid = input.map(i => i.split(''))

for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {

    }
}


const queue = new Queue<State>()
const visited = new Set<string>()
queue.push()

while(!queue.isEmpty()) {
    const q = queue.pop()
    const k = q.x + '|' + q.y
    if (visited.has(k)) continue
    visited.add(k)

    for () {
        queue.push()
    }
}

interface State {
    x: number
    y: number
}

*/
