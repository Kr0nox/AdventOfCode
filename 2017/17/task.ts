export async function taskOne(input: string[]): Promise<void> {
    interface Node {
        i: number,
        next: Node
    }

    const zero = {i:0} as Node
    zero.next = zero
    let cur = zero
    let len = 1
    const stepSize = parseInt(input[0])
    for (let i = 1; i <= 2017; i++) {
        for (let j = 0; j < stepSize; j++) {
            cur = cur.next;
        }
        let ne = {i, next: cur.next}
        cur.next = ne
        cur = cur.next
    }
    console.log(cur.next.i)
}

export async function taskTwo(input: string[]): Promise<void> {
    let pos = 0
    let last = 0
    const stepSize = parseInt(input[0])
    let curPos = 1;
    for (let i = 1; i <= 50000000; i++) {
        pos = ((pos + stepSize) % i) + 1
        if (pos == 1) last = i
    }
    console.log(last)
}