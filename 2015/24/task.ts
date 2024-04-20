/*export async function taskOne(_input: string[]): Promise<void> {
    const input = _input.map(Number)
    console.log(input)

    let sum = input.reduce((a,b)=>a+b,0)
    let W = sum / 3

    interface Val {
        prevW: number,
        prevI: number,
        included: boolean,
        val: number
    }

    const M:(Val|undefined)[][] = Array.from({length: input.length+1}, ()=>Array.from({length:W+1}, () => undefined))
    for (let i = 0; i < M[0].length; i++) {
        M[0][i] = {
            prevI: -1, prevW: -1, included: false, val: Infinity
        }
    }
    for (let i = 0; i < M.length; i++) {
        M[i][0] = {
            prevI: -1, prevW: -1, included: false, val: Infinity
        }
    }
    for (let i = 1; i < M.length; i++) {
        for (let w = 1; w < M[0].length; w++) {
            if (input[i-1] > w) M[i][w] = {
                prevI: i-1, prevW: w, included: false, val:M[i-1][w]?.val??Infinity
            }
            else {
                const v1 = M[i-1][w]?.val??Infinity
                const v2 = M[i-1][w-input[i-1]]?.val??Infinity

                if (v1 == v2) {
                    const q1 = quant(M[i-1][w]?.prevI??-1, M[i-1][w]?.prevW??-1)
                    const q2 = quant(M[i-1][w-input[i-1]]?.prevI??-1, M[i-1][w-input[i-1]]?.prevW??-1)
                    if (q1 < q2) M[i][w] = {
                        prevI: i-1, prevW: w, val: M[i-1][w]?.val??0, included: false
                    }
                    else M[i][w] = {
                        prevI: i-1, prevW: w-input[i-1], val: (M[i-1][w-input[i-1]]?.val??0)+1, included: true
                    }
                } else if (v1 < v2) M[i][w] = {
                    prevI: i-1, prevW: w, val: M[i-1][w]?.val??Infinity, included: false
                }
                else M[i][w] = {
                    prevI: i-1, prevW: w-input[i-1], val: (M[i-1][w-input[i-1]]?.val??Infinity)+1, included: true
                }
                if (isNaN(M[i][w]?.prevW??0)) {
                    throw i + " " + w+ " " + M[i][w]
                }
            }
        }
    }

    let min = -1
    let minVal = Infinity
    for (let i = 0; i < M.length; i++) {
        const m = M[i][W]
        if(m) {
            console.log(m)
            if(m.val < minVal) {
                minVal = m.val
                min = i
            }
        }
    }
    console.log(min)
    console.log(M[min][W])

    function quant(i: number, w: number): number {
        if (i == -1 && w == -1) return 1
        return (M[i][w]?.included ? input[i-1]:1)*quant(M[i][w]?.prevI??-1, M[i][w]?.prevW??-1);
    }
}*/

export async function taskOne(input: string[]): Promise<void> {
   task(input, 3)
}

export async function taskTwo(input: string[]): Promise<void> {
    task(input, 4)
}

function task(_input: string[], parts: number) {
    const input = _input.map(Number)
    let sum = input.reduce((a,b)=>a+b,0)
    let W = sum / parts

    let max = Math.ceil(input.length / 3.0)
    console.log(step(0, 0, 0, 1)[1])

    function step(i: number, count: number, sum: number, prod: number): [number, number] {
        if (sum > W) return [Infinity, Infinity]
        if (sum == W) return [sum, prod]
        if (count >= max) return [Infinity, Infinity]
        if(i >= input.length) return [Infinity, Infinity]

        const o1 = step(i+1, count, sum, prod)
        const o2 = step(i+1, count+1, sum+input[i], prod*input[i])
        if (o1[0] == o2[0]) {
            if (o1[1] < o2[1]) return o1
            else return o2
        }
        if (o1[0] < o2[0]) return o1
        else return o2
    }
}