import { Queue } from "../../base/simpleStructure";

export async function taskOne(input: string[]): Promise<void> {
    const p1 = new Queue<number>()
    const p2 = new Queue<number>()
    
    let i = 1
    while(input[i] != '') {
        p1.push(Number(input[i]))
        i++
    }
    i+=2
    while(i < input.length) {
        p2.push(Number(input[i]))
        i++
    }

    while(!(p1.isEmpty() || p2.isEmpty())) {
        const c1 = p1.pop()
        const c2 = p2.pop()
        if (c1 > c2) {
            p1.push(c1)
            p1.push(c2)
        } else {
            p2.push(c2)
            p2.push(c1)
        }
    }
    const winner = p1.isEmpty() ? p2.asArray() : p1.asArray()
    let c = 0
    for (let i = 0; i < winner.length; i++) {
        c += (winner.length - i) * winner[i]
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const p1: number[] = []
    const p2: number[] = []
    
    let i = 1
    while(input[i] != '') {
        p1.push(Number(input[i]))
        i++
    }
    i+=2
    while(i < input.length) {
        p2.push(Number(input[i]))
        i++
    }
    console.log(play(new ExtendedQueue(p1), new ExtendedQueue(p2)).s);

    function play(p1: ExtendedQueue<number>, p2: ExtendedQueue<number>): { w: 1|2, s: number } {
        const seenHands = new Set<string>
        while(!(p1.isEmpty() || p2.isEmpty())) {
            const s = stringifyHand(p1) + '|' + stringifyHand(p2)
            if (seenHands.has(s)) {
                return { w: 1, s: calcScore(p1.asArray()) }
            } 
            seenHands.add(s)

            const c1 = p1.pop()
            const c2 = p2.pop()
            if (p1.length >= c1 && p2.length >= c2) {
                const r = play(new ExtendedQueue(p1.getFirstN(c1)), new ExtendedQueue(p2.getFirstN(c2)))
                if (r.w == 1) {
                    p1.push(c1)
                    p1.push(c2)
                } else {
                    p2.push(c2)
                    p2.push(c1)
                }
            } else {
                if (c1 > c2) {
                    p1.push(c1)
                    p1.push(c2)
                } else {
                    p2.push(c2)
                    p2.push(c1)
                }
            }
        }
        return {
            w: p1.isEmpty() ? 2:1,
            s: calcScore(p1.isEmpty() ? p2.asArray() : p1.asArray())
        }
    }

    function calcScore(w: number[]) {
        let c = 0
        for (let i = 0; i < w.length; i++) {
            c += (w.length - i) * w[i]
        }
        return c
    }

    function stringifyHand(h: ExtendedQueue<number>) {
        return h.asArray().join(',')
    }

    
}

class ExtendedQueue<T> extends Queue<T> {

    public length = 0

    constructor(vs: T[]) {
        super()
        for (const v of vs) this.push(v)
    }


    public getFirstN(n: number) {
        const r: T[] = []
        let e = this._head
        for (let i = 0; i < n; i++) {
            r.push(e?.val!)
            e = e?.next
        }
        return r
    }

    public pop() {
        this.length--
        return super.pop()
    }

    public push(v: T) {
        this.length++
        super.push(v)
    }
}