export async function taskOne(input: string[]): Promise<void> {
    const l: number[] = []
    const r: number[] = []
    for (const i of input) {
        const p = i.split('   ')
        l.push(Number(p[0]))
        r.push(Number(p[1]))
    }
    l.sort((a,b)=>a-b)
    r.sort((a,b)=>a-b)
    let s = 0;
    for (let i =0; i < l.length; i++) {
        s += Math.max(l[i],r[i])-Math.min(l[i],r[i])
    }
    console.log(s)
}

export async function taskTwo(input: string[]): Promise<void> {
    const l: number[] = []
    const r: number[] = []
    for (const i of input) {
        const p = i.split('   ')
        l.push(Number(p[0]))
        r.push(Number(p[1]))
    }
    let s = 0
    for (let i = 0; i < l.length; i++) {
        s += r.filter(k => k == l[i]).length * l[i]
    }
    console.log(s)

}