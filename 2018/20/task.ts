export async function taskOne(input: string[]): Promise<void> {
    let edges = new Set<string>()

    process(input[0].substring(1, input[0].length-1), [[0,0]])
    console.log(edges.size)

    function process(re: string, pos: number[][]): number[][] {
        console.log(re.substring(0,100))
        let ors: string[] = []
        let openBrackets = 0
        let cur = ''
        let i = 0
        while(i < re.length) {
            if (re[i] == '(') {
                openBrackets++
                cur += re[i]
            } else if (re[i] == ')') {
                openBrackets--
                cur += re[i]
            } else if (re[i] == '|' && openBrackets == 0) {
                ors.push(cur)
                cur = ''
            } else {
                cur += re[i]
            }
            i++
        }
        ors.push(cur)
        const finalPos: number[][] = []
        for (const r of ors) {
            let newPos = copy(pos)
            for (let l = 0; l < r.length; l++) {
                if (r[l] == '(') {
                    let lastBrack = l
                    let openBrackets = 0
                    do {
                        if (r[lastBrack] == '(') openBrackets++
                        if (r[lastBrack] == ')') openBrackets--
                        lastBrack++
                    } while(openBrackets > 0);
                    const result = process(r.substring(l+1, lastBrack-1),newPos)
                    newPos.forEach(element => {
                        result.push(element)
                    });
                    l += lastBrack-1
                    continue
                }
                const d = [0,0]
                if (r[l] == 'N') {
                    d[1] = -1
                } else if (r[l] == 'S') {
                    d[1] = 1
                } else if (r[l] == 'W') {
                    d[0] = -1
                } else if (r[l] == 'E') {
                    d[0] = 1
                }
                for (let p = 0; p < newPos.length; p++) {
                    addEdge(newPos[p], [newPos[p][0]+d[0],newPos[p][1]+d[1]])
                    newPos[p][0] = d[0]
                    newPos[p][1] = d[1]
                }
            }
            newPos.forEach(element => finalPos.push(element))
        }
        

        // deduplicate
        return finalPos.filter((p,idx) => finalPos.findIndex(j => p[0]==j[0]&&p[1]==j[1]) == idx)
    }

    function addEdge(e1: number[], e2: number[]) {
        if (e1[0] == e2[0]) {
            if (e1[1] < e2[1]) {
                edges.add(s(e1,e2))
            } else {
                edges.add(s(e2,e1))
            }
        } else {
            if (e1[0] < e2[0]) {
                edges.add(s(e1,e2))
            } else {
                edges.add(s(e2,e1))
            }
        }

        function s(c1: number[],c2:number[]) {
            return `${c1[0]}_${c2[0]}|${c1[1]}_${c2[1]}`
        }
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

function copy<T>(v:T):T {
    return JSON.parse(JSON.stringify(v))
}