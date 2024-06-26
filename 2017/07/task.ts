export async function taskOne(input: string[]): Promise<void> {
    const towers = input.map(parseLine)
    console.log(findRoot(towers).name)
    
}

export async function taskTwo(input: string[]): Promise<void> {
    const _towers = input.map(parseLine)
    const towers: Record<string, Tower> = {}
    for (const t of _towers) {
        towers[t.name] = t
    }
    const root = findRoot(_towers)
    
    function findWrongWeight(t: string): number {
        if (towers[t].children.length == 0) return towers[t].weight

        const childWeights = towers[t].children.map(findWrongWeight)
        const idealWeight = getIdealWeight(childWeights)
        const wrongChildIndex = childWeights.findIndex(i => i != idealWeight)
        if (wrongChildIndex != -1) {
            const wrongChild = towers[towers[t].children[wrongChildIndex]]

            console.log(wrongChild.weight + (idealWeight - childWeights[wrongChildIndex]))
            return idealWeight * childWeights.length + towers[t].weight
        }

        return childWeights.reduce((a,b) => a+b,0) + towers[t].weight
    }

    findWrongWeight(root.name)
}

function getIdealWeight(ws: number[]) {
    if (ws[0] != ws[1]) return ws[2]
    else return ws[0]
}

function findRoot(towers: Tower[]) {
    for (const t of towers) {
        let foundParent = false
        for (const t1 of towers) {
            if (t1.children.includes(t.name)) {
                foundParent = true
                break
            }
        }
        if (!foundParent) {
            return t
        }
    }
    throw "Circle!!!!!!!"
}

interface Tower {
    name: string
    weight: number
    children: string[]
}

function parseLine(r: string): Tower {
    const re = /([a-z]+) \(([0-9]+)\)(?: -> (.*))?/.exec(r)
    if (!re) throw r

    let children: string[] = []
    if (re[3]) {
        children = re[3].split(', ')
    }
    return {
        name: re[1],
        weight: parseInt(re[2]),
        children
    }
}