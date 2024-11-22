export async function taskOne(input: string[]): Promise<void> {
    const parts = input[0].split(',')

    let cX = 0
    let cY = 0

    const lines: Line[] = []
    for (const p of parts) {
        let dir = [0,0]
        if (p[0] == 'U') dir = [0,1]
        if (p[0] == 'D') dir = [0,-1]
        if (p[0] == 'L') dir = [-1,0]
        if (p[0] == 'R') dir = [1,0]
        const mov = Number(p.substring(1))
        const newLine = {
            x1: cX,
            y1: cY,
            x2: cX + dir[0] * mov,
            y2: cY + dir[1] * mov
        }
        lines.push(newLine)
        cX = newLine.x2
        cY = newLine.y2
    }

    const parts2 = input[1].split(',')
    let minD = Infinity
    cX = 0
    cY = 0
    for (const p of parts2) {
        let dir = [0,0]
        if (p[0] == 'U') dir = [0,1]
        if (p[0] == 'D') dir = [0,-1]
        if (p[0] == 'L') dir = [-1,0]
        if (p[0] == 'R') dir = [1,0]
        const mov = Number(p.substring(1))
        const newLine = {
            x1: cX,
            y1: cY,
            x2: cX + dir[0] * mov,
            y2: cY + dir[1] * mov
        }

        for (const l of lines) {
            const i = intersect(l, newLine)
            if (i == null) continue
            const d = Math.abs(i[0]) + Math.abs(i[1])
            if (d == 0) continue
            if (d < minD) minD = d
        }

        cX = newLine.x2
        cY = newLine.y2
    }
    console.log(minD)
}

export async function taskTwo(input: string[]): Promise<void> {
    interface Line2 extends Line {
        goneDistance: number
    }

    const parts = input[0].split(',')

    let cX = 0
    let cY = 0
    let cD = 0

    const lines: Line2[] = []
    for (const p of parts) {
        let dir = [0,0]
        if (p[0] == 'U') dir = [0,1]
        if (p[0] == 'D') dir = [0,-1]
        if (p[0] == 'L') dir = [-1,0]
        if (p[0] == 'R') dir = [1,0]
        const mov = Number(p.substring(1))
        const newLine = {
            x1: cX,
            y1: cY,
            x2: cX + dir[0] * mov,
            y2: cY + dir[1] * mov,
            goneDistance: cD
        }
        lines.push(newLine)
        cX = newLine.x2
        cY = newLine.y2
        cD += mov
    }

    const parts2 = input[1].split(',')
    let minD = Infinity
    cX = 0
    cY = 0
    cD = 0
    for (const p of parts2) {
        let dir = [0,0]
        if (p[0] == 'U') dir = [0,1]
        if (p[0] == 'D') dir = [0,-1]
        if (p[0] == 'L') dir = [-1,0]
        if (p[0] == 'R') dir = [1,0]
        const mov = Number(p.substring(1))
        const newLine = {
            x1: cX,
            y1: cY,
            x2: cX + dir[0] * mov,
            y2: cY + dir[1] * mov
        }

        for (const l of lines) {
            const i = intersect(l, newLine)
            if (i == null) continue
            if(i[0] == 0 && i[1] == 0) continue
            const d = cD + l.goneDistance + Math.abs(l.x1 - i[0]) + Math.abs(l.y1 - i[1]) + Math.abs(newLine.x1 - i[0]) + Math.abs(newLine.y1 - i[1])
            if (d < minD) minD = d
        }

        cX = newLine.x2
        cY = newLine.y2
        cD += mov
    }
    console.log(minD)
}

interface Line {
    x1: number
    x2: number
    y1: number
    y2: number
}

function intersect(l1: Line, l2: Line): [number, number]|null {
    const x1 = l1.x1
    const x2 = l1.x2
    const x3 = l2.x1
    const x4 = l2.x2
    const y1 = l1.y1
    const y2 = l1.y2
    const y3 = l2.y1
    const y4 = l2.y2

    const pX = ((x1*y2 - y1*x2)*(x3 - x4) - (x1 - x2)*(x3*y4 - y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4))
    const pY = ((x1*y2-y1*x2)*(y3-y4)-(y1-y2)*(x3*y4-y3*x4))/((x1-x2)*(y3-y4)-(y1-y2)*(x3-x4))

    if (!inRange(pX, x1,x2) || !inRange(pX, x3,x4) || !inRange(pY, y1,y2) || !inRange(pY,y3,y4)) {
        return null
    } 

    return [pX, pY]
}

function inRange(test: number, n1: number, n2: number) {
    let max = n1 > n2 ? n1 : n2
    let min = n1 > n2 ? n2 : n1

    return test >= min && test <= max
}