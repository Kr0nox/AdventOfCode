export async function taskOne(input: string[]): Promise<void> {
    console.log(getNumber(JSON.parse(input[0])));

    function getNumber(s: any): number {
        if (typeof s == 'number') return s
        if(typeof s == 'string') return 0
        return Object.keys(s).map(i => getNumber(s[i])).reduce((a,b)=>a+b,0)
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(getNumber(JSON.parse(input[0])));

    function getNumber(s: any): number {
        if (typeof s == 'number') return s
        if(typeof s == 'string') return 0
        const keys = Object.keys(s)
        if (s[0] == undefined && keys.some(k => s[k] == 'red')) return 0
        return Object.keys(s).map(i => getNumber(s[i])).reduce((a,b)=>a+b,0)
    }
}

