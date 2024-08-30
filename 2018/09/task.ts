export async function taskOne(input: string[]): Promise<void> {
    const _p = input[0].split(' ')
    play(Number(_p[0]), Number(_p[6]))
}

export async function taskTwo(input: string[]): Promise<void> {
    const _p = input[0].split(' ')
    play(Number(_p[0]), Number(_p[6]) * 100)
}

function play(playerCount: number, lastMarbel: number) {
    interface Node {
        val: number,
        next: Node,
        prev: Node
    }

    let cur: Node = {val: 0, next: {} as Node, prev: {} as Node}
    cur.next = cur
    cur.prev = cur

    const scores = Array.from({length: playerCount}, () => 0)
    let curPlayer = 0;

    for (let i = 1; i <= lastMarbel; i++) {
        if (i % 23 == 0) {
            for(let i = 0; i < 8; i++) {
                cur = cur.prev
            }
            scores[curPlayer] += i + cur.next.val
            cur.next = cur.next.next
            cur.next.prev = cur
            cur = cur.next
        } else {
            cur = cur.next
            const newM = {val: i, next: cur.next, prev: cur}
            cur.next.prev = newM;
            cur.next = newM
            cur = newM
        }
        curPlayer = (curPlayer+1)%playerCount
    }
    let m = 0
    for (let i = 0; i < playerCount; i++) {
        if (scores[i] > m) m = scores[i]
    }

    console.log(m)
}