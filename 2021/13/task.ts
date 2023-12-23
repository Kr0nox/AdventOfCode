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
        x = fold(x, foldLine)
    } else {
        y = fold(y, foldLine)
    }

    console.log(countCoords(x,y))
}

export async function taskTwo(input: string[]): Promise<void> {
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

    while (i < input.length) {
        const foldLine = parseInt(input[i].split('=')[1])
        if (input[i].includes('x')) {
            x = fold(x, foldLine)
        } else {
            y = fold(y, foldLine)
        }
        i++
    }
    print(x,y)
}

function fold(arr: number[], foldLine: number) {
    return arr.map(i => {
        if(i < foldLine) return i
        if (i == foldLine) console.log(2, i, foldLine)
        return 2*foldLine - i
    })
}

function countCoords(x: number[], y:number[]) {
    const s: Set<string> = new Set()
    for (let i = 0; i < x.length; i++) {
        if (x[i] < 0 || y[i]<0) console.log("1")
        s.add(x[i]+','+y[i])
    }
    return s.size
}

function print(x: number[], y: number[]) {
    const maxX = Math.max(...x)
    const maxY = Math.max(...y)
    const grid = Array.from({length:maxY+1}, ()=> Array.from({length:maxX+1}, () => ' '))
    for (let i = 0; i < x.length; i++) { 
        grid[y[i]][x[i]] = '#'
    }
    console.log(grid.map(i=>i.join("")).join("\n"))
}