import {lcm} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const sec = [0,1,0,-1]
    let inp = input[0].repeat(1000).split('').map(Number)

    for (let i = 0; i < 100; i++) {
        inp = doRound(inp)
    }

    console.log(inp.join('').substring(0,8))

    function doRound (inp: number[]) {
        let result: number[] = []
        for (let digit = 0; digit < inp.length; digit++) {
            let repeatsToDo = digit + 1
            let repeatsDone = digit == 0 ? 0 : 1
            let sum = 0
            let secI = digit == 0 ? 1:0
            let i = 0
            while(i < inp.length) {
                sum += inp[i] * sec[secI]
            
                repeatsDone ++
                if (repeatsDone >= repeatsToDo) {
                    secI++
                    if (secI >= sec.length) secI = 0
                    repeatsDone = 0
                }
                i++
            }
            result.push(Math.abs(sum) % 10)
        }
        return result
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const sec = [0,1,0,-1]
    function doRound(inp: number[]) {
        
    }
}