export async function taskOne(input: string[]): Promise<void> {
    let s = 0
    for (const i of input) {
        const vals = i.matchAll(/mul\(([0-9]+),([0-9]+)\)/g)
        for (const v of vals) {
            s += Number(v[1]) * Number(v[2])
        }
    }
    
    console.log(s)
}

export async function taskTwo(input: string[]): Promise<void> {
    let s = 0
    let enabled = true
    for (const i of input) {
        const vals = i.matchAll(/mul\(([0-9]+),([0-9]+)\)|do\(\)|don't\(\)/g)
        for (const v of vals) {
            if (v[0].startsWith('do(')) enabled = true
            if (v[0].startsWith('don')) enabled = false
            if (enabled && v[0].startsWith('mul'))
                s += Number(v[1]) * Number(v[2])
        }
    }
    
    console.log(s)
}

// input.map(Number) 
// input[0].split(' ').map(Number)
// .reduce((a,b)=>a+b,0)