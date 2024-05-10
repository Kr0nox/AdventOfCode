import md5 from "./md5"

export async function taskOne(input: string[]): Promise<void> {
    const init = input[0]
    let openRequest: {c: string, i: number, f:boolean}[] = []
    const foundKeys: number[] = []
    const maxKeys = 64
    const maxKeyLife = 1000
    let i = 0
    while(foundKeys.length < maxKeys || openRequest.length > 0) {
        const hash = md5(init + i)

        openRequest = openRequest.filter(k => i - k.i < maxKeyLife && !k.f)
        for (const k of openRequest) {
            if (RegExp(`${k.c}{5}`).test(hash)) {
                k.f = true
                foundKeys.push(k.i)
            }
        }

        if (foundKeys.length < maxKeys) {
            for (let x = 0; x < hash.length-2; x++) {
                let c = hash[x]
                if (c == hash[x+1] && c == hash[x+2]) {
                    openRequest.push({c:c, i:i,f:false})
                    break;
                }
            }
        }
        i++
    }
    console.log(foundKeys.sort((a,b)=>a-b)[maxKeys-1])
}

export async function taskTwo(input: string[]): Promise<void> {
    const init = input[0]
    let openRequest: {c: string, i: number, f:boolean}[] = []
    const foundKeys: number[] = []
    const maxKeys = 64
    const maxKeyLife = 1000
    const hashCount = 2017
    let i = 0
    while(foundKeys.length < maxKeys || openRequest.length > 0) {
        const hash = hashTimes(init + i)

        openRequest = openRequest.filter(k => i - k.i < maxKeyLife && !k.f)
        for (const k of openRequest) {
            if (RegExp(`${k.c}{5}`).test(hash)) {
                k.f = true
                foundKeys.push(k.i)
            }
        }

        if (foundKeys.length < maxKeys) {
            for (let x = 0; x < hash.length-2; x++) {
                let c = hash[x]
                if (c == hash[x+1] && c == hash[x+2]) {
                    openRequest.push({c:c, i:i,f:false})
                    break;
                }
            }
        }
        i++
        if (i % 1000 == 0)
        console.log(i)
    }
    console.log(foundKeys.sort((a,b)=>a-b)[maxKeys-1])

    function hashTimes(a: string) {
        let b = a
        for (let x = 0; x < hashCount; x++) {
            b = md5(b)
        }
        return b
    }
}