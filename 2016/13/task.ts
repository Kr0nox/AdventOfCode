import {Queue, JsonSet} from '../../base/simpleStructure'

export async function taskOne(input: string[]): Promise<void> {
    const Q: Queue<{p:[number, number],d:number}> = new Queue();
    const V: JsonSet<[number, number]> = new JsonSet();
    Q.push({p:[1,1], d:0})
    const goal: [number,number] = [31,39]
    const f = parseInt(input[0])
    while(!Q.isEmpty()) {
        let q = Q.pop()
        if (V.has(q.p)) continue
        if (q.p[0]<0 || q.p[1] < 0) continue
        if (!isOpen(q.p[0], q.p[1], f)) continue
        if (q.p[0] == goal[0] && q.p[1] == goal[1]) {
            console.log(q.d)
            return
        }
        V.add(q.p)
        Q.push({p: [q.p[0]+1, q.p[1]], d: q.d+1})
        Q.push({p: [q.p[0]-1, q.p[1]], d: q.d+1})
        Q.push({p: [q.p[0], q.p[1]+1], d: q.d+1})
        Q.push({p: [q.p[0], q.p[1]-1], d: q.d+1})
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const Q: Queue<{p:[number, number],d:number}> = new Queue();
    const V: JsonSet<[number, number]> = new JsonSet();
    Q.push({p:[1,1], d:0})
    let count = 0
    const f = parseInt(input[0])
    while(!Q.isEmpty()) {
        let q = Q.pop()
        if (V.has(q.p)) continue
        if (q.p[0]<0 || q.p[1] < 0) continue
        if (!isOpen(q.p[0], q.p[1], f)) continue
        if (q.d > 50) continue
        V.add(q.p)
        count++
        Q.push({p: [q.p[0]+1, q.p[1]], d: q.d+1})
        Q.push({p: [q.p[0]-1, q.p[1]], d: q.d+1})
        Q.push({p: [q.p[0], q.p[1]+1], d: q.d+1})
        Q.push({p: [q.p[0], q.p[1]-1], d: q.d+1})
    }
    console.log(count)
}

function isOpen(x: number, y: number, f: number) {
    let r = x*x + 3*x + 2*x*y + y + y*y + f
    let bin = r.toString(2)
    let count = 0
    for (const c of bin) {
        if (c=='1')count++
    }
    return count % 2 == 0
}