export async function taskOne(input: string[]): Promise<void> {
    let i = 0;
    const registers: Record<string, number> = {}
    function get(s: string) {
        return registers[s] ?? 0
    }
    let lastSend = 0
    while(i < input.length) {
        let r = /snd ([a-zA-Z])$/.exec(input[i])
        if (r) {
            lastSend = get(r[1])
            i++
            continue
        }
        r = /set ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
        if (r) {
            if (/-?[0-9]+/.test(r[2])) registers[r[1]] = parseInt(r[2])
            else registers[r[1]] = get(r[2])
            i++
            continue
        }
        r = /add ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
        if (r) {
            let b = get(r[1])
            if (/-?[0-9]+/.test(r[2])) registers[r[1]] = b + parseInt(r[2])
            else registers[r[1]] = b + get(r[2])
            i++
            continue
        }
        r = /mul ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
        if (r) {
            let b = get(r[1])
            if (/-?[0-9]+/.test(r[2])) registers[r[1]] = b * parseInt(r[2])
            else registers[r[1]] = b * get(r[2])
            i++
            continue
        }
        r = /mod ([a-zA-Z]) ([a-zA-Z]|[0-9]+)$/.exec(input[i])
        if (r) {
            let b = get(r[1])
            if (/[0-9]+/.test(r[2])) registers[r[1]] = b % parseInt(r[2])
            else registers[r[1]] = b % get(r[2])
            i++
            continue
        }
        r = /rcv ([a-zA-Z]|[0-9]+)$/.exec(input[i])
        if (r) {
            let check = 0
            if (/[0-9]+/.test(r[1])) check = parseInt(r[1])
            else check = get(r[1])
            if (check != 0) {
                console.log(lastSend)
                return
            }
            i++
            continue
        }
        r = /jgz ([a-zA-Z]|[0-9]+) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
        if (r) {
            let check = 0
            if (/[0-9]+/.test(r[1])) check = parseInt(r[1])
            else check = get(r[1])
            if (check <= 0) {
                i++
                continue
            }
            let jump = 0
            if (/-?[0-9]+/.test(r[2])) jump = parseInt(r[2])
            else jump = get(r[2])
            i += jump
            continue
        }
        throw input[i]
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    let i = 0;
    let j = 0;
    const registersI: Record<string, number> = {}
    function getI(s: string) {
        return registersI[s] ?? 0
    }
    const registersJ: Record<string, number> = {}
    function getJ(s: string) {
        return registersJ[s] ?? 0
    }
    registersI['p'] = 0
    registersJ['p'] = 1
    let queueI = [] as number[]
    let queueJ = [] as number[]
    let iWaits = false
    let jWaits = false
    let jSends = 0
    while(j < input.length) {
        while (i < input.length && !iWaits) {
            iWaits = false
            let r = /snd ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
            if (r) {
                if (/-?[0-9]+/.test(r[1])) queueJ.push(parseInt(r[1]))
                else queueJ.push(getI(r[1]))
                i++
                jWaits = false
                continue
            }
            r = /set ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
            if (r) {
                if (/-?[0-9]+/.test(r[2])) registersI[r[1]] = parseInt(r[2])
                else registersI[r[1]] = getI(r[2])
                i++
                continue
            }
            r = /add ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
            if (r) {
                let b = getI(r[1])
                if (/-?[0-9]+/.test(r[2])) registersI[r[1]] = b + parseInt(r[2])
                else registersI[r[1]] = b + getI(r[2])
                i++
                continue
            }
            r = /mul ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
            if (r) {
                let b = getI(r[1])
                if (/-?[0-9]+/.test(r[2])) registersI[r[1]] = b * parseInt(r[2])
                else registersI[r[1]] = b * getI(r[2])
                i++
                continue
            }
            r = /mod ([a-zA-Z]) ([a-zA-Z]|[0-9]+)$/.exec(input[i])
            if (r) {
                let b = getI(r[1])
                if (/[0-9]+/.test(r[2])) registersI[r[1]] = b % parseInt(r[2])
                else registersI[r[1]] = b % getI(r[2])
                i++
                continue
            }
            r = /rcv ([a-zA-Z])$/.exec(input[i])
            if (r) {
                if (queueI.length > 0) {
                    registersI[r[1]] = queueI[0]
                    queueI.shift()
                } else {
                    iWaits = true;
                    break
                }
                
                i++
                continue
            }
            r = /jgz ([a-zA-Z]|[0-9]+) ([a-zA-Z]|-?[0-9]+)$/.exec(input[i])
            if (r) {
                let check = 0
                if (/[0-9]+/.test(r[1])) check = parseInt(r[1])
                else check = getI(r[1])
                if (check <= 0) {
                    i++
                    continue
                }
                let jump = 0
                if (/-?[0-9]+/.test(r[2])) jump = parseInt(r[2])
                else jump = getI(r[2])
                i += jump
                continue
            }
            throw input[i]
        }
        if (jWaits && queueJ.length == 0) break

        while (j < input.length && !jWaits) {
            jWaits = false
            let r = /snd ([a-zA-Z]|-?[0-9]+)$/.exec(input[j])
            if (r) {
                if (/-?[0-9]+/.test(r[1])) queueI.push(parseInt(r[1]))
                else queueI.push(getJ(r[1]))
                j++
                jSends++
                iWaits = false
                continue
            }
            r = /set ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[j])
            if (r) {
                if (/-?[0-9]+/.test(r[2])) registersJ[r[1]] = parseInt(r[2])
                else registersJ[r[1]] = getJ(r[2])
                j++
                continue
            }
            r = /add ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[j])
            if (r) {
                let b = getJ(r[1])
                if (/-?[0-9]+/.test(r[2])) registersJ[r[1]] = b + parseInt(r[2])
                else registersJ[r[1]] = b + getJ(r[2])
                j++
                continue
            }
            r = /mul ([a-zA-Z]) ([a-zA-Z]|-?[0-9]+)$/.exec(input[j])
            if (r) {
                let b = getJ(r[1])
                if (/-?[0-9]+/.test(r[2])) registersJ[r[1]] = b * parseInt(r[2])
                else registersJ[r[1]] = b * getJ(r[2])
                j++
                continue
            }
            r = /mod ([a-zA-Z]) ([a-zA-Z]|[0-9]+)$/.exec(input[j])
            if (r) {
                let b = getJ(r[1])
                if (/[0-9]+/.test(r[2])) registersJ[r[1]] = b % parseInt(r[2])
                else registersJ[r[1]] = b % getJ(r[2])
                j++
                continue
            }
            r = /rcv ([a-zA-Z])$/.exec(input[j])
            if (r) {
                if (queueJ.length > 0) {
                    registersJ[r[1]] = queueJ[0]
                    queueJ.shift()
                } else {
                    jWaits = true;
                    break
                }
                
                j++
                continue
            }
            r = /jgz ([a-zA-Z]|[0-9]+) ([a-zA-Z]|-?[0-9]+)$/.exec(input[j])
            if (r) {
                let check = 0
                if (/[0-9]+/.test(r[1])) check = parseInt(r[1])
                else check = getJ(r[1])
                if (check <= 0) {
                    j++
                    continue
                }
                let jump = 0
                if (/-?[0-9]+/.test(r[2])) jump = parseInt(r[2])
                else jump = getJ(r[2])
                j += jump
                continue
            }
            throw input[j]
        }
        if (iWaits && queueI.length == 0) break
    }
    console.log(jSends)
}