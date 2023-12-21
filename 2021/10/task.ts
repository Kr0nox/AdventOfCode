export async function taskOne(input: string[]): Promise<void> {
    console.log(input.map(getWrongScore).reduce((a,b)=>a+b,0))
}

export async function taskTwo(input: string[]): Promise<void> {
    const correctLines = input.filter(i => getWrongScore(i) == 0)
    console.log(correctLines)
    const result = correctLines.map(correctLineScore).sort((a,b) => a-b)
    console.log(result[Math.floor(result.length/2)])
}

const closing: Record<string,string> = {
    '(': ')', '[':']','{': '}','<': '>'
}

const cost1: Record<string,number> = {
    ')':3,']':57,'}':1197,'>':25137
}

function getWrongScore(line: string) {
    const brackets: string[] = []
    const chars = line.split("")
    for (const c of chars) {
        if (['(','[','{','<'].includes(c)) brackets.push(c)
        else {
            const opening = brackets.pop() as string
            if (c != closing[opening]) return cost1[c] ?? 0
        }
    }
    return 0
}

const cost2: Record<string,number> = {
    ')':1,']':2,'}':3,'>':4
}

function correctLineScore(line: string) {
    const brackets: string[] = []
    const chars = line.trim().split("")
    for (const c of chars) {
        if (['(','[','{','<'].includes(c)) brackets.push(c)
        else  brackets.pop()
    }
    let score = 0
    console.log(brackets)
    while (brackets.length > 0) {
        score *= 5
        const b = brackets.pop() as string
        score += cost2[closing[b]]
    }
    return score
}