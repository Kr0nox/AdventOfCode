export async function taskOne(input: string[]): Promise<void> {
    let stones = input[0].split(' ').map(Number)

    for (let i = 0; i < 25; i++) {
        const newStone: number[] = []

        for (let j = 0; j < stones.length; j++) {
            const s = stones[j].toString()
            if (stones[j] == 0) newStone.push(1)
            else if (s.length % 2 == 0) {
                newStone.push(Number(s.substring(0, s.length/2)))
                newStone.push(Number(s.substring(s.length/2)))
            } else {
                newStone.push(stones[j]*2024)
            }
        }
        stones = newStone
    }
    console.log(stones.length)

}

export async function taskTwo(input: string[]): Promise<void> {
    const memo: Record<number, Record<number, number>> = {}
    let stones = input[0].split(' ').map(Number).map(n => get(n,0)).reduce((a,b)=>a+b,0)

    console.log(stones)


    function get(n: number, d: number): number {
        if (d >= 75) return 1
        if (memo[n] != undefined) {
            if (memo[n][d] != undefined) return memo[n][d]
        }

        let v = -1
        const s = n.toString()
        if (n == 0) v = get(1, d+1)
        else if (s.length % 2 == 0) {
            v = get(Number(s.substring(0, s.length/2)),d+1)
            v += get(Number(s.substring(s.length/2)),d+1)
        } else {
            v = get(n*2024,d+1)
        }
        
        if (memo[n] == undefined) memo[n] = {}
        memo[n][d] = v
        return v
    }
}
