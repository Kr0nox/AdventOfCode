export async function taskOne(input: string[]): Promise<void> {
    const adjecencyList: Record<string, string[]> = {}
    input.forEach(i => {
        const ns = i.split("-")
        adjecencyList[ns[0]] = []
        adjecencyList[ns[1]] = []
    })
    input.forEach(i => {
        const ns = i.split("-")
        adjecencyList[ns[0]].push(ns[1])
        adjecencyList[ns[1]].push(ns[0])
    })
    console.log(extendPaths(adjecencyList, ['start']))
}

export async function taskTwo(input: string[]): Promise<void> {
    const adjecencyList: Record<string, string[]> = {}
    input.forEach(i => {
        const ns = i.split("-")
        adjecencyList[ns[0]] = []
        adjecencyList[ns[1]] = []
    })
    input.forEach(i => {
        const ns = i.split("-")
        adjecencyList[ns[0]].push(ns[1])
        adjecencyList[ns[1]].push(ns[0])
    })
    console.log(extendPaths2(adjecencyList, ['start']))
}


function extendPaths(adjecencyList: Record<string, string[]>, path: string[]) {
    const lastNode = path[path.length - 1]
    if (lastNode == 'end') return 1
    let sum = 0
    for (const adj of adjecencyList[lastNode]) {
        if (adj.toLowerCase() == adj && path.includes(adj)) continue
        const copy = Array.from(path)
        copy.push(adj)
        sum += extendPaths(adjecencyList, copy)
    }
    return sum
}

function extendPaths2(adjecencyList: Record<string, string[]>, path: string[], hasTwo = false) {
    const lastNode = path[path.length - 1]
    if (lastNode == 'end')  {return 1}
    let sum = 0
    for (const adj of adjecencyList[lastNode]) {
        let foundTwo = hasTwo
        if (adj == 'start') continue
        if (path.includes(adj) && adj.toLowerCase() == adj) {
            if (hasTwo) continue
            else foundTwo = true
        }
        const copy = Array.from(path)
        copy.push(adj)
        sum += extendPaths2(adjecencyList, copy, foundTwo)
    }
    return sum
}