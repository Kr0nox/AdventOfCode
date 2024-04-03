import md5 from './md5'

export async function taskOne(input: string[]): Promise<void> {
    console.log(findStartHash(input[0], '00000'))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log(findStartHash(input[0], '000000'))
}

function findStartHash(initHash: string, expectedStart: string) {
    let i = 0;
    while (true) {
        const hashBuffer = md5(initHash + i)
        const hash = buf2hex(hashBuffer)
        if (hash.startsWith(expectedStart))
            break;
        i++
    }
    return i
}

function buf2hex(buffer: any) { // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map(x => x.toString(16).padStart(2, '0'))
        .join('');
}