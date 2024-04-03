import { JsonSet } from '../../base/simpleStructure'

export async function taskOne(_input: string[]): Promise<void> {
    const input = _input[0].split('');
    const set = new JsonSet();

    const c = [0, 0]
    set.add(c)
    for(const i of input) {
        if (i == '>') {
            c[0]++
        } else if (i == '<') {
            c[0]--
        } else if(i == '^') {
            c[1]++
        } else {
            c[1]--
        }
        set.add(c)
    }
    console.log(set.get().size)
}

export async function taskTwo(_input: string[]): Promise<void> {
    const input = _input[0].split('');
    const set = new JsonSet();

    const s = [0, 0]
    const r = [0, 0]
    set.add(s)
    let santaMoves = true;
    for(const i of input) {
        if (santaMoves) {
            if (i == '>') {
                s[0]++
            } else if (i == '<') {
                s[0]--
            } else if(i == '^') {
                s[1]++
            } else {
                s[1]--
            }
            set.add(s)
        } else {
            if (i == '>') {
                r[0]++
            } else if (i == '<') {
                r[0]--
            } else if(i == '^') {
                r[1]++
            } else {
                r[1]--
            }
            set.add(r)
        }
        santaMoves = !santaMoves
    }
    console.log(set.get().size)
}