import md5 from './md5'

export async function taskOne(input: string[]): Promise<void> {
    let i = 0
    let pass = ''
    while(pass.length < 8) {
        const initHash = input[0]
        const hashBuffer = md5(initHash + i)
        const hash = buf2hex(hashBuffer)
        if (hash.startsWith('00000')) {
            pass += hash.charAt(5)
        }
            
        i++
    }
    console.log(pass)    
}

export async function taskTwo(input: string[]): Promise<void> {
    let i = 0
    let pass: (string|null)[] = [null, null, null, null,null, null, null, null]
    while(pass.some(j => j==null)) {
        const initHash = input[0]
        const hashBuffer = md5(initHash + i)
        const hash = buf2hex(hashBuffer)
        if (hash.startsWith('00000')) {
            const index = parseInt(hash.charAt(5))
            if (!isNaN(index) && index >= 0 && index < 8) {
                if (pass[index] == null) pass[index] = hash.charAt(6)
            }
        }
        i++
    }
    console.log(pass.join(""))  
}

function buf2hex(buffer: any) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}