export async function taskOne(input: string[]): Promise<void> {
    let i = input[0].split('').map((s) => s.charCodeAt(0) - 97);
    
    do {
        i = increment(i)
    } while(!allowed(i))
    console.log(i.map(s => s+97).map(s => String.fromCharCode(s)).join(''))
}

export async function taskTwo(input: string[]): Promise<void> {
    let i = input[0].split('').map((s) => s.charCodeAt(0) - 97);
    
    do {
        i = increment(i)
    } while(!allowed(i))
    do {
        i = increment(i)
    } while(!allowed(i))
    console.log(i.map(s => s+97).map(s => String.fromCharCode(s)).join(''))
}

function increment(i: number[]) {
    let j = i.length - 1;
    while(true) {
        i[j]++
        if (i[j] > 25) i[j]=0
        else break;
        j--
    }
    return i
}

const I = 'i'.charCodeAt(0) - 97
const O = 'o'.charCodeAt(0) - 97
const L = 'l'.charCodeAt(0) - 97

function allowed(p: number[]) {
    if (p.includes(I)) return false
    if (p.includes(O)) return false
    if (p.includes(L)) return false

    let last = -1
    let doubles = 0
    for (let i = 0; i < p.length; i++) {
        if (last == p[i]) {
            doubles++
            i++
        }
        last = p[i]
    }
    if (doubles < 2) return false

    for (let i = 2; i < p.length; i++) {
        if (p[i-2] + 1 == p[i-1] && p[i-1] + 1 == p[i]) {
            return true
        }
    }
    return false

}