export async function taskOne(input: string[]): Promise<void> {
    let x = 0
    let y = 0
    for (const i of input) {
        const units = parseInt(i.split(" ")[1].trim())
        if (i.startsWith("f")) x+= units
        if (i.startsWith("d"))y+=units
        if(i.startsWith("u"))y-=units
    }
    console.log(x*y)
}

export async function taskTwo(input: string[]): Promise<void> {
    let x = 0
    let a = 0
    let y = 0
    for (const i of input) {
        const units = parseInt(i.split(" ")[1].trim())
        if (i.startsWith("f")) {x+= units; y+=units*a}
        if (i.startsWith("d"))a+=units
        if(i.startsWith("u"))a-=units
    }
    console.log(x*y)
}