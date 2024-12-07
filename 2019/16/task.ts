import {lcm} from '../../base'

export async function taskOne(input: string[]): Promise<void> {
    const sec = [0,1,0,-1]
    let inp = input[0].split('').map(Number)

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
    /*
    We abuse two things:
    1) the offset will be in the second half of the long number list
    2) The applied pattern start 0,1,... => Due to this a digit that is generated is just determined by the sum of all values that are at and anfter the index
    */
   let totalInput = input[0].repeat(10000)
   const offset = Number(input[0].substring(0,7))
   let curNumber = totalInput.substring(offset).split('').map(Number)

   for (let round = 0; round < 100; round++) {
        let totalSum = curNumber.reduce((a,b)=>a+b,0)
        curNumber = curNumber.map((i, idx) => {
            if (idx == 0) return totalSum % 10
            totalSum -= curNumber[idx-1]
            return totalSum % 10
        })
   }
   console.log(curNumber.join('').substring(0,8))

}