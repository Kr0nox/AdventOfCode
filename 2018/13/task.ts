export async function taskOne(input: string[]): Promise<void> {
    interface Train {
        x: number, y: number, xD: number, yD: number, turnState: number
    }
    const rails = input.map(i => i.split(''))
    let trains: Train[] = []
    for (let y = 0; y < rails.length; y++) {
        for (let x = 0; x < rails[y].length; x++) {
            const t = rails[y][x]
            if (['>', '<', '^', 'v'].includes(t)) {
                if (rails[y][x-1] != ' ' && rails[y][x+1] != ' ') {
                    rails[y][x] = '-'
                } else if (rails[y-1][x] != ' ' && rails[y+1][x] != ' ') {
                    rails[y][x] = '|'
                } else {
                    throw x + ' | ' + y
                }
                const xD = t == '>' ? 1 : (t == '<' ? -1 : 0)
                const yD = t == 'v' ? 1 : (t == '^' ? -1 : 0)
                trains.push({x,y,xD,yD, turnState: 0})
            }
        }
    }
    const posSet = new Set<string>()
    function addPos(x: number, y: number) {
        posSet.add(x+'-'+y)
    }
    function delPos(x: number, y: number) {
        posSet.delete(x+'-'+y)
    }function hasPos(x: number, y: number) {
        return posSet.has(x+'-'+y)
    }

    let colided = false
    while (!colided) {
        trains = trains.sort((a,b) => {
            if (a.y == b.y) {
                return a.x < b.x ? -1:1
            } 
            return a.y < b.y ? -1:1
        })
        for (const t of trains) {
            delPos(t.x,t.y)
            t.x += t.xD
            t.y += t.yD
            if (hasPos(t.x,t.y)) {
                console.log(t.x+','+t.y)
                colided = true
                break
            }
            addPos(t.x,t.y)
            if (rails[t.y][t.x] == '+') {
                const oXD = t.xD
                switch(t.turnState) {
                    case 0:
                        t.xD = t.yD
                        t.yD = -oXD
                        break
                    case 2:
                        t.xD = -t.yD
                        t.yD = oXD
                        break
                    case 1:
                    default:
                        break
                }
                t.turnState = (t.turnState + 1) % 3
            } else if (rails[t.y][t.x] != '-' && rails[t.y][t.x] != '|') {
                const oXD = t.xD
                if (t.xD == 1 && rails[t.y][t.x] == '/' || t.xD == -1 && rails[t.y][t.x] == '/' 
                || t.yD == 1 && rails[t.y][t.x] == '\\' || t.yD == -1 && rails[t.y][t.x] == '\\' ) {
                    t.xD = t.yD
                    t.yD = -oXD
                } else if (t.xD == 1 && rails[t.y][t.x] == '\\' || t.xD == -1 && rails[t.y][t.x] == '\\' 
                || t.yD == 1 && rails[t.y][t.x] == '/' || t.yD == -1 && rails[t.y][t.x] == '/' ) {
                    t.xD = -t.yD
                    t.yD = oXD
                }
            }
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    interface Train {
        x: number, y: number, xD: number, yD: number, turnState: number
    }
    const rails = input.map(i => i.split(''))
    let trains: Train[] = []
    for (let y = 0; y < rails.length; y++) {
        for (let x = 0; x < rails[y].length; x++) {
            const t = rails[y][x]
            if (['>', '<', '^', 'v'].includes(t)) {
                if (rails[y][x-1] != ' ' && rails[y][x+1] != ' ') {
                    rails[y][x] = '-'
                } else if (rails[y-1][x] != ' ' && rails[y+1][x] != ' ') {
                    rails[y][x] = '|'
                } else {
                    throw x + ' | ' + y
                }
                const xD = t == '>' ? 1 : (t == '<' ? -1 : 0)
                const yD = t == 'v' ? 1 : (t == '^' ? -1 : 0)
                trains.push({x,y,xD,yD, turnState: 0})
            }
        }
    }
    const posSet = new Set<string>()
    function addPos(x: number, y: number) {
        posSet.add(x+'|'+y)
    }
    function delPos(x: number, y: number) {
        posSet.delete(x+'|'+y)
    }function hasPos(x: number, y: number) {
        return posSet.has(x+'|'+y)
    }

    let toRemove = [] as number[]
    while (trains.length > 1) {
        trains = trains.sort((a,b) => {
            if (a.y == b.y) {
                return a.x < b.x ? -1:1
            } 
            return a.y < b.y ? -1:1
        })
        for (let i = 0; i < trains.length; i++) {
            if (toRemove.includes(i)) continue
            const t = trains[i]
            delPos(t.x,t.y)
            t.x += t.xD
            t.y += t.yD
            if (hasPos(t.x,t.y)) {
                toRemove.push(i)
                for (let j = 0; j < trains.length; j++) {
                    if (i == j) continue
                    if (trains[j].x == t.x && trains[j].y == t.y) {
                        delPos(trains[j].x, trains[j].y)
                        toRemove.push(j)
                    }
                }
                continue
            }
            addPos(t.x,t.y)
            if (rails[t.y][t.x] == '+') {
                const oXD = t.xD
                switch(t.turnState) {
                    case 0:
                        t.xD = t.yD
                        t.yD = -oXD
                        break
                    case 2:
                        t.xD = -t.yD
                        t.yD = oXD
                        break
                    case 1:
                    default:
                        break
                }
                t.turnState = (t.turnState + 1) % 3
            } else if (rails[t.y][t.x] != '-' && rails[t.y][t.x] != '|') {
                const oXD = t.xD
                if (t.xD == 1 && rails[t.y][t.x] == '/' || t.xD == -1 && rails[t.y][t.x] == '/' 
                || t.yD == 1 && rails[t.y][t.x] == '\\' || t.yD == -1 && rails[t.y][t.x] == '\\' ) {
                    t.xD = t.yD
                    t.yD = -oXD
                } else if (t.xD == 1 && rails[t.y][t.x] == '\\' || t.xD == -1 && rails[t.y][t.x] == '\\' 
                || t.yD == 1 && rails[t.y][t.x] == '/' || t.yD == -1 && rails[t.y][t.x] == '/' ) {
                    t.xD = -t.yD
                    t.yD = oXD
                }
            }
        }
        trains = trains.filter((_,i)=>!toRemove.includes(i))
        toRemove = []
    }
    console.log(trains[0].x+','+trains[0].y)
}