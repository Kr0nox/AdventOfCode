export async function taskOne(_input: string[]): Promise<void> {
    let sum = 0;
    let curVal = 1
    const input = _input[0]

    for (let i = 0; i < input.length; i++) {
        if (input[i] == '<') {
            while(input[i] != '>') {
                if (input[i] == '!') i+=2
                else i++
            }
        }
        if (input[i] == '!') {
            i++
            continue
        }

        if (input[i] == '{') {
            sum += curVal
            curVal++
        } 
        if (input[i] == '}') {
            curVal--
        }
    }
    console.log(sum)
}

export async function taskTwo(_input: string[]): Promise<void> {
    let sum = 0
    const input = _input[0]
    for (let i = 0; i < input.length; i++) {
        if (input[i] == '<') {
            while(input[i] != '>') {
                if (input[i] == '!') i+=2
                else {
                    sum++
                    i++
                }
            }
            sum--
        }
    }
    console.log(sum)
}