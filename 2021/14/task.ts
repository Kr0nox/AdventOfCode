export async function taskOne(input: string[]): Promise<void> {
    task(input, 10)
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input, 40)
}

function task(input: string[], iters: number) {
    const map: Record<string, string> = {}
    input.slice(2).forEach(i => {
        const s = i.split(' -> ')
        map[s[0].trim()] = s[1].trim()
    })
    let old = input[0]
    let pairs: Record<string, number> = {}
    function change(p: string, val = 1) {
        if (pairs[p] == undefined) pairs[p] = val
        else pairs[p]+=val
    }
    for (let i = 0; i < old.length - 1; i++) {
        change(old.substring(i,i+2))
    }
    
    let oldP: Record<string, number> = {}
    for (let i = 0; i < iters; i++) {
        oldP = pairs
        pairs = {}
        const keys = Object.keys(oldP)
        for (const k of keys) {
            const middle = map[k]
            change(k.charAt(0)+middle, oldP[k])
            change(middle+k.charAt(1), oldP[k])
        }
    }
    const result: Record<string, number> = {}
    function change2(p: string, val: number) {
        if (result[p] == undefined) result[p] = val
        else result[p]+=val
    }
    const keys = Object.keys(pairs)
    for(const k of keys) {
        change2(k.charAt(0), pairs[k])
        change2(k.charAt(1), pairs[k])
    }
    result[old.charAt(0)]++
    result[old.charAt(old.length-1)]++
    const letters = Object.keys(result)
    let max = 0
    let min = Infinity
    for (const l of letters) {
        if (result[l] > max) max = result[l]
        if (result[l] < min) min = result[l]
    }
    console.log(max/2-min/2)
}