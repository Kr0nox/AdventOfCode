export async function taskOne(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(''))
    let active = new Set<string>()
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == '#') {
                active.add(getPoint(x,y,0))
            }
        }
    }
    let minX = 0
    let maxX = input[0].length - 1
    let minY = 0
    let maxY = input.length - 1
    let minZ = 0
    let maxZ = 0

    for (let i = 0; i < 6; i++) {
        const newActive = new Set<string>()
        for (let x = minX-1; x <= maxX+1; x++) {
            for (let y = minY-1; y <= maxY+1; y++) {
                for (let z = minZ-1; z <= maxZ+1; z++) {
                    let actives = 0
                    for (let xD = -1; xD <= 1; xD++) {
                        for (let yD = -1; yD <= 1; yD++) {
                            for (let zD = -1; zD <= 1; zD++) {
                                if (xD == 0 && yD == 0 && zD == 0) continue
                                if (active.has(getPoint(x+xD, y+yD, z+zD))) actives++
                            }
                        } 
                    }
                    const key = getPoint(x,y,z)
                    const isActive = active.has(key)
                    if (isActive && (actives == 2 || actives == 3)) {
                        newActive.add(key)
                    }
                    if (!isActive && actives == 3) {
                        newActive.add(key)
                    }
                }
            }
        }
        active = newActive
        minX--
        maxX++
        minY--
        maxY++
        minZ--
        maxZ++
    }

    console.log(active.size)



    function getPoint(x: number, y: number, z:number) {
        return `${x}|${y}|${z}`
    }
}

export async function taskTwo(_input: string[]): Promise<void> {
    const input = _input.map(i => i.split(''))
    let active = new Set<string>()
    for (let y = 0; y < input.length; y++) {
        for (let x = 0; x < input[y].length; x++) {
            if (input[y][x] == '#') {
                active.add(getPoint(x,y,0,0))
            }
        }
    }
    let minX = 0
    let maxX = input[0].length - 1
    let minY = 0
    let maxY = input.length - 1
    let minZ = 0
    let maxZ = 0
    let minW = 0
    let maxW = 0

    for (let i = 0; i < 6; i++) {
        const newActive = new Set<string>()
        for (let x = minX-1; x <= maxX+1; x++) {
            for (let y = minY-1; y <= maxY+1; y++) {
                for (let z = minZ-1; z <= maxZ+1; z++) {
                    for (let w = minW-1; w <= maxW+1; w++) {
                        let actives = 0
                        for (let xD = -1; xD <= 1; xD++) {
                            for (let yD = -1; yD <= 1; yD++) {
                                for (let zD = -1; zD <= 1; zD++) {
                                    for (let wD = -1; wD <= 1; wD++) {
                                        if (xD == 0 && yD == 0 && zD == 0 && wD == 0) continue
                                        if (active.has(getPoint(x+xD, y+yD, z+zD, w+wD))) actives++
                                    }
                                }
                            } 
                        }
                        const key = getPoint(x,y,z,w)
                        const isActive = active.has(key)
                        if (isActive && (actives == 2 || actives == 3)) {
                            newActive.add(key)
                        }
                        if (!isActive && actives == 3) {
                            newActive.add(key)
                        }
                    }
                }
            }
        }
        active = newActive
        minX--
        maxX++
        minY--
        maxY++
        minZ--
        maxZ++
        minW--
        maxW++
    }

    console.log(active.size)



    function getPoint(x: number, y: number, z:number, w:number) {
        return `${x}|${y}|${z}|${w}`
    }
}