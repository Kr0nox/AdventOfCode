export async function taskOne(input: string[]): Promise<void> {
    let best = [0,0,0,0]
    const bots = input.map(i => {
        const r = /pos=<(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)>, r=(-?[0-9]+)/.exec(i)!
        const l = [r[1],r[2],r[3],r[4]].map(Number)
        if (l[3] > best[3]) best = l
        return l
    })
    let c = 0
    for (const b of bots) {
        const d = Math.abs(b[0]-best[0])+Math.abs(b[1]-best[1])+Math.abs(b[2]-best[2])
        if (d <= best[3]) c++
    }
    console.log(c)
}

export async function taskTwo(input: string[]): Promise<void> {
    const bots = input.map(i => {
        const r = /pos=<(-?[0-9]+),(-?[0-9]+),(-?[0-9]+)>, r=(-?[0-9]+)/.exec(i)!
        const l = [r[1],r[2],r[3],r[4]].map(Number)
        return l
    })

    let max = 0
    let minD = Infinity
    for (const b of bots) {
        let m = doBot(b)
        if (m[0] > max) {
            max = m[0]
            minD = m[1]
        } else if (m[0] == max) {
            if (m[1] < minD) {
                max = m[0]
                minD = m[1]
            }
        }
    }
    console.log(minD, max)

    function doBot(b: number[]) {
        let max = 0
        let maxD = Infinity
        for (let xD = -b[3]; xD <= b[3]; xD++) {
            for (let yD = -b[3]+Math.abs(xD); yD <= b[3]-Math.abs(xD); yD++) {
                const zD = b[3] - Math.abs(xD) - Math.abs(yD)
                const c1 = checkOverlap([b[0]+xD,b[1]+yD,b[2]+zD])
                const c2 = checkOverlap([b[0]+xD,b[1]+yD,b[2]-zD])
                if (c1 > max) {
                    max = c1
                    maxD = dist([b[0]+xD,b[1]+yD,b[2]+zD])
                } else if (c1 == max) {
                    const d = dist([b[0]+xD,b[1]+yD,b[2]+zD])
                    if (d < maxD) {
                        max = c1
                        maxD = d
                    }
                }
                if (c2 > max) {
                    max = c2
                    maxD = dist([b[0]+xD,b[1]+yD,b[2]-zD])
                } else if (c2 == max) {
                    const d = dist([b[0]+xD,b[1]+yD,b[2]-zD])
                    if (d < maxD) {
                        max = c2
                        maxD = d
                    }
                }
            }
        }
        return [max, maxD] 
    }

    function dist(n: number[]) {
        return Math.abs(n[0])+Math.abs(n[1])+Math.abs(n[2])
    }

    function checkOverlap(check: number[]) {
        let c = 0
        for (const b of bots) {
            const d = Math.abs(b[0]-check[0])+Math.abs(b[1]-check[1])+Math.abs(b[2]-check[2])
            if (d <= b[3]) c++
        }
        return c
    }
}

