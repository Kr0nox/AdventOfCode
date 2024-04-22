export async function taskOne(input: string[]): Promise<void> {
    let sum = 0
    for (const i of input) {
        let p = i.split('-')
        const r = /([0-9]+)\[([^\]]+)\]/.exec(p[p.length-1])
        if (!r) throw i + " " + p + " " + p[p.length-1]
        p.splice(p.length-1)
        let c: Record<string, number> = {}
        for (const a of p) {
            a.split('').forEach(j=>{
                if (c[j] == undefined) c[j] = 0
                c[j]++
            })
        }
        const g = r[2].split('')
        const keys = Object.keys(c)
        let valid = true
        for (const gi of g) {
            const max = c[gi]??-1
            for(const k of keys) {
                if(c[k]>max) valid = false
            }
            c[gi] = -1
        }
        if (valid) {
            sum += (parseInt(r[1]))
        }
    }
    console.log(sum)
}

export async function taskTwo(input: string[]): Promise<void> {
    let validI: string[] = []
    for (const i of input) {
        let p = i.split('-')
        const r = /([0-9]+)\[([^\]]+)\]/.exec(p[p.length-1])
        if (!r) throw i + " " + p + " " + p[p.length-1]
        p.splice(p.length-1)
        let c: Record<string, number> = {}
        for (const a of p) {
            a.split('').forEach(j=>{
                if (c[j] == undefined) c[j] = 0
                c[j]++
            })
        }
        const g = r[2].split('')
        const keys = Object.keys(c)
        let valid = true
        for (const gi of g) {
            const max = c[gi]??-1
            for(const k of keys) {
                if(c[k]>max) valid = false
            }
            c[gi] = -1
        }
        if (valid) {
            validI.push(i)
        }
    }

    const A = 'a'.charCodeAt(0)
    for(const i of validI) {
        let p = i.split('-')
        const r = /([0-9]+)\[([^\]]+)\]/.exec(p[p.length-1])
        if (!r) throw i + " " + p + " " + p[p.length-1]
        p.splice(p.length-1)
        let num = parseInt(r[1])
        let print = false
        for(let j = 0; j < p.length; j++) {
            p[j] = p[j].split('').map(a => String.fromCharCode(((a.charCodeAt(0) - A + num) % 26) + A)).join('')
            if(p[j].includes('north') || p[j].includes('pole')) print=true
        }
        if(print) console.log(p, num)
        
    }
}

