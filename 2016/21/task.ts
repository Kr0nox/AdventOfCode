export async function taskOne(input: string[]): Promise<void> {
    console.log(exec('abcdefgh'.split(''), input).join(''))
}

export async function taskTwo(input: string[]): Promise<void> {
    
    const goal = 'fbgdceah'.split('')
    step([])
    function step(cur: string[]) {
        if (cur.length == goal.length) {
            const r = exec(cur, input)
            for (let i = 0; i < goal.length; i++) {
                if (r[i] != goal[i]) return
            }
            console.log(cur.join(''))
            return
        }
        for (const c of goal) {
            if (!cur.includes(c)) {
                let cop = Array.from(cur)
                cop.push(c)
                step(cop)
            }
        }
    }
}

function exec(password: string[], input: string []) {

    for (const i of input) {
        let r = /swap position ([0-9]+) with position ([0-9]+)/.exec(i)
        if (r) {
            let x1 = parseInt(r[1])
            let x2 = parseInt(r[2])
            let temp = password[x1]
            password[x1] = password[x2]
            password[x2] = temp
            continue
        }
        r = /swap letter (.) with letter (.)/.exec(i)
        if (r) {
            let l1 = r[1]
            let l2 = r[2]
            password = password.map(l => {
                if (l == l2) return l1
                if (l == l1) return l2
                return l
            })
            continue
        }
        r = /rotate left ([0-9]+) step/.exec(i)
        if (r) {
            rotateLeft(parseInt(r[1]))
            continue
        }
        r = /rotate right ([0-9]+) step/.exec(i)
        if (r) {
            rotateRight(parseInt(r[1]))
            continue
        }
        r = /rotate based on position of letter (.)/.exec(i)
        if (r) {
            let ind = password.indexOf(r[1])
            rotateRight(ind+1+(ind>=4?1:0))
            continue
        }
        r = /reverse positions ([0-9]+) through ([0-9]+)/.exec(i)
        if (r) {
            let x1 = parseInt(r[1])
            let x2 = parseInt(r[2])
            reverse(x1, x2)
            continue
        }
        r = /move position ([0-9]+) to position ([0-9]+)/.exec(i)
        if (r) {
            let x = parseInt(r[1])
            let y = parseInt(r[2])
            move(x,y)
            continue
        }

        throw i        
    }
    
    return password

    function rotateLeft(x: number) {
        let n = Array.from(password)
        for (let i = 0; i < password.length; i++) {
            n[i] = password[(i+x)%password.length]
        }
        password = n
    }
    function rotateRight(x: number) {
        let n = Array.from(password)
        for (let i = 0; i < password.length; i++) {
            n[i] = password[(i-x+password.length*2)%password.length]
        }
        password = n
    }

    function reverse(x1: number, x2: number) {
        let n = Array.from(password) 
        for (let x = 0; x <= x2-x1; x++) {
            n[x+x1] = password[x2-x]
        }
        password = n
    }

    function move(x: number, y: number) {
        let n = Array.from(password)
        if (x < y) {
            for (let i = x; i < y; i++) {
                n[i] = password[i+1]
            }
        } else {
            for (let i = x; i > y; i--) {
                n[i] = password[i-1]
            } 
        }
        n[y] = password[x]
        password = n
    }
}