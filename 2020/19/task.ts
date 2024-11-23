export async function taskOne(input: string[]): Promise<void> {
    const ruleString: Record<number, string> = {}
    let i = 0;
    while(input[i] != "") {
        const p = input[i].split(': ')
        ruleString[Number(p[0])] = p[1]
        i++
    }
    i++

    const ruleRegex: Record<number, string> = {}

    const regexp = new RegExp("^" + get(0) + "$")
    let count = 0
    while(i < input.length) {
        if (input[i].match(regexp)) count++
        i++
    }
    console.log(count)


    function get(n: number) {
        if (ruleRegex[n] != undefined) return ruleRegex[n]
        const r = ruleString[n]
        let re = ""
        if (r.startsWith("\"")) {
            re = r[1]
        } else {
            const options = r.split(' | ')
            re = "(" + options.map(o => {
                return `(${o.split(' ').map(Number).map(get).join('')})`
            }).join('|') + ")"
        }
        ruleRegex[n] = re
        return re
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const ruleString: Record<number, string> = {}
    let i = 0;
    while(input[i] != "") {
        const p = input[i].split(': ')
        ruleString[Number(p[0])] = p[1]
        i++
    }
    i++

    const ruleRegex: Record<number, string> = {}

    let count = 0
    while(i < input.length) {
        const startMatch = matchAll(input[i], get(42))
        const endMatch = matchAll(input[i], get(31))

        const startChains = extractChains(startMatch).filter(c => c.start == 0)
        const endChains = extractChains(endMatch).filter(c => c.end == input[i].length)

        let foundChain = false
        for (let i = 0; i < startChains.length; i++) {
            for (let j = 0; j < endChains.length; j++) {
                if (startChains[i].end == endChains[j].start && startChains[i].parts > endChains[j].parts) {
                    foundChain = true
                }
            }
        }
        if(foundChain) count++
        i++
    }
    console.log(count)

    function extractChains(parts: Match[]): Chain[] {
        const chains = parts.map(p => {return {...p, parts: 1}})
        let hadChange = false
        let lastChainEndLen = 0
        do {
            hadChange = false
            let len = chains.length
            for (let i = lastChainEndLen; i < len; i++) {
                for (let j = 0; j < parts.length; j++) {
                    if (chains[i].end == parts[j].start) {
                        chains.push({
                            start: chains[i].start,
                            end: parts[j].end,
                            parts: chains[i].parts + 1
                        })
                        hadChange = true
                    }
                }
            }
            lastChainEndLen = len
        } while(hadChange);
        return chains
    }

    function matchAll(s: string, re: string) {
        const reg = new RegExp("^" + re + "$")
        const matches: Match[] = []
        for (let i = 0; i < s.length; i++) {
            for (let j = i+1; j <= s.length; j++) {
                if (s.substring(i,j).match(reg)) matches.push({start:i, end:j})
            }
        }
        return matches
    }

    function get(n: number): string {
        if (ruleRegex[n] != undefined) return ruleRegex[n]
        const r = ruleString[n]
        let re = ""
        if (r.startsWith("\"")) {
            re = r[1]
        } else {
            const options = r.split(' | ')
            re = "(?:" + options.map(o => {
                return `(?:${o.split(' ').map(Number).map(get).join('')})`
            }).join('|') + ")"
        }
        ruleRegex[n] = re
        return re
    }

    interface Chain {
        start: number // inc
        end: number // exc
        parts: number
    }
    interface Match {
        start: number //inc
        end: number // exc
    }
}