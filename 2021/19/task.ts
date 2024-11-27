export async function taskOne(input: string[]): Promise<void> {
    const finalized = getFinal(input)
    const allPoints = new Set<string>()
    for (const f of finalized) {
        for (const p of f.points) {
            allPoints.add(pointString(
                p[0]+f.x,
                p[1]+f.y,
                p[2]+f.z
            ))
        }
    }
    console.log(allPoints.size)

    function pointString(x: number, y:number, z:number) {
        return `${x}|${y}|${z}`
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const finalized = getFinal(input)
    let maxD = 0
    for (let i = 0; i < finalized.length; i++) {
        for (let j = i+1; j < finalized.length; j++) {
            let d = Math.abs(finalized[i].x - finalized[j].x) + Math.abs(finalized[i].y - finalized[j].y) + Math.abs(finalized[i].z - finalized[j].z)
            if (d > maxD) maxD = d
        }
    }
    console.log(maxD)
}

interface Scanner {
    id: number
    points: number[][]
    absoluteRelDistances: number[][]
}

interface FinalPosition {
    id: number
    points: number[][]
    absoluteRelDistances: number[][]
    x: number
    y: number
    z: number
}

function getFinal(input: string[]): FinalPosition[] {
    let i = 0
    const scanner: Scanner[] = []

    while(i < input.length) {
        i++
        let s = [] as string[]
        while(input[i] != '' && i < input.length) {
            s.push(input[i])
            i++
        }
        i++

        const points = s.map(p => p.split(',').map(Number))
        const distances: number[][] = []
        for (let j = 0; j < points.length; j++) {
            for (let k = j+1; k < points.length; k++) {
                distances.push([
                    Math.abs(points[j][0] - points[k][0]),
                    Math.abs(points[j][1] - points[k][1]),
                    Math.abs(points[j][2] - points[k][2])
                ].sort((a,b)=>a-b))
            }
        }
        scanner.push({
            id: scanner.length, points, absoluteRelDistances: distances
        })
    }

    const finalized = [{
        id: 0,
        points: scanner[0].points,
        absoluteRelDistances: scanner[0].absoluteRelDistances,
        x: 0,
        y: 0,
        z: 0
    }] as FinalPosition[]
    const finalIds = new Set<number>()
    finalIds.add(0)

    while(finalIds.size < scanner.length) {
        for (let i = 0; i < scanner.length; i++) {
            const s = scanner[i]
            if (finalIds.has(s.id)) continue
            for (const f of finalized) {
                let similar = sim(s.absoluteRelDistances,f.absoluteRelDistances,(a,b)=>a[0]==b[0]&&a[1]==b[1]&&a[2]==b[2]).length
                if (similar >= 66) {
                    let r = match(f,s)
                    if (r == false) continue
                    const g = r as FinalPosition
                    g.x += f.x
                    g.y += f.y
                    g.z += f.z
                    finalized.push(g)
                    finalIds.add(s.id)
                    break
                }
            }
        }
    }
    return finalized
}

function match(final: FinalPosition, scanner: Scanner): FinalPosition|false {
    console.log('mat', final.id, scanner.id)
    let _c = 0
    const rotations = getAllRotations(scanner.points)

    for (const r of rotations) {
        // if checking all axis at the same time is too slow: 1) check each in a parralel loop 2) store all possible values for x,y and z in their own array. 3) check all these options for one that matches when applied at the same time
        const xCheck: number[] = []
        const yCheck: number[] = []
        const zCheck: number[] = []
        const xMap = final.points.map(i => i[0])
        const yMap = final.points.map(i => i[1])
        const zMap = final.points.map(i => i[2])
        for (let x = -2000; x <= 2000; x++) {
            let simScore = sim(
                xMap,
                r.map(i => i[0]+x)
            ).length
            if(simScore >= 12) xCheck.push(x)
        }
        for (let y = -2000; y <= 2000; y++) {
            let simScore = sim(
                yMap,
                r.map(i => i[1]+y)
            ).length
            if(simScore >= 12) yCheck.push(y)
        }
        for (let z = -2000; z <= 2000; z++) {
            let simScore = sim(
                zMap,
                r.map(i => i[2]+z)
            ).length
            if(simScore >= 12) zCheck.push(z)
        }
        for (const x of xCheck) {
            for (const y of yCheck) {
                for (const z of zCheck) {
                    let simScore = sim(
                        final.points,
                        r.map(i => [i[0]+x, i[1]+y,i[2]+z]),
                        (a,b)=>a[0]==b[0]&&a[2]==b[2]&&a[1]==b[1]
                    ).length
                    if (simScore == 12) {
                        return {
                            id: scanner.id,
                            absoluteRelDistances: scanner.absoluteRelDistances,
                            points: r,
                            x,y,z
                        }
                    }
                }
            }
        }
    }
    return false
}

function sim<T>(a: T[], b: T[], f:(a:T,b:T)=>boolean = ((a:T,b:T)=>a==b)) {
    return a.filter(e => b.find(i => f(e,i)) != undefined)
}

function getAllRotations(points: number[][]): number[][][] {
   const orientations: number[][][] = []

    const axes: number[][] = [
        [1, 0, 0], [-1, 0, 0], // +x, -x
        [0, 1, 0], [0, -1, 0], // +y, -y
        [0, 0, 1], [0, 0, -1], // +z, -z
    ];

    // Iterate over all forward directions
    for (const forward of axes) {
        // Iterate over all potential up directions
        for (const up of axes) {
            // Ensure forward and up are perpendicular (dot product = 0)
            if (
                forward[0] * up[0] + forward[1] * up[1] + forward[2] * up[2] === 0
            ) {
                // Calculate the right vector using cross product
                const right = crossProduct(forward, up);

                // Add the rotation matrix: [forward, up, right]
                orientations.push([forward, up, right]);
            }
        }
    }

    return orientations.map(o => points.map(p => rotatePoint(p,o)))

    function rotatePoint(point: number[], matrix: number[][]): number[] {
        return [
            matrix[0][0] * point[0] + matrix[0][1] * point[1] + matrix[0][2] * point[2],
            matrix[1][0] * point[0] + matrix[1][1] * point[1] + matrix[1][2] * point[2],
            matrix[2][0] * point[0] + matrix[2][1] * point[1] + matrix[2][2] * point[2],
        ];
    }

    function crossProduct(a: number[], b: number[]): number[] {
        return [
            a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0],
        ];
    }
}

function rotateAroundAxis(points: number[][], axis: 'x'|'y'|'z', times: number) {
    if (times == 0) return points
    return points.map(p => {
        let l = p
        for (let i = 0; i < times; i++) {
            if (axis == 'x') l = rotX(l)
            if (axis == 'y') l = rotY(l)
            if (axis == 'z') l = rotZ(l)
        }
        return l
    })

    function rotX(p: number[]) {
        return [p[0], -p[2], p[1]]
    }

    function rotY(p: number[]) {
        return [p[2], p[1], -p[0]]
    }

    function rotZ(p: number[]) {
        return [-p[1], p[0], p[2]]
    }
}