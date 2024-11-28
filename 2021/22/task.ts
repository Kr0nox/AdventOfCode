export async function taskOne(input: string[]): Promise<void> {
    const reactor: boolean[][][] = Array.from({length:101}, ()=>Array.from({length:101}, ()=>Array.from({length:101}, ()=>false)))
    input.forEach(i => {
        const r = /((?:on)|(?:off)) x=(-?[0-9]+)\.\.(-?[0-9]+),y=(-?[0-9]+)\.\.(-?[0-9]+),z=(-?[0-9]+)\.\.(-?[0-9]+)/.exec(i)
        if (r == null) throw i
        const b = r[1] == 'on'
        
        const nums0 = r.slice(2).map(j => parseInt(j.trim()) + 50)
        let inside = true
        for (let i = 0; i < nums0.length; i+=2) {
            if (nums0[i+1] < 0 || nums0[i]>100) inside = false
        }
        if (inside) {
        const nums = nums0.map(j=> Math.max(0, Math.min(100, j)))
        for (let x = nums[0]; x <= nums[1]; x++) {
            for (let y = nums[2]; y <= nums[3]; y++) {
                for (let z = nums[4]; z <= nums[5]; z++) {
                    reactor[x][y][z] = b
                }
            }
        }}
    })

    let sum = 0
    for (let x = 0; x <= 100; x++) {
        for (let y = 0; y <= 100; y++) {
            for (let z = 0; z <= 100; z++) {
                if (reactor[x][y][z]) sum++
            }
        }
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    
    const allCubes: Entry[] = []

    for (const i of input) {
        const r = /((?:on)|(?:off)) x=(-?[0-9]+)\.\.(-?[0-9]+),y=(-?[0-9]+)\.\.(-?[0-9]+),z=(-?[0-9]+)\.\.(-?[0-9]+)/.exec(i)
        if (r == null) throw i
        const b = r[1] == 'on'
        
        const nums = r.slice(2).map(j => parseInt(j.trim()))
        const newCube: Cube = {
            x1: nums[0],
            x2: nums[1]+1,
            y1: nums[2],
            y2: nums[3]+1,
            z1: nums[4],
            z2: nums[5]+1
        }
        const newCubes: Entry[] = []
        if (b) {
            newCubes.push({cube:newCube, factor: 1})
        }

        for (const oldCube of allCubes) {
            const int = getIntersection(oldCube.cube, newCube)
            if (int !== null) {
                newCubes.push({cube:int, factor:-oldCube.factor})
            }
        }
        newCubes.forEach(c => allCubes.push(c))
    }

    const r = allCubes.map((e) => {
        const c = e.cube
        const v = (c.x2 - c.x1) * (c.y2 - c.y1) * (c.z2 - c.z1)
        return v * e.factor
    }).reduce((a,b)=>a+b,0)
    console.log(r)

    function getIntersection(a: Cube, b: Cube): Cube|null {
        const intersection = {
            x1: Math.max(a.x1,b.x1),
            x2: Math.min(a.x2,b.x2),
            y1: Math.max(a.y1,b.y1),
            y2: Math.min(a.y2,b.y2),
            z1: Math.max(a.z1,b.z1),
            z2: Math.min(a.z2,b.z2),
        }
        if (intersection.x1 > intersection.x2 || intersection.y1 > intersection.y2 || intersection.z1 > intersection.z2) {
            return null
        }
        return intersection
    }

    interface Cube {
        x1: number
        x2: number
        y1: number
        y2: number
        z1: number
        z2: number
    }

    interface Entry {
        cube: Cube
        factor: number
    }
}
