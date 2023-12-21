import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const fish = parseNumberList(input[0])
    for (let i = 0; i < 80; i++) {
        const len = fish.length
        for (let j = 0; j < len; j++ ) {
            if (fish[j] == 0) {
                fish[j] = 6
                fish.push(8)
            } else {
                fish[j]--
            }
        }
    }
    console.log(fish.length)
}

export async function taskTwo(input: string[]): Promise<void> {
    const fish = parseNumberList(input[0])
    const memo: number[][] = Array.from({length: 257}, () => Array.from({length: 9}, () => -1))
    function getMemoValue(d: number, n: number): number {
        if (memo[d][n] >= 0) return memo[d][n]
        let val = -1
        if (d == 256) {
            val = 1
        } else if (n == 0) {
            val = getMemoValue(d+1, 8) + getMemoValue(d+1, 6)
        } else {
            val = getMemoValue(d+1,n-1)
        }
        memo[d][n] = val
        return val
    }
    let sum = 0;
    for (const f of fish) {
        sum += getMemoValue(0, f)
    }
    console.log(sum)
}
