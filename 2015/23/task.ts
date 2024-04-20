export async function taskOne(input: string[]): Promise<void> {
    task(0,0,input);
}

export async function taskTwo(input: string[]): Promise<void> {
    task(1,0,input);
}

function task(a: number, b: number, input: string[]) {
    let i = 0

    while(i < input.length) {
        exec()
    }

    function exec() {
        let r = /hlf (a|b)/.exec(input[i])
        if (r) {
            if (r[1] == 'a') a /=2
            else b /= 2
            i++
            return
        }
        r = /tpl (a|b)/.exec(input[i])
        if (r) {
            if (r[1] == 'a') a *=3
            else b *=3
            i++
            return
        }
        r = /inc (a|b)/.exec(input[i])
        if (r) {
                if (r[1] == 'a') a++
                else b++
                i++
                return
        }
        r = /jmp ((?:\+|-)[0-9]+)/.exec(input[i])
        if (r) {
            i += parseInt(r[1])
            return 
        }
        r = /jie (a|b), ((?:\+|-)[0-9]+)/.exec(input[i])
        if (r) {
            if (r[1] == 'a' && a % 2 == 0 || r[1] == 'b' && b % 2 == 0)
                i += parseInt(r[2]) 
            else i++
            return
        }
        r = /jio (a|b), ((?:\+|-)[0-9]+)/.exec(input[i])
        if (r) {
            if (r[1] == 'a' && a == 1 || r[1] == 'b' && b == 1)
                i += parseInt(r[2]) 
            else i++
            return
        }
        throw input[i]
    }
    console.log(b)
}