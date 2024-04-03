export async function taskOne(input: string[]): Promise<void> {
    const c = input.map(i => i.length).reduce((a,b)=>a+b,0)
    const d = input.map(getMemory).reduce((a,b)=>a+b,0)
    console.log(c-d)
}

export async function taskTwo(input: string[]): Promise<void> {
    const c = input.map(i => i.length).reduce((a,b)=>a+b,0)
    const d = input.map(encodedLength).reduce((a,b)=>a+b,0)
    console.log(c, d)
    console.log(d-c)
}

function getMemory(t: string) {
    let c = -2 + t.length
    for(let i = 0; i < t.length; i++) {
        if (t[i] == '\\') {
            if (t[i+1] == '\\') {
                i++
                c--
            } else if (t[i+1] == '"') {
                c--
            } else if (t[i+1] == 'x') {
                c -= 3
            }
        }
    }
    return c
}

function encodedLength(t: string) {
    let c = t.length + 4
    for(let i = 0; i < t.length; i++) {
        if (t[i] == '\\') {
            if (t[i+1] == '\\') {
                i++
                c+=2
            } else if (t[i+1] == '"') {
                c+=2
            } else if (t[i+1] == 'x') {
                c++
            }
        }
    }
    return c
}