export async function taskOne(input: string[]): Promise<void> {
    const mcb1s = Array.from(Array(input[0].length).keys()).map(i => mcb1(input, i))
    const gamma = parseInt(mcb1s.map(i => i ? "1":"0").join("").trim(),2)
    const epsilon = parseInt(mcb1s.map(i => !i ? "1":"0").join("").trim(),2)
    console.log(gamma*epsilon)
}

export async function taskTwo(input: string[]): Promise<void> {
    let ox = Array.from(input)
    let co = Array.from(input)
    let i = 0
    while(ox.length > 1) {
        const mcb = mcb1(ox, i)
        ox = ox.filter(s => (s.charAt(i) == "1") == mcb)
        i++
    }
    i = 0
    while(co.length > 1) {
        console.log(co)
        const mcb = mcb1(co, i)
        co = co.filter(s => (s.charAt(i) == "0") == mcb)
        i++
    }
    console.log(parseInt(co[0].trim(), 2)*parseInt(ox[0].trim(), 2))
}

function mcb1(input: string[], col: number) {
    let ones = 0
    for (const i of input) {
        if (i.charAt(col) == "1") ones++
    }
    return ones >= input.length / 2
}
