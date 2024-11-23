export async function taskOne(input: string[]): Promise<void> {
    let pos = [0,0]
    let fac = [0,1]

    for (const i of input) {
        const n = Number(i.substring(1))
        if (i.startsWith('F')) {
            pos[0] += n * fac[0]
            pos[1] += n * fac[1]
        } else if(i.startsWith('N')) {
            pos[0] += n
        } else if(i.startsWith('S')) {
            pos[0] -= n
        } else if(i.startsWith('E')) {
            pos[1] += n
        } else if(i.startsWith('W')) {
            pos[1] -= n
        } else if (i == 'L180' || i == 'R180') {
            fac[0] = -fac[0]
            fac[1] = -fac[1]
        } else if (i == 'R90' || i == 'L270') {
            let t = fac[0]
            fac[0] = -fac[1]
            fac[1] = t
        } else if (i == 'L90' || i == 'R270') {
            let t = fac[0]
            fac[0] = fac[1]
            fac[1] = -t
        } else {
            throw i
        }
    }
    console.log(Math.abs(pos[0])+Math.abs(pos[1]))
}

export async function taskTwo(input: string[]): Promise<void> {
    let pos = [0,0]
    let wayRel = [1,10]

    for (const i of input) {
        const n = Number(i.substring(1))
        if (i.startsWith('F')) {
            pos[0] += n * wayRel[0]
            pos[1] += n * wayRel[1]
        } else if(i.startsWith('N')) {
            wayRel[0] += n
        } else if(i.startsWith('S')) {
            wayRel[0] -= n
        } else if(i.startsWith('E')) {
            wayRel[1] += n
        } else if(i.startsWith('W')) {
            wayRel[1] -= n
        } else if (i == 'L180' || i == 'R180') {
            wayRel[0] = -wayRel[0]
            wayRel[1] = -wayRel[1]
        } else if (i == 'R90' || i == 'L270') {
            let t = wayRel[0]
            wayRel[0] = -wayRel[1]
            wayRel[1] = t
        } else if (i == 'L90' || i == 'R270') {
            let t = wayRel[0]
            wayRel[0] = wayRel[1]
            wayRel[1] = -t
        } else {
            throw i
        }
    }
    console.log(Math.abs(pos[0])+Math.abs(pos[1]))
}