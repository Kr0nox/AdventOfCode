export async function taskOne(input: string[]): Promise<void> {
    const deque = new Deque(10007)
    const input2 = Array.from(input)
    console.log(input2.length)
    for (const i of input) {
        input2.push(i)
    }
    for (const i of input) {
        input2.push(i)
    }
    for (const i of input) {
        input2.push(i)
    }
    for (const i of input) {
        input2.push(i)
    }
    console.log(input2.length)
    for (const i of input2) {
        if (i.startsWith('deal with increment')) {
            deque.deal(Number(i.split(' ')[3]))
        } else
        if (i.startsWith('cut')) {
            deque.cut(Number(i.split(' ')[1]))
        } else
        if (i.startsWith('deal into new stack')) {
            deque.asStack()
        } else throw i
    }
    let cur = deque.head
    let i = 0
    while(cur.val != 2019) {
        i++
        cur = cur.next!
    }
    console.log(i)
}

export async function taskTwo(input: string[]): Promise<void> {
    let position = 2020n
    let length = 119315717514047n

    const instructions = input.map(i => {
        if (i.startsWith('deal with increment')) {
            const count = Number(i.split(' ')[3])
            return [BigInt(count), 0n]
        } else
        if (i.startsWith('cut')) {
            const count = Number(i.split(' ')[1])
            return [1n, (BigInt(-count)+length)%length]
        } else
        if (i.startsWith('deal into new stack')) {
            return [-1n, length - 1n]
        } else throw i
    })
    console.log(instructions)

    const reduced = [1n,0n]
    for (const i of instructions) {
        reduced[0] *= i[0]
        reduced[1] *= i[0]
        reduced[1] += i[1]
        reduced[0] %= length
        reduced[1] %= length
    }
    console.log(reduced)
    
    const totalRounds = 101741582076661n
    const x = reduced[0]%length
    const y = reduced[1]%length
    let pow = modPow(x,totalRounds,length)
    if (pow < 0) pow += length
    const invData1 = extendedEuclidian(1n-x, length)
    let bFactor = ((1n-pow)*invData1[1])%length
    if (bFactor < 0) bFactor += length
    const b = (bFactor * y) % BigInt(length)
    let invPowData = extendedEuclidian(pow, length)
    let invPow = invPowData[1] % length
    let r = ((2020n-b)*invPow) % length
    if (r < 0) r += length
    console.log(r.toString())


    function modPow(base: bigint, expo: bigint, m: bigint) {
        let x = base % m
        let res = expo & 1n? x: 1n
        do {
            x = x**2n % m
            if (expo & 2n) res = res * x % m
        } while (expo /= 2n)
        return res
    }

    function extendedEuclidian(a: bigint, b: bigint): bigint[] {
        if (b==0n) return [a, 1n, 0n]
        const [d1, s1, t1] = extendedEuclidian(b, a % b)
        const [d,s,t] = [d1, t1, s1-(a/b)*t1]
        return [d,s,t]
    }
}

interface Node {
    prev?: Node
    next?: Node
    val: number
}

class Deque {
    public head: Node
    public tail: Node

    constructor (private length: number) {
        this.head = {val: 0}
        let last = this.head
        for (let i = 1; i < this.length; i++) {
            const n = {
                val: i,
                prev: last
            }
            last.next = n
            last = n
        }
        this.tail = last
    }

    public cut(count: number) {
        if (count > 0) {
            let cur = this.head
            let start = this.head
            for (let i = 0; i < count-1; i++) {
                cur = cur.next!
            }
            this.head = cur.next!
            start.prev = this.tail
            this.tail.next = start
            this.tail = cur

            this.tail.next = undefined
            this.head.prev = undefined
        } else {
            let cur = this.tail
            let start = this.tail
            for (let i = 0; i < Math.abs(count)-1; i++) {
                cur = cur.prev!
            }
            this.tail = cur.prev!
            start.next = this.head
            this.head.prev = start
            this.head = cur

            this.head.prev = undefined
            this.tail.next = undefined
        }
    }

    public deal(inc:number) {
        const dealt = Array.from({length: this.length}, () => -1)
        let i = 0
        let cur: Node|undefined = this.head
        while(cur != undefined) {
            dealt[i] = cur.val
            cur = cur.next
            i += inc
            if (i >= this.length) i -= this.length
        }

        this.head = {val: dealt[0]}
        let last = this.head
        for (let i = 1; i < this.length; i++) {
            const n = {
                val: dealt[i],
                prev: last
            }
            last.next = n
            last = n
        }
        this.tail = last
    }

    public asStack() {
        this.head = {val:this.tail.val}
        let curNew = this.head
        let curOld = this.tail.prev
        while(curOld != undefined) {
            let n = {
                val: curOld.val,
                prev: curNew
            }
            curNew.next = n
            curNew = n
            curOld = curOld.prev
        }
        this.tail = curNew
    }

    public print() {
        let a = ''
        let cur = this.head as Node|undefined
        while(cur != undefined) {
            a += cur.val + ' '
            cur = cur.next
        }
        console.log(a)
    }
}