export async function taskOne(input: string[]): Promise<void> {
    const maxLen = 272
    let a = input[0].split("").map(Number)
    //console.log(step(a))
    while(a.length < maxLen) {
        a = step(a)
    }
    console.log(a.join(""))
    console.log(check(a.slice(0, maxLen)).join(""))

    function step(a: number[]) {
        let b = Array.from(a)
        b.reverse()
        b = b.map(i => i == 0 ? 1 : 0)
        a.push(0)
        a = a.concat(b)
        return a
    }

    function check(a: number[]): number[] {
        if (a.length % 2 != 0) return a
        const b = Array.from({length: a.length/2}, ()=>0)
        for (let i = 0; i < b.length; i++) {
            b[i] = a[i*2] == a[i*2+1] ? 1:0
        }
        return check(b)
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const maxLen = 35651584
    let a = input[0].split("").map(Number)
    //console.log(step(a))
    while(a.length < maxLen) {
        a = step(a)
    }
    console.log("done")
    console.log(check(a.slice(0, maxLen)).join(""))

    function step(a: number[]) {
        let b = Array.from(a)
        b.reverse()
        b = b.map(i => i == 0 ? 1 : 0)
        a.push(0)
        a = a.concat(b)
        return a
    }

    function check(a: number[]): number[] {
        if (a.length % 2 != 0) return a
        const b = Array.from({length: a.length/2}, ()=>0)
        for (let i = 0; i < b.length; i++) {
            b[i] = a[i*2] == a[i*2+1] ? 1:0
        }
        return check(b)
    }
}