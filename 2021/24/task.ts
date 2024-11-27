export async function taskOne(input: string[]): Promise<void> {    
    const ins = input.map(i => i.split(' '))

    const badStates = new Set<string>()
    console.log(run(0, {'w':0,'x':0,'y':0,'z':0}))

    function run(i: number, register: Record<string, number>): string|false {
        const k = i + "|" + register['z'] + "|" + register['w']
        if (badStates.has(k)) {
            return false
        }

        while(i < ins.length) {
            const task = ins[i][0]
            if (task == 'inp') {
                for (const n of [9,8,7,6,5,4,3,2,1]) {
                    register[ins[i][1]] = n
                    const r = run(i+1, copyReg(register))
                    if (r === false) continue
                    else {
                        return `${n}${r}`
                    }
                }
                badStates.add(k)
                return false
            } else {
                const a = ins[i][1]
                const b = ins[i][2]
                if (task == 'add') {
                    register[a] += get(b)
                } else if (task == 'mul') {
                    register[a] *= get(b)
                } else if (task == 'mod') {
                    register[a] %= get(b)
                } else if (task == 'div') {
                    register[a] = Math.floor(get(a) / get(b))
                } else if (task == 'eql') {
                    register[a] = get(a) == get(b) ? 1:0
                } else {
                    throw i
                }
                i++
            }
        }
        if (register['z'] != 0) {
            return false
        }
        return ''
        
        function get(x: string) {
            if (x.match(/[wxyz]/)) {
                return register[x]
            } else {
                return Number(x)
            }
        }
    }

    function copyReg(reg: Record<string, number>) {
        return {
            'w': reg['w'],'x': reg['x'],'y': reg['y'],'z': reg['z']
        }
    } 
}

export async function taskTwo(input: string[]): Promise<void> {
    const ins = input.map(i => i.split(' '))

    const badStates = new Set<string>()
    console.log(run(0, {'w':0,'x':0,'y':0,'z':0}))

    function run(i: number, register: Record<string, number>): string|false {
        const k = i + "|" + register['z'] + "|" + register['w']
        if (badStates.has(k)) {
            return false
        }

        while(i < ins.length) {
            const task = ins[i][0]
            if (task == 'inp') {
                for (const n of [1,2,3,4,5,6,7,8,9]) {
                    register[ins[i][1]] = n
                    const r = run(i+1, copyReg(register))
                    if (r === false) continue
                    else {
                        return `${n}${r}`
                    }
                }
                badStates.add(k)
                return false
            } else {
                const a = ins[i][1]
                const b = ins[i][2]
                if (task == 'add') {
                    register[a] += get(b)
                } else if (task == 'mul') {
                    register[a] *= get(b)
                } else if (task == 'mod') {
                    register[a] %= get(b)
                } else if (task == 'div') {
                    register[a] = Math.floor(get(a) / get(b))
                } else if (task == 'eql') {
                    register[a] = get(a) == get(b) ? 1:0
                } else {
                    throw i
                }
                i++
            }
        }
        if (register['z'] != 0) {
            return false
        }
        return ''
        
        function get(x: string) {
            if (x.match(/[wxyz]/)) {
                return register[x]
            } else {
                return Number(x)
            }
        }
    }

    function copyReg(reg: Record<string, number>) {
        return {
            'w': reg['w'],'x': reg['x'],'y': reg['y'],'z': reg['z']
        }
    } 
}