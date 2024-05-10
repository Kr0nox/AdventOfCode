import md5 from "./md5";
import {Queue} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const init = input[0]
    const Q: Queue<{f:[number, number], p:string}> = new Queue()
    Q.push({f:[0,0], p:''})
    while(!Q.isEmpty()) {
        const q = Q.pop()
        if (q.f[0] == 3 && q.f[1] == 3) {
            console.log(q.p)
            return
        }
        const hash = md5(init + q.p)
        //console.log(hash)
        if (q.f[1] > 0 && canGoDir(hash, 0)) Q.push({f:[q.f[0], q.f[1]-1], p: q.p + 'U'})
        if (q.f[1] < 3 && canGoDir(hash, 1)) Q.push({f:[q.f[0], q.f[1]+1], p: q.p + 'D'})
        if (q.f[0] > 0 && canGoDir(hash, 2)) Q.push({f:[q.f[0]-1, q.f[1]], p: q.p + 'L'})
        if (q.f[0] < 3 && canGoDir(hash, 3)) Q.push({f:[q.f[0]+1, q.f[1]], p: q.p + 'R'})
    }

    function canGoDir(hash: string, index: number) {
        return ['b','c','d','e','f'].includes(hash.charAt(index))
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const init = input[0]
    const Q: Queue<{f:[number, number], p:string}> = new Queue()
    Q.push({f:[0,0], p:''})
    let max = 0
    while(!Q.isEmpty()) {
        const q = Q.pop()
        if (q.f[0] == 3 && q.f[1] == 3) {
            max = q.p.length
            continue
        }
        const hash = md5(init + q.p)
        //console.log(hash)
        if (q.f[1] > 0 && canGoDir(hash, 0)) Q.push({f:[q.f[0], q.f[1]-1], p: q.p + 'U'})
        if (q.f[1] < 3 && canGoDir(hash, 1)) Q.push({f:[q.f[0], q.f[1]+1], p: q.p + 'D'})
        if (q.f[0] > 0 && canGoDir(hash, 2)) Q.push({f:[q.f[0]-1, q.f[1]], p: q.p + 'L'})
        if (q.f[0] < 3 && canGoDir(hash, 3)) Q.push({f:[q.f[0]+1, q.f[1]], p: q.p + 'R'})
    }

    console.log(max)

    function canGoDir(hash: string, index: number) {
        return ['b','c','d','e','f'].includes(hash.charAt(index))
    }
}