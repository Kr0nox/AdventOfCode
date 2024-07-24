export async function taskOne(input: string[]): Promise<void> {
    let state = /state ([A-Z])/.exec(input[0])![1]
    const roundsToDo = parseInt(/after ([0-9]+)/.exec(input[1])![1])
    const rules: Record<string, Record<string, Rule>> = {}
    let line = 3
    while(line < input.length) {
        const curState = /state ([A-Z])/.exec(input[line])![1]
        rules[curState] = {}

        let curRead = 0
        for (let i = 0; i < 2; i++) {
            line+=2
            const write = /value (0|1)/.exec(input[line])![1]
            line++
            const dir = /the (.*)\./.exec(input[line])![1] == 'right' ? 1:-1
            line++
            const nextState = /state ([A-Z])/.exec(input[line])![1]
            
            rules[curState][curRead] = {write, dir, nextState}

            curRead++
        }
        line += 2
    }

    const band: Record<number, string> = {}
    let cursor = 0
    function get() {
        return band[cursor]??'0'
    }

                        
    for (let c = 0; c < roundsToDo; c++) {
        //console.log(state, band, cursor)
        const curRule = rules[state][get()]
        state = curRule.nextState
        band[cursor] = curRule.write
        cursor += curRule.dir
    }
    console.log(Object.keys(band).length)

    console.log(Object.values(band).filter(v => v == '1').length)
}

interface Rule {
    write: string,
    dir: number,
    nextState: string
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}