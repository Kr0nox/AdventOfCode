export async function taskOne(input: string[]): Promise<void> {    
    task(input, [9,8,7,6,5,4,3,2,1])
}
export async function taskTwo(input: string[]): Promise<void> {
    task(input, [1,2,3,4,5,6,7,8,9])
}

export async function task(input: string[], order: number[]) {
    const xAdds = [] as number[]
    const yAdds = [] as number[]
    const zDivs = [] as number[]

    for (let d = 0; d < 14; d++) {
        zDivs.push(Number(input[d*18+4].split(' ')[2]))
        xAdds.push(Number(input[d*18+5].split(' ')[2]))
        yAdds.push(Number(input[d*18+15].split(' ')[2]))
    }
    console.log(xAdds, yAdds, zDivs)

    const badStates = new Set<string>()
    console.log(run(0, 0, 0))

    function run(depth: number, curTotal: number, lastZ: number): number|false {
        if (depth >= 14) return lastZ == 0 ? curTotal:false
        const k = key(depth, lastZ)
        if(badStates.has(k)) return false
        const t = curTotal * 10

        for (const i of order) {
            let w = i
            let z = lastZ
            let x = z
            x %= 26
            z = Math.floor(z / zDivs[depth])
            x += xAdds[depth]
            x = x == w ? 0:1
            let y = 25
            y *= x
            y += 1
            z *= y
            y = w + yAdds[depth]
            y *= x
            z += y

            const r = run(depth+1, t+i, z)
            if(r !== false) {
                return r
            }
        }
        badStates.add(k)
        return false
    }

    function key(...n: number[]) {
        return n.join('|')
    }
}