let is: In[] = []
export async function taskOne(input: string[]): Promise<void> {
    is = parse(input)
    console.log(getMax(0, []))
}

export async function taskTwo(input: string[]): Promise<void> {
    is = parse(input)
    let max = 0;
/*
    for(let i1 = 0; i1 <= 100; i1++) {
        for(let i2 = 0; i2 <= 100- i1; i2++) {
            for(let i3 = 0; i3 <= 100- i1 - i2; i3++) {
                const i4 = 100-i1-i2-i3;
                if(cal([i1,i2,i3,i4]) != 500) continue
                const m = val([i1,i2,i3,i4])
                if (m > max) max = m
            }
        }
    }
    console.log(max)*/
    console.log(getMax(0, [], cal))

    function cal(co: number[]) {
        return co.map((c, i)=>c*is[i]['cal']).reduce((a,b)=>a+b,0) == 500
    }
}

function parse(input: string[]): In[] {
    return input.map(i => {
        const r = /[A-Za-z]+: capacity (-?[0-9]+), durability (-?[0-9]+), flavor (-?[0-9]+), texture (-?[0-9]+), calories (-?[0-9]+)/.exec(i)
        if (!r) throw i
        return {
            'cap': parseInt(r[1]),
            'dur': parseInt(r[2]),
            'fla': parseInt(r[3]),
            'tex': parseInt(r[4]),
            'cal': parseInt(r[5])
        }
    })
}

function val(co: number[]) {
    function v(k: string) {
        const r = co.map((c, i)=>c*is[i][k]).reduce((a,b)=>a+b,0)
        if(r < 0) return 0
        return r
    }
    return ['cap', 'tex', 'dur', 'fla'].map(v).reduce((a,b)=>a*b,1);
}

function getMax(index: number, co: number[], cond = ((co:number[])=>true)): number {
    if (index == is.length) {
        if (!cond(co)) return 0
        return val(co)
    }
    const sum = co.reduce((a,b)=>a+b,0)
    let max = 0;
    for (let i = 0; i <= 100-sum; i++) {
        const cop = Array.from(co)
        cop.push(i)
        const m = getMax(index+1, cop, cond)
        if(m > max) max = m
    }
    return max
}

type In = Record<string, number>