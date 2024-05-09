export async function taskOne(_input: string[]): Promise<void> {
    let len = 0
    let i = 0
    const input = _input[0].replace(' ', '')
    //console.log(input)
    while(i < input.length) {
        if (input[i] == '(') {
            let first = ''
            let second = ''
            i++
            while(input[i] != 'x') {
                first += input[i]
                i++
            }
            i++
            while(input[i] != ')') {
                second += input[i]
                i++
            }
            //console.log(input.substring(i+1), first, second, len)
            len += parseInt(first) * parseInt(second)
            i += parseInt(first)
            //console.log(input.substring(i+1), len)
            //console.log('')
        } else {
            len++
        } 
        i++
    }
    console.log(len)
}

export async function taskTwo(input: string[]): Promise<void> {
    const inp = input[0].replace(' ', '')
    console.log(nested(inp))
    function nested(input: string): number {
        let len = 0
        let i = 0
        while(i < input.length) {
            if (input[i] == '(') {
                let first = ''
                let second = ''
                i++
                while(input[i] != 'x') {
                    first += input[i]
                    i++
                }
                i++
                while(input[i] != ')') {
                    second += input[i]
                    i++
                }
                len += nested(input.substring(i+1, i+1+parseInt(first))) * parseInt(second)
                i += parseInt(first)
            } else {
                len++
            } 
            i++
        }
        return len
    }
}