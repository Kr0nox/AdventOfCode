import { parseNumberList } from '../../base/parse'

export async function taskOne(input: string[]): Promise<void> {
    task(input[0], 40)   
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input[0], 50)  
}

function task(input: string, times: number) {
    let i = input
    for (let c = 0; c < times; c++) {
        i = step(parseNumberList(i, '')).join('')
    }
    console.log(i.length)
}

function step(syms: number[]) {
    let result:number[] = []
    for (let i = 0; i < syms.length;) {
        let c = 0;
        let j = i
        while(j < syms.length && syms[i] == syms[j]) {c++;j++}
        result.push(c)
        result.push(syms[i])
        i = j
    }
    return result
}