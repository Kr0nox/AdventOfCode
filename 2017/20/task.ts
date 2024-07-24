export async function taskOne(input: string[]): Promise<void> {
    let minA = Infinity
    let minAV = Infinity
    let minAP = Infinity
    let minAIdx = -1
    for (let i = 0; i < input.length; i++) {
        const r = /p=<([0-9-]+),([0-9-]+),([0-9-]+)>, v=<([0-9-]+),([0-9-]+),([0-9-]+)>, a=<([0-9-]+),([0-9-]+),([0-9-]+)>/.exec(input[i])!
        const p = manhatten([r[1], r[2], r[3]].map(Number))
        const v = manhatten([r[4], r[5], r[6]].map(Number))
        const a = manhatten([r[7], r[8], r[9]].map(Number))
        let update = false;

        if (a < minA) update = true
        if (a == minA) {
            if (v < minAV) update = true
            if (v == minAV) {
                if (p < minAP) update = true
                if (p == minAP) throw "Absolutly equal"
            }
        }
        
        if (update) {
            minAIdx = i
            minA = a
            minAV = v
            minAP = p
        }
    }
    console.log(minAIdx)
}

export async function taskTwo(input: string[]): Promise<void> {
    interface Partical {
        p: number[]
        v: number[]
        a: number[],
        wasHit: boolean
    }

    const willHit = new Set<number>()
    let maxT = 0

    const particals: Partical[] = input.map(i => {
        const r = /p=<([0-9-]+),([0-9-]+),([0-9-]+)>, v=<([0-9-]+),([0-9-]+),([0-9-]+)>, a=<([0-9-]+),([0-9-]+),([0-9-]+)>/.exec(i)!
        return {
            p: [r[1], r[2], r[3]].map(Number),
            v: [r[4], r[5], r[6]].map(Number),
            a: [r[7], r[8], r[9]].map(Number),
            wasHit: false
        }
    })

    for (let i = 0; i < particals.length; i++) {
        for (let j = i + 1; j < particals.length; j++) {
            const t = hit(particals[i], particals[j])
            if (t > maxT) {
                maxT = t
            }
        }
    }

    for (let t = 0; t <= maxT; t++) {
        for (let i = 0; i < particals.length; i++) {
            if (particals[i].wasHit) continue
            for (let j = i + 1; j < particals.length; j++) {
                if (particals[j].wasHit) continue
                /*const h = hit(particals[i], particals[j])
                if (h < 0) continue
                if (Math.abs(t-h) < 0.00001) {
                    particals[i].wasHit = true
                    particals[j].wasHit = true
                }*/
                if (particals[i].p[0] == particals[j].p[0] && particals[i].p[1] == particals[j].p[1] && particals[i].p[2] == particals[j].p[2]) {
                    particals[i].wasHit = true
                    particals[j].wasHit = true
                }
            }
        }
        for (const p of particals) {
            p.v[0] += p.a[0]
            p.v[1] += p.a[1]
            p.v[2] += p.a[2]
            p.p[0] += p.v[0]
            p.p[1] += p.v[1]
            p.p[2] += p.v[2]
        }
    }

    let notHit = 0;
    for (const p of particals) {
        if (!p.wasHit) notHit++
    }
    console.log(notHit)

    function hit(p1: Partical, p2: Partical) {
        function singleHit(a: number[], b: number[]) {
            const A = a[0]-b[0]
            const B = a[1]-b[1]
            const C = a[2]-b[2]
            if (A == 0) {
                if (B == 0) return C == 0 ? 0 : -1
                return -C/B
            }
            if (B*B-4*A*C < -0.00001) return -1
            const h1 = (-B + Math.sqrt(B*B-4*A*C))/(2*A)
            const h2 = (-B - Math.sqrt(B*B-4*A*C))/(2*A)
            if (h1 < 0 && h2 < 0) return -1
            if (h1 < 0) return h2
            if (h2 < 0) return h1

            return Math.min(h1, h2)
        }
        const hs = [-1,-1,-1]
        for (let i = 0; i < 3; i++) {
            hs[i] = singleHit(
                [p1.a[i] / 2, p1.a[i]/2 + p1.v[i], p1.p[i]],
                [p2.a[i] / 2, p2.a[i]/2 + p2.v[i], p2.p[i]]
            )
        }
        if (hs.some(i => i < -0.00001)) return -1
        let h01 = Math.abs(hs[0] - hs[1])
        let h12 = Math.abs(hs[2] - hs[1])
        let h02 = Math.abs(hs[0] - hs[2])
        if (h01 > 0.00001 || h12 > 0.00001 || h02 > 0.00001) return -1
        return hs[0]
    }
}

function manhatten(n: number[]) {
    return n.map(Math.abs).reduce((a,b)=>a+b,0)
}