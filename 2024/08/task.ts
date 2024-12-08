import {lcmArr, lcm, gcd, ComplexNumber} from '../../base'
import { Stack, Queue, JsonSet, FunctionSet, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const grid = input.map(i=>i.split(''))
    const antennas: Record<string, number[][]> = {}
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] != '.') {
                if (antennas[grid[y][x]] == undefined) antennas[grid[y][x]] = []
                antennas[grid[y][x]].push([y,x])
            }
        }
    }

    const keys = Object.keys(antennas)
    const newPoints = new Set<string>()
    for (const k of keys) {
        const a = antennas[k]
        for (let i = 0; i < a.length; i++) {
            for (let j =  i+1; j < a.length; j++) {
                const d = [a[i][0]-a[j][0],a[i][1]-a[j][1]]
                ins(a[i][0]+d[0],a[i][1]+d[1])
                ins(a[j][0]-d[0],a[j][1]-d[1])
            }
        }
    }

    console.log(newPoints.size)

    function ins(y: number, x: number) {
        if (y < 0 || x < 0) return
        if (y >= grid.length || x >= grid[0].length) return
        newPoints.add(y+'|'+x)
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const grid = input.map(i=>i.split(''))
    const antennas: Record<string, number[][]> = {}
    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[0].length; x++) {
            if (grid[y][x] != '.') {
                if (antennas[grid[y][x]] == undefined) antennas[grid[y][x]] = []
                antennas[grid[y][x]].push([y,x])
            }
        }
    }

    const keys = Object.keys(antennas)
    const newPoints = new Set<string>()
    for (const k of keys) {
        const a = antennas[k]
        for (let i = 0; i < a.length; i++) {
            for (let j =  i+1; j < a.length; j++) {
                const d = [a[i][0]-a[j][0],a[i][1]-a[j][1]]
                let ti = 0
                while(true) {
                    if (!ins(a[i][0]+d[0]*ti,a[i][1]+d[1]*ti)) break
                    ti++
                }
                
                ti = 0
                while(true) {
                    if (!ins(a[j][0]-d[0]*ti,a[j][1]-d[1]*ti)) break
                    ti++
                }
            }
        }
    }

    console.log(newPoints.size)

    function ins(y: number, x: number) {
        if (y < 0 || x < 0) return false
        if (y >= grid.length || x >= grid[0].length) return false
        newPoints.add(y+'|'+x)
        return true
    }
}