export async function taskOne(input: string[]): Promise<void> {
    const lines = input.map(getCoords).filter(c => c[0] == c[2] || c[1] == c[3])
    const xLen = Math.max(...lines.map(i => [i[0], i[2]]).flat())
    const yLen = Math.max(...lines.map(i => [i[1], i[3]]).flat())
    const field = Array.from({length: xLen+1}, () => Array.from({length: yLen+1}, ()=>0))
    for (const l of lines) {
        if (l[0] != l[2])
            for (let i = Math.min(l[0],l[2]); i <= Math.max(l[0],l[2]); i++) {
                field[i][l[1]]++
            }
            
        if (l[1] != l[3])
            for (let i = Math.min(l[1],l[3]); i <= Math.max(l[1],l[3]); i++) {
                field[l[0]][i]++
            }
    }
    let sum = 0
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] > 1) sum++
        }
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    const lines = input.map(getCoords)
    console.log(lines)
    const xLen = Math.max(...lines.map(i => [i[0], i[2]]).flat())
    const yLen = Math.max(...lines.map(i => [i[1], i[3]]).flat())
    const field = Array.from({length: xLen+1}, () => Array.from({length: yLen+1}, ()=>0))
    for (const l of lines) {
        const xMin = Math.min(l[0],l[2])
        const xMax = Math.max(l[0],l[2])
        const yMin = Math.min(l[1],l[3])
        const yMax = Math.max(l[1],l[3])
        let xRel = (xMax-xMin)/(l[2]-l[0])
        let yRel = (yMax-yMin)/(l[3]-l[1])

        if (isNaN(xRel)) xRel = 0
        if(isNaN(yRel)) yRel = 0
        
        const d = Math.max(xMax-xMin, yMax-yMin)
        for (let i = 0; i <= d; i++) {
            field[l[0]+i*xRel][l[1]+i*yRel]++
        }
    }
    let sum = 0
    for (let i = 0; i < field.length; i++) {
        for (let j = 0; j < field[i].length; j++) {
            if (field[i][j] > 1) sum++
        }
    }
    console.log(sum)
}

function getCoords(s: string) {
    const r = /([0-9]+),([0-9]+) -> ([0-9]+),([0-9]+)/.exec(s)
    if (r == null) throw "adasd"
    return r.slice(1).map(i => parseInt(i.trim()))
}