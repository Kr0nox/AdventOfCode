export async function taskOne(_input: string[]): Promise<void> {
    console.log(getCollapsed(_input[0]).length)
}

export async function taskTwo(input: string[]): Promise<void> {
    const collapsed = getCollapsed(input[0])
    const letters = "abcdefghijklmnopqrstuvwxyz".split('')
    let min = collapsed.length;
    for (const l of letters) {
        const len = getCollapsed(collapsed.replace(new RegExp(`${l}|${l.toUpperCase()}`, 'g'), '')).length
        if (len < min) {
            min = len
        }
    }
    console.log(min)
}

function getCollapsed(input: string) {
    interface Node {
        val: string
        next?: Node
        prev?: Node
    }
    const start: Node = {
        val: '_'
    }
    let cur = start
    let l = input.length;
    for (let i = 0; i < input.length; i++) {
        const n = {
            val: input[i],
            prev: cur
        }
        cur.next = n
        cur = n
    }
    let doneStuff = false
    
    do {
        doneStuff = false
        cur = start

        while(cur && cur.next) {
            const firstIsLowerCase = cur.val.toLowerCase() == cur.val
            const secondIsUpperCase = cur.next!.val.toUpperCase() == cur.next!.val
            if (firstIsLowerCase && secondIsUpperCase || !firstIsLowerCase && !secondIsUpperCase) {
                if (cur.val.toLowerCase() == cur.next!.val.toLowerCase()) {
                    doneStuff = true
                    cur.prev!.next = cur.next!.next
                    cur.prev!.next!.prev = cur.prev!
                    cur = cur.prev!
                    l-=2
                }
            } 
            cur = cur.next!
        }
    } while(doneStuff)
    cur = start.next!
    let r = ""
    while(cur) {
        r += cur.val
        cur = cur.next!
    }
    return r
}