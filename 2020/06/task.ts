export async function taskOne(input: string[]): Promise<void> {
    input.push('')
    const s = new Set<string>()
    let c = 0
    for (const i of input) {
        if (i == '') {
            c += s.size
            s.clear()
        }
        i.split('').forEach(j => s.add(j))
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    input.push('')
    let s: Record<string, number> = {}
    let c = 0
    let pc=0
    for (const i of input) {
        if (i == '') {
            const keys = Object.keys(s)
            for (let k of keys) {
                if (s[k] == pc) c++
            }
            s = {}
            pc = 0
            continue
        }
        i.split('').forEach(j => {
            if(s[j] == undefined) s[j] = 0
            s[j]++
        })
        pc++
    }
    console.log(c)
}