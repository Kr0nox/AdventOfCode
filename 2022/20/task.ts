export async function taskOne(input: string[]): Promise<void> {
    const originalNums = input.map((i, ind) => {return{val:parseInt(i.trim()), originalPos: ind}})
    let a = [...originalNums]

    for (const n of originalNums) {
        const current = a.findIndex(i => i.val==n.val && i.originalPos == n.originalPos)
        let newPos = (current + n.val) % originalNums.length
        if (newPos < 0) {
            newPos += originalNums.length
        } 
        
        console.log(n.val)
        console.log(a.map(i=>i.val))
        console.log(a.slice(0, current).map(i=>i.val))
        console.log(a.slice(current+1,newPos+1).map(i=>i.val))
        console.log(a.slice(newPos).map(i=>i.val))
        a = a.slice(0, current).concat(a.slice(current+1,newPos+1)).concat([n]).concat(a.slice(newPos+1))
        
        console.log(a.map(i=>i.val))
        console.log(" ")
    }

    console.log(a)

}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}