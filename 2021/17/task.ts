export async function taskOne(input: string[]): Promise<void> {
    const r = /[^=]*=([0-9]+)\.\.([0-9]+)[^=]*=(-[0-9]+)\.\.(-[0-9]+)/.exec(input[0])
    if (r == null) throw "null"
    const x1 = parseInt(r[1])
    const x2 = parseInt(r[2])
    const y1 = parseInt(r[3])
    const y2 = parseInt(r[4])
    let maxY = 0
    for (let f = 0; f < Math.max(x1,x2); f++) {
        for (let u = 0; u < -Math.min(y1,y2); u++) {
            if (simulate(f,u,x1,x2,y1,y2)) {
                const temp = u*(u+1)/2
                if (temp > maxY) maxY = temp
            }
        }
    }
    console.log(maxY)
}

export async function taskTwo(input: string[]): Promise<void> {
    const r = /[^=]*=([0-9]+)\.\.([0-9]+)[^=]*=(-[0-9]+)\.\.(-[0-9]+)/.exec(input[0])
    if (r == null) throw "null"
    const x1 = parseInt(r[1])
    const x2 = parseInt(r[2])
    const y1 = parseInt(r[3])
    const y2 = parseInt(r[4])
    let sum = 0
    for (let f = 0; f <= Math.max(x1,x2); f++) {
        for (let u = Math.min(y1,y2); u <= -Math.min(y1,y2); u++) {
            if (simulate(f,u,x1,x2,y1,y2)) {
                sum++
            }
        }
    }
    console.log(sum)
}

function simulate(f: number, u: number, x1: number, x2: number, y1: number, y2: number) {
    let x = 0;
    let y = 0;
    let hit = false
    while (y >= Math.min(y1, y2) && !hit) {
        if (x <= Math.max(x1, x2) && x >= Math.min(x1,x2) && y <= Math.max(y1,y2) && y >= Math.min(y1,y2)) hit = true
        x += f
        if (f > 0) f--
        y += u
        u--
    }
    return hit
}