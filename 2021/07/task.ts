import {parseNumberList} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const crabs = parseNumberList(input[0])
    const min = Math.min(...crabs)
    const max = Math.max(...crabs)
    console.log(Math.min(...Array.from(Array(max-min).keys()).map(i => i+min).map(i => crabs.map(c => Math.abs(c-i)).reduce((a,b) => a+b,0))))
}

export async function taskTwo(input: string[]): Promise<void> {
    const crabs = parseNumberList(input[0])
    const min = Math.min(...crabs)
    const max = Math.max(...crabs)
    console.log(Math.min(...Array.from(Array(max-min).keys()).map(i => i+min).map(i => crabs.map(c => sumfromone(Math.abs(c-i))).reduce((a,b) => a+b,0))))
}

function sumfromone(n: number) {
    return n * (n+1)/2
}