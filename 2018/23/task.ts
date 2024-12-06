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

    let currentBox = {
        minX: Infinity, maxX: -Infinity,
        minY: Infinity, maxY: -Infinity,
        minZ: Infinity, maxZ: -Infinity
    }
    for (const bot of bots) {
        if (bot[0] < currentBox.minX) currentBox.minX = bot[0]
        if (bot[0] > currentBox.maxX) currentBox.maxX = bot[0]
        if (bot[1] < currentBox.minY) currentBox.minY = bot[1]
        if (bot[1] > currentBox.maxY) currentBox.maxY = bot[1]
        if (bot[2] < currentBox.minZ) currentBox.minZ = bot[2]
        if (bot[2] > currentBox.maxZ) currentBox.maxZ = bot[2]
    }

    while(!(
        currentBox.minX == currentBox.maxX &&
        currentBox.minY == currentBox.maxY &&
        currentBox.minZ == currentBox.maxZ
    )) {
        
        let max = -1
        let maxCube = {} as Box
        const quarters = eightFold(currentBox).map(b => [checkBotsInBox(b), b] as [number, Box]).forEach(([bc,b]: [number, Box]) => {
            if (bc > max) {
                max = bc
                maxCube = b
            }
        })
        currentBox = maxCube
    }
    console.log(Math.abs(currentBox.minX) + Math.abs(currentBox.minY) + Math.abs(currentBox.minZ))

    function eightFold(box: Box) {
        let center = [
            box.maxX+box.minX ,
            box.maxY+box.minY,
            box.maxZ+box.minZ
        ].map(i => i/2).map(Math.floor)

        const r: Box[] = [
            {
                minX: box.minX, maxX: center[0],
                minY: box.minY, maxY: center[1],
                minZ: box.minZ, maxZ: center[2]
            }, 
            {
                minX: center[0]+1, maxX: box.maxX,
                minY: center[1]+1, maxY: box.maxY,
                minZ: center[2]+1, maxZ: box.maxZ
            },

            {
                minX: center[0]+1, maxX: box.maxX,
                minY: box.minY, maxY: center[1],
                minZ: box.minZ, maxZ: center[2]
            },
            {
                minX: box.minX, maxX: center[0],
                minY: center[1]+1, maxY: box.maxY,
                minZ: box.minZ, maxZ: center[2]
            },
            {
                minX: box.minX, maxX: center[0],
                minY: box.minY, maxY: center[1],
                minZ: center[2]+1, maxZ: box.maxZ
            },

            {
                minX: center[0]+1, maxX: box.maxX,
                minY: center[1]+1, maxY: box.maxY,
                minZ: box.minZ, maxZ: center[2]
            },
            {
                minX: box.minX, maxX: center[0],
                minY: center[1]+1, maxY: box.maxY,
                minZ: center[2]+1, maxZ: box.maxZ
            },
            {
                minX: center[0]+1, maxX: box.maxX,
                minY: box.minY, maxY: center[1],
                minZ: center[2]+1, maxZ: box.maxZ
            }
        ]

        return r.filter(b =>(
            b.minX <= b.maxX &&
            b.minY <= b.maxY &&
            b.minZ <= b.maxZ
        ))
    }

    function checkBotsInBox(box: Box) {
        let botCount = 0
        for (const bot of bots) {
            let insideX = bot[0] >= box.minX && bot[0] <= box.maxX
            let insideY = bot[1] >= box.minY && bot[1] <= box.maxY
            let insideZ = bot[2] >= box.minZ && bot[2] <= box.maxZ
            // check if bot is in Box, that its range is in automatically
            let xDistance = 0
            let yDistance = 0
            let zDistance = 0
            if (!insideX) xDistance = bot[0] < box.minX ? box.minX - bot[0] : bot[0] - box.maxX 
            if (!insideY) yDistance = bot[1] < box.minY ? box.minY - bot[1] : bot[1] - box.maxY
            if (!insideZ) zDistance = bot[2] < box.minZ ? box.minZ - bot[2] : bot[2] - box.maxZ
                
            const totalDistance = xDistance+yDistance+zDistance
            if (totalDistance <= bot[3]) botCount++
        }
        return botCount
    }

    interface Box {
        minX: number
        maxX: number
        minY: number
        maxY: number
        minZ: number
        maxZ: number
    }
}

