export async function taskOne(input: string[]): Promise<void> {
    const originalNums = input.map((i, ind) => {return{val:parseInt(i.trim()), originalPos: ind}})
    let a = [...originalNums]

    move(a, originalNums)
    
    result(a)
}

export async function taskTwo(input: string[]): Promise<void> {
    const originalNums = input.map((i, ind) => {return{val:parseInt(i.trim()) * 811589153, originalPos: ind}})
    let a = [...originalNums]

    for(let _c = 0; _c < 10; _c++) {
        move(a, originalNums)
    }

    result(a)
}

function move(a: {val: number, originalPos: number}[], originalNums: {val: number, originalPos: number}[]) {
    function swap(i: number, j: number) {
        const temp = a[i]
        a[i] = a[j]
        a[j] = temp
    }

    for (const n of originalNums) {
        let current = a.findIndex(i => i.val==n.val && i.originalPos == n.originalPos)
        let newPos = (current + n.val)
        newPos -= (Math.floor(newPos/(originalNums.length-1)))*(originalNums.length - 1)
        
        if (newPos == 0) {
            newPos = originalNums.length-1
        }
        
        while (current != newPos) {
            if (newPos > current) {
                swap(current, current+1)
                current++
            } else {
                swap(current, current-1)
                current--
            }
        }
    }
}

function result(a: {val: number, originalPos: number}[]) {
    let zero = a.findIndex(i => i.val==0)
    const ti1 = (zero + 1000) % a.length
    const ti2 = (zero + 2000) % a.length
    const ti3 = (zero + 3000) % a.length
    console.log(a[ti1].val+ a[ti2].val+ a[ti3].val)
}