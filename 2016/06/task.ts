export async function taskOne(input: string[]): Promise<void> {
    const r: Record<string, number>[] = Array.from({length:input[0].length}, ()=>{return{}})
    for (const i of input) {
        const p = i.split("")
        for (let j = 0; j < p.length; j++) {
            if(!r[j][p[j]]) r[j][p[j]] = 0
            r[j][p[j]]++
        }
    }
    let g = ''
    for (let j = 0; j < r.length; j++) {
        let maxV = -1
        let max = ''
        for (const k of Object.keys(r[j])) {
            if (r[j][k] > maxV) {
                maxV = r[j][k]
                max = k
            }
        }
        g += max
    }
    console.log(g)
}

export async function taskTwo(input: string[]): Promise<void> {
    const r: Record<string, number>[] = Array.from({length:input[0].length}, ()=>{return{}})
    for (const i of input) {
        const p = i.split("")
        for (let j = 0; j < p.length; j++) {
            if(!r[j][p[j]]) r[j][p[j]] = 0
            r[j][p[j]]++
        }
    }
    let g = ''
    for (let j = 0; j < r.length; j++) {
        let minV = Infinity
        let min = ''
        for (const k of Object.keys(r[j])) {
            if (r[j][k] < minV) {
                minV = r[j][k]
                min = k
            }
        }
        g += min
    }
    console.log(g)
}