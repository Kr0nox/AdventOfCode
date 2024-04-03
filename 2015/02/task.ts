import { parseNumberList } from '../../base/parse'

export async function taskOne(input: string[]): Promise<void> {
    console.log(
        input.map(getPresentArea).reduce((a,b) => a+b, 0)
    )
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(
        input.map(getRibbonLength).reduce((a,b) => a+b, 0)
    )
}

function getPresentArea(line: string) {
    const l = parseNumberList(line, 'x');
    const sides = [l[0]*l[1], l[1]*l[2], l[0]*l[2]]
    return 2*(sides[0]+sides[1]+sides[2]) + Math.min(...sides);
}

function getRibbonLength(line: string) {
    const l = parseNumberList(line, 'x');
    l.sort((a,b) => a-b)

    return 2*(l[0]+l[1]) + l[0]*l[1]*l[2];
}