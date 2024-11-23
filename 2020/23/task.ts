export async function taskOne(input: string[]): Promise<void> {
    const start = input[0].split('').map(i => {return {val: Number(i)} as Node})
    const l = start.length
    for (let i = 0; i < start.length; i++) {
        start[i].next = start[(i+1)%l]
    }
    let cur = start[0]
    //print(cur)

    for (let i = 0; i < 100; i++) {
        //console.log('i:', i)
        let removed = cur.next
        const pickedUpValues = [removed.val, removed.next.val, removed.next.next.val]
        //console.log('removed:',pickedUpValues)
        cur.next = removed.next.next.next

        let goal = cur.val - 1
        if (goal < 1) goal = 9
        while(pickedUpValues.includes(goal)) {
           goal--
           if (goal < 1) goal = 9
        }
        //console.log('goal:', goal)
        let goalCup = cur
        while(goalCup.val != goal) goalCup = goalCup.next

        let oldNext = goalCup.next
        goalCup.next = removed
        removed.next.next.next = oldNext
        
        cur = cur.next
        //print(cur)
    }

    while(cur.val != 1) cur = cur.next
    let r = ''
    cur = cur.next
    while(cur.val != 1) {
        r += cur.val
        cur = cur.next
    }

    console.log(r)


    function print(n: Node) {
        let r = ''
        let c = n
        do {
            r += c.val + " "
            c = c.next
        } while(c.val != n.val)
        console.log(r)
    }


    interface Node {
        val: number
        next: Node
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const circle = new Map<number, number>()
    const start = input[0].split('').map(Number)

    for (let i = 0; i < start.length-1; i++) {
        circle.set(start[i], start[i+1])
    }
    circle.set(start[start.length-1], start.length + 1)
    for (let i = start.length+1; i < 1000000; i++) {
        circle.set(i, i+1)
    }
    circle.set(1000000, start[0])
    //circle.set(start[start.length-1], start[0])

    let cur = start[0]

    for (let i = 0; i < 10000000; i++) {
        let removed = get(cur)
        let pickedUpValues = [removed, get(removed), get(get(removed))]
        circle.set(cur, get(pickedUpValues[2]))

        let goal = cur - 1
        if (goal < 1) goal = 1000000
        while(pickedUpValues.includes(goal)) {
           goal--
           if (goal < 1) goal = 1000000
        }

        let oldNext = get(goal)
        circle.set(goal, removed)
        circle.set(pickedUpValues[2], oldNext)

        cur = get(cur)
    }

    console.log(get(1) * get(get(1)))

    function get(n: number) {
        return circle.get(n)!
    }

    function print() {
        let c = cur
        let r = ''
        do {
            r += c
            c = get(c)
        } while(c != cur)
        console.log(r)
    }

}