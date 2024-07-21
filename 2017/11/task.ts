import {Queue} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {

    console.log(distance(input[0].split(',')))
}

export async function taskTwo(input: string[]): Promise<void> {
    const all = input[0].split(',')
    const temp = [] as string[]
    let max = 0;
    for (const a of all) {
        temp.push(a)
        const d = distance(temp)
        if (d > max) max = d
    }
    console.log(max)
}

function distance(moves: string[]) {
    let n = 0;
    let s = 0;
    let sw = 0;
    let se = 0;
    let nw = 0;
    let ne = 0;
    moves.forEach(i => {
        switch(i) {
            case 'n':
                n++
                break;
            case 's':
                s++;
                break;
            case 'ne':
                ne++
                break;
            case 'se':
                se++;
                break;
            case 'nw':
                nw++
                break;
            case 'sw':
                sw++;
                break;
        }
    })
    let didSomething = false;
    do {
        didSomething = false
        if (n != 0 && s != 0) {
            didSomething = true
            const m = Math.min(n,s)
            n -= m
            s -= m
        }

        if (ne != 0 && nw != 0) {
            didSomething = true
            const m = Math.min(ne,nw)
            ne -= m
            nw -= m
            n += m
        }
        if (se != 0 && sw != 0) {
            didSomething = true
            const m = Math.min(se,sw)
            se -= m
            sw -= m
            s += m
        }

        if (se != 0 && n != 0) {
            didSomething = true
            const m = Math.min(se,n)
            se -= m
            n -= m
            ne += m
        }
        if (sw != 0 && n != 0) {
            didSomething = true
            const m = Math.min(sw,n)
            sw -= m
            n -= m
            nw += m
        }
        if (ne != 0 && s != 0) {
            didSomething = true
            const m = Math.min(ne,s)
            ne -= m
            s -= m
            se += m
        }
        if (nw != 0 && s != 0) {
            didSomething = true
            const m = Math.min(nw,s)
            nw -= m
            s -= m
            sw += m
        }
    } while(didSomething)
    return n+s+ne+nw+se+sw
}
