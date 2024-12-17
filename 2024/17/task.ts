import {lcmArr, lcm, gcd, ComplexNumber,  Stack, Queue, JsonSet, FunctionSet, MinHeap } from '../../base'

export async function taskOne(input: string[]): Promise<void> {


    let A = Number(input[0].split(': ')[1])
    let B = Number(input[1].split(': ')[1])
    let C = Number(input[2].split(': ')[1])
    console.log(input[4].split(': ')[1])
    const com = input[4].split(': ')[1].split(',').map(Number)
    let i = 0;
    const out: number[] = []
    while(i < com.length) {
        switch(com[i]) {
            case 0: {
                A = Math.floor(A / Math.pow(2, get(com[i+1])))
                i+=2
                break
            } 
            case 1: {
                B = B ^ com[i+1]
                i+=2
                break
            }
            case 2: {
                B = get(com[i+1]) % 8
                i+=2
                break
            }
            case 3: {
                if (A == 0)
                    i+=2
                else
                    i = com[i+1]
                break
            }
            case 4: {
                B = B ^ C
                i+=2
                break
            }
            case 5: {
                out.push(get(com[i+1]) % 8)
                i+=2
                break
            }
            case 6: {
                B = Math.floor(A / Math.pow(2, get(com[i+1])))
                i+=2
                break
            }
            case 7: {
                C = Math.floor(A / Math.pow(2, get(com[i+1])))
                i+=2
                break
            }
        }
    }
    console.log(out.join(','))
    function get(v: number): number {
        if (v < 4) return v
        return {4:A,5:B,6:C}[v] ?? 0
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    //let A = Number(input[0].split(': ')[1])
    const com = input[4].split(': ')[1].split(',').map(Number)
    let G = com.join('')

    const r = com.map(BigInt)
    console.log(recursive(0n, r.length-1).toString())

    function recursive(A: bigint, i: number): bigint {
        if (i < 0) return A
        
        A *= 8n
        for (let d of [0n,1n,2n,3n,4n,5n,6n,7n]) {
            let cA = A
            cA += d
            let B = cA % 8n
            B = B ^ 5n
            let C = cA / (2n**B)
            B = B ^ C
            B = B ^ 6n
            let out = B % 8n
            if (out == r[i]) {
                let next = recursive(cA, i-1)
                if (next >= 0n) return next
            }
        }
        return -1n
    }
}

