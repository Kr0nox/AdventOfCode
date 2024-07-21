export async function taskOne(input: string[]): Promise<void> {
    let vals = input.map(i => i.split('with ')[1]).map(Number)
    let n = 0
    for (let i = 0; i < 40*1000*1000; i++) {
        vals[0] = (vals[0] * 16807) % 2147483647
        vals[1] = (vals[1] * 48271) % 2147483647

        const s = vals.map(i => i.toString(2)).map(i => {
            const l = i.length;
            return i.substring(l-16)
        })
        if (s[0] == s[1]) n++
    }
    console.log(n)
}

export async function taskTwo(input: string[]): Promise<void> {
    let vals = input.map(i => i.split('with ')[1]).map(Number)
    let n = 0
    for (let i = 0; i < 5*1000*1000; i++) {
        do {vals[0] = (vals[0] * 16807) % 2147483647} while(vals[0] % 4 != 0)
        do {vals[1] = (vals[1] * 48271) % 2147483647}  while(vals[1] % 8 != 0) 
        

        const s = vals.map(i => i.toString(2)).map(i => {
            const l = i.length;
            return i.substring(l-16)
        })
        if (s[0] == s[1]) n++
    }
    console.log(n)
}