export async function taskOne(input: string[]): Promise<void> {
    const rows = input.map(i => i.split(/ |\t/).map(Number))
    console.log(rows)
    const max = rows.map(i => Math.max(...i))
    const min = rows.map(i => Math.min(...i))
    const difs = max.map((m, i) => m - min[i])
    console.log(difs.reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {
    const rows = input.map(i => i.split(/ |\t/).map(Number).sort((a,b)=>b-a))
    console.log(rows.map(r => {
        for (let i = 0; i < r.length; i++) {
            for (let j = i+1; j < r.length; j++) {
                if (r[i] % r[j] == 0) return r[i] / r[j]
            }
        }
        throw r.join(' ')
    }).reduce((a,b)=>a+b,0))
}