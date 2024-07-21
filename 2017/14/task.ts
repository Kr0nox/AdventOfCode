export async function taskOne(input: string[]): Promise<void> {
    const FREE_MAP: Record<number, number> = {
        0: 4,
        1: 3,
        2: 3,
        3: 2,
        4: 3,
        5: 2,
        6: 2,
        7: 1,
        8: 3,
        9: 2,
        10: 2,
        11: 1,
        12: 2,
        13: 1,
        14: 1,
        15: 0
    }
    let sum = 0;
    for (let i = 0; i < 128; i++) {
        const h = hash(`${input[0]}-${i}`)
        for (let j of h) {
            sum += 4-FREE_MAP[j]
        }
    }
    console.log(sum)

}

export async function taskTwo(input: string[]): Promise<void> {
    const USED_MAP: Record<number, boolean[]> = {
        0: [false, false, false, false],
        1: [false, false, false, true],
        2: [false, false, true, false],
        3: [false, false, true, true],
        4: [false, true, false, false],
        5: [false, true, false, true],
        6: [false, true, true, false],
        7: [false, true, true, true],
        8: [true, false, false, false],
        9: [true, false, false, true],
        10: [true, false, true, false],
        11: [true, false, true, true],
        12: [true, true, false, false],
        13: [true, true, false, true],
        14: [true, true, true, false],
        15: [true, true, true, true]
    }
    let grid: boolean[][] = []
    for (let i = 0; i < 128; i++) {
        grid.push([])
        const h = hash(`${input[0]}-${i}`)
        for (let j of h) {
            grid[i].push(...USED_MAP[j])
        }
    }

    let regions = 0
    const V = new Set<String>()
    const Q = [] as number[][]

    for (let x = 0; x < 128; x++) {
        for (let y = 0; y < 128; y++) {
            if (!grid[x][y]) continue
            const k = `${x}-${y}`
            if (V.has(k)) continue
            regions++
            Q.push([x,y])
            while(Q.length > 0) {
                const q = Q.pop()!
                const k = `${q[0]}-${q[1]}`
                if (q[0] < 0 || q[1] < 0 || q[0] >= 128 || q[1] >= 128) continue
                if (!grid[q[0]][q[1]]) continue
                if (V.has(k)) continue
                V.add(k)
                Q.push([q[0]+1,q[1]])
                Q.push([q[0]-1,q[1]])
                Q.push([q[0],q[1]+1])
                Q.push([q[0],q[1]-1])
            }
        }
    }
    console.log(regions)
}


function hash(s: string) {
    const LENGTH = 256
    let list = Array.from({length: LENGTH}, (_, i: number) => i)
    let currentIndex = 0;
    let skipSize = 0;

    const instrcutions = s.split('').map((s: string) => s.charCodeAt(0))
    instrcutions.push(...[17, 31, 73, 47, 23])
    for (let c = 0; c < 64; c++) {
        for (const i of instrcutions) {
            reverse(i)
            currentIndex += i + skipSize
            currentIndex %= LENGTH
            skipSize++
        }
    }

    let dense = Array.from({length: 16}, () => 0)
    for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
            dense[i] = dense[i] ^ list[i * 16 + j]
        }
    }

    let result: number[] = []
    for (const d of dense) {
        result.push(Math.floor(d/16))
        result.push(d%16)
    }
    return result

    function reverse(len: number) {
        for (let i = 0; i < len / 2; i++) {
            const temp = list[(currentIndex + i) % LENGTH]
            list[(currentIndex + i) % LENGTH] = list[(currentIndex + len - i - 1) % LENGTH]
            list[(currentIndex + len - i - 1) % LENGTH] = temp
        }
    }
}