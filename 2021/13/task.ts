export async function taskOne(input: string[]): Promise<void> {
    let i = 0;
    let x: number[] = []
    let y: number[] = []
    while (input[i] != "") {
        const pos = input[i].trim().split(",")
        x.push(parseInt(pos[0]))
        y.push(parseInt(pos[1]))
        i++
    }
    i++

    const foldLine = parseInt(input[i].split('=')[1])
    if (input[i].includes('x')) {
        y = fold(y, foldLine)
    } else {
        x = fold(x, foldLine)
    }
    i++
    const foldLine2 = parseInt(input[i].split('=')[1])
    if (input[i].includes('x')) {
        y = fold(y, foldLine2)
    } else {
        x = fold(x, foldLine2)
    }

    console.log(countCoords(x,y))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

function fold(arr: number[], foldLine: number) {
    return arr.map(i => {
        if(i < foldLine) return i
        if(i == foldLine) return -Infinity
        return 2*foldLine - i
    })
}

function countCoords(x: number[], y:number[]) {
    const s: Set<string> = new Set()
    for (let i = 0; i < x.length; i++) {
        if (x[i] < 0 || y[i]<0) continue
        s.add(x[i]+','+y[i])
    }
    return s.size
}