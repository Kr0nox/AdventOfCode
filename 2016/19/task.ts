export async function taskOne(input: string[]): Promise<void> {
    const l = parseInt(input[0])
    let circle = {c: 1, i: 1} as Node
    let first = circle
    for (let i = 1; i < l; i++) {
        const n = {c: 1, i:i+1, r:circle} as Node
        circle.l = n
        circle = n
    }
    circle.l = first
    first.r = circle
    circle = first
    while(circle.i != circle.l.i) {
        circle.c += circle.l.c
        circle.l = circle.l.l
        circle.l.r = circle
        circle = circle.l
    }
    console.log(circle.i)
}

export async function taskTwo(input: string[]): Promise<void> {
    let l = parseInt(input[0])
    let circle = {c: 1, i: 1} as Node
    let first = circle
    for (let i = 1; i < l; i++) {
        const n = {c: 1, i:i+1, r:circle} as Node
        circle.l = n
        circle = n
    }

    circle.l = first
    first.r = circle
    circle = first
    //print(circle)
    let i = 0
    while(circle.i != circle.l.i) {
        i++
        const toGo = Math.floor(l/2)
        let n = circle
        for (let i = 0; i < toGo; i++) {
            n = n.l
        }
        //console.log('Steal:',circle.i, n.i)
        n.l.r = n.r
        n.r.l = n.l
        circle = circle.l
        l--
        if (i %1000 == 0) {
            console.log(i)
        }
    }
    console.log(circle.i)
}

interface Node {
    c: number
    i: number
    l: Node
    r: Node
}

function print(n: Node) {
    let i =  n.i
    let s = ''
    do {
        s += n.i + ' '
        n = n.l
    } while(n.i != i)
    console.log(s)
}