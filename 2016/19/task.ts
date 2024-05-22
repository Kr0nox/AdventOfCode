import {Stack, Queue} from '../../base/simpleStructure'

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
    let lL = 0
    let lR = 0
    const left = new Deque()
    const right = new Deque
    for (let i = 1; i <= l; i++) {
        if (i < Math.floor(l/2)+1) {
            left.pushR(i)
            lL++
        } else {
            right.pushL(i)
            lR++
        }
    }

    while(lL > 0 && lR > 0) {
        if (lL > lR) {
            left.popR()
            lL--
        } else {
            right.popR()
            lR--
        }
        right.pushL(left.popL())
        left.pushR(right.popR())
    }
    if (lL == 0) console.log(right.head())
    else console.log(left.head())
}

class Deque {

    constructor() {}
    h: N|null = null
    t: N|null = null
    
    head() {return this.h?.v??-1}
    isEmpty() {return this.h != null}
    popL() {
        if (this.h == null) throw "empty"
        const n = this.h.v
        this.h = this.h.r
        if (this.h == null) this.t = null
        else this.h.l = null
        return n
    }
    popR() {
        if (this.t == null) throw "empty"
        const n = this.t.v
        this.t = this.t.l
        if (this.t == null) this.h = null
        else this.t.r = null
        return n
    }

    pushL(v: number) {
        const n: N = {
            v,
            l: null,
            r: null
        }
        if (this.h == null) {
            this.h = n
            this.t = n
            return
        }
        this.h.l = n
        n.r = this.h
        this.h = n
    }
    pushR(v: number) {
        const n: N = {
            v,
            l: null,
            r: null
        }
        if (this.t == null) {
            this.h = n
            this.t = n
            return
        }
        this.t.r = n
        n.l = this.t
        this.t = n
    }

    asArray() {
        const r: number[] = []
        let n = this.h
        while(n != null) {
            r.push(n.v)
            n = n.r
        }
        return r
    }
}

interface N {
    l: N|null
    r: N|null
    v: number
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