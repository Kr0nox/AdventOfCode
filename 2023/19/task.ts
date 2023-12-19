export async function taskOne(input: string[]): Promise<void> {
    const rules: Record<string, Rule[]> = {}
    let sum = 0
    let i = 0;
    while (input[i] != "") {
        const r = parseRuleSet(input[i])
        rules[r[0]] = r[1]
        i++
    }
    i++
    while (i < input.length) {
        const part = parsePart(input[i])
        let rule = "in"
        while(rule != 'A' && rule != 'R') {
            rule = applyRule(part, rules[rule])
        }
        if (rule == 'A') {
            sum += part['x'] + part['m'] + part['a'] + part['s']
        }
        i++
    }
    console.log(sum)
}

const Rules: Record<string, Rule[]> = {}

export async function taskTwo(input: string[]): Promise<void> {
    let sum = 0
    let i = 0;
    while (input[i] != "") {
        const r = parseRuleSet(input[i])
        Rules[r[0]] = r[1]
        i++
    }
    i++

    const accepted = findRange({
        'x': [1,4000], 'm': [1,4000], 'a': [1,4000], 's': [1,4000]
    }, 'in')

    const rangeVal = (n:[number, number]) => Math.max(n[1]-n[0]+1,0)
    for (const a of accepted) {
        sum += rangeVal(a['x']) * rangeVal(a['m']) * rangeVal(a['a']) * rangeVal(a['s'])
    }
    console.log(sum)
}

type XMAS = 'x'|'m'|'a'|'s'

type Part = Record<XMAS, number>
type RangePart = Record<XMAS, [number, number]>

type Rule = {
    component?: XMAS
    comparator: '<'|'>'
    compVal: number,
    goal: string
}

function parseRuleSet(s: string): [string, Rule[]] {
    const r1 = /([^{]+){([^}]*)}/.exec(s)
    if (r1==null) throw "Could not parse "+ s
    const name = r1[1]
    const rules = r1[2].split(',')
    const rus: Rule[] = []
    for (const ru of rules) {
        const r = /([^><]+)(<|>)([0-9]+):(.+)/.exec(ru)
        if (r == null) rus.push({comparator:'<', compVal: 0, goal: ru})
        else rus.push({
            component: r[1] as XMAS,
            comparator: r[2] as '<'|'>',
            compVal: parseInt(r[3]),
            goal: r[4]
        })
    }
    return [name,rus]
}

function parsePart(s: string) {
    const r = /{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)}/.exec(s)
    if (r == null) throw "Could not parse" + s
    return {
        'x': parseInt(r[1]), 'm': parseInt(r[2]), 'a': parseInt(r[3]), 's': parseInt(r[4])
    }
}

function applyRule(part: Part, rule: Rule[]) {
    for (const r of rule) {
        if (!r.component) {
            return r.goal
        }
        if (r.comparator == '>' && part[r.component] > r.compVal) {
            return r.goal
        } else if (r.comparator == '<' && part[r.component] < r.compVal) {
            return r.goal
        }
    }
    throw "Could not apply rule"
}

function findRange(part: RangePart, rule: string) {
    if (rule == 'R') {
        return []
    }
    if (rule == 'A') {
        return [part]
    }
    const accepted: RangePart[] = []
    for (const r of Rules[rule]) {
        const copy = copyRange(part)
        if (!r.component) {
            accepted.push(...findRange(copy, r.goal))
            break;
        }
        if (r.comparator == '<') {
            copy[r.component][1] = r.compVal -1
            part[r.component][0] = r.compVal
            accepted.push(...findRange(copy, r.goal))
        } else {
            copy[r.component][0] = r.compVal + 1
            part[r.component][1] = r.compVal
            accepted.push(...findRange(copy, r.goal))
        }
    }

    return accepted
}

function copyRange(r: RangePart): RangePart {
    return {
        'x': [r['x'][0], r['x'][1]],
        'm': [r['m'][0], r['m'][1]],
        'a': [r['a'][0], r['a'][1]],
        's': [r['s'][0], r['s'][1]],
    }
}