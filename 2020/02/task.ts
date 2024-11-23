export async function taskOne(input: string[]): Promise<void> {
    // 1-3 a: abcde
    console.log(input.map(i => {
        const r = /([0-9]+)-([0-9]+) (.): (.*)/.exec(i)!
        let min = Number(r[1])
        let max = Number(r[2])
        let letter = r[3]
        let pw = r[4]
        let c = 0
        for (const l of pw) {
            if (l == letter) c++
        }
        return (c >= min && c <= max ? 1 : 0) as number
    }).reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(input.map(i => {
        const r = /([0-9]+)-([0-9]+) (.): (.*)/.exec(i)!
        let pos1 = Number(r[1])
        let pos2 = Number(r[2])
        let letter = r[3]
        let pw = r[4]
        const p2 = pw[pos2-1] == letter
        const res = pw[pos1-1] == letter ? !p2 : p2
        return (res ? 1:0) as number
    }).reduce((a,b)=>a+b,0))
}