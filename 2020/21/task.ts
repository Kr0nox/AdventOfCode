export async function taskOne(input: string[]): Promise<void> {
    const allIng = new Set<string>()
    const possibleMatches = new Map<string, string[]>()
    const finishedIng: string[] = []
    const recipeIng: string[][] = []
    input.forEach(i => {
        const r = /([^(]+) \(contains ([^)]+)\)/.exec(i)!
        const ing = r[1].split(' ').filter(j => !finishedIng.includes(j))
        ing.forEach(j => allIng.add(j))
        const all = r[2].split(', ')
        recipeIng.push(ing)
        all.forEach(a => {
            if (!possibleMatches.has(a)) {
                possibleMatches.set(a, ing)
                checkSingle(a)
            } else if(possibleMatches.get(a)!.length != 1) {
                possibleMatches.set(a, union(possibleMatches.get(a)!, ing))
                checkSingle(a)
            }
        })  
    })

    finishedIng.forEach(i => allIng.delete(i))

    let c = 0
    recipeIng.forEach(i => {
        allIng.forEach(j => {
            if (i.includes(j)) c++
        })
    })
    console.log(c)

    function union(a: string[], b: string[]) {
        return a.filter(c => b.includes(c))
    }
    function checkSingle(a: string) {
        if (possibleMatches.get(a)!.length == 1) {
            const ing = possibleMatches.get(a)![0]
            finishedIng.push(ing)
            for (const k of possibleMatches.keys()) {
                if (k == a) continue
                if (possibleMatches.get(k)!.length == 1) continue
                possibleMatches.set(k, possibleMatches.get(k)!.filter(i => i != ing))
                checkSingle(k)
            } 
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const allIng = new Set<string>()
    const possibleMatches = new Map<string, string[]>()
    const finishedIng: string[] = []
    input.forEach(i => {
        const r = /([^(]+) \(contains ([^)]+)\)/.exec(i)!
        const ing = r[1].split(' ').filter(j => !finishedIng.includes(j))
        ing.forEach(j => allIng.add(j))
        const all = r[2].split(', ')
        all.forEach(a => {
            if (!possibleMatches.has(a)) {
                possibleMatches.set(a, ing)
                checkSingle(a)
            } else if(possibleMatches.get(a)!.length != 1) {
                possibleMatches.set(a, union(possibleMatches.get(a)!, ing))
                checkSingle(a)
            }
        })  
    })

    console.log(Array.from(possibleMatches).map(i => [i[0], i[1][0]]).sort((a,b) => a[0].localeCompare(b[0])).map(a => a[1]).join(','))


    function union(a: string[], b: string[]) {
        return a.filter(c => b.includes(c))
    }
    function checkSingle(a: string) {
        if (possibleMatches.get(a)!.length == 1) {
            const ing = possibleMatches.get(a)![0]
            finishedIng.push(ing)
            for (const k of possibleMatches.keys()) {
                if (k == a) continue
                if (possibleMatches.get(k)!.length == 1) continue
                possibleMatches.set(k, possibleMatches.get(k)!.filter(i => i != ing))
                checkSingle(k)
            } 
        }
    }
}