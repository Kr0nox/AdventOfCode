import {lcmArr, lcm, gcd, ComplexNumber} from '../../base'
import { Stack, Queue, JsonSet, FunctionSet, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const nums = input[0].split('').map(Number).map((i, idx) => {return {free: (idx %2) == 1, length: i, id: idx / 2}})

    const space = [] as number[]
    for (const n of nums) {
        let id = n.free?-1:n.id
        for (let i = 0; i < n.length; i++) {
            space.push(id)
        }
    }

    let end = space.length-1
    let start = 0
    while(end > start) {
        while(end > start && space[end] == -1) end--
        while(end > start && space[start] != -1) start++
        if (end <= start) break

        space[start] = space[end]
        space[end] = -1
    }
    let s = 0
    for (let i = 0; i < space.length; i++) {
        if(space[i] == -1) continue
        s += i*space[i]
    }
    console.log(s)
    
}

export async function taskTwo(input: string[]): Promise<void> {
    const nums = input[0].split('').map(Number).map((i, idx) => {return {free: (idx %2) == 1, length: i, id: idx / 2}})

    const idToSize = Array.from({length: nums.length/2}, () => 0)
    const startMap: Record<number, number> = {}

    const space = [] as number[]
    for (const n of nums) {
        let id = n.free?-1:n.id
        if (!n.free) {
            idToSize[n.id] = n.length
            startMap[n.id] = space.length
        }

        for (let i = 0; i < n.length; i++) {
            space.push(id)
        }
    }

    let curEnd = idToSize.length-1
    while (curEnd > 0) {
        let minPos = 0 
        let curLen = 0
        while(minPos < startMap[curEnd]) {
            if (space[minPos] == -1) {
                curLen++
            } else {
                curLen = 0
            }
            if (curLen >= idToSize[curEnd]) break
            minPos++
        }
        minPos -= curLen - 1
        if (curLen < idToSize[curEnd]) {
            curEnd--
            continue
        }

        for (let i = 0; i < idToSize[curEnd]; i++) {
            space[startMap[curEnd]+i] = -1
            space[minPos+i] = curEnd
        }

        startMap[curEnd] = minPos
    }

    let s = 0
    for (let i = 0; i < space.length; i++) {
        if(space[i] == -1) continue
        s += i*space[i]
    }
    console.log(s)
}



/*
[[1,0],[-1,0],[0,1],[0,-1]]
for (let y = 0; y < input.le)

*/