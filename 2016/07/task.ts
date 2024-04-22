export async function taskOne(input: string[]): Promise<void> {
    let count = 0
    for(const i of input) {
        let foundOutside = false
        let foundInside = false
        let open = 0
        for(let c = 0; c < i.length - 3; c++) {
            if(i[c] == '[') open++
            else if (i[c] == ']') open--
            else {
                let a = i[c]
                let b = i[c+1]
                if (a != b && a == i[c+3] && b == i[c+2]) {
                    if (open == 0) foundOutside = true
                    else foundInside = true
                }
            }
        }
        if (foundOutside && !foundInside) {
            count++  
        } 

    }
    console.log(count)
}

export async function taskTwo(input: string[]): Promise<void> {
    let count = 0
    for(const i of input) {
        let seq: [string, string, string][] = []
        let open = 0
        for(let c = 0; c < i.length - 2; c++) {
            if(i[c] == '[') open++
            else if (i[c] == ']') open--
            else if(open == 0) {
                let a = i[c]
                let b = i[c+1]
                if (a!=b && a == i[c+2]) {
                    seq.push([b,a,b])
                }
            }
        }
        let valid = false
        for(let c = 0; c < i.length - 2; c++) {
            if(i[c] == '[') open++
            else if (i[c] == ']') open--
            else if(open > 0) {
                for(const s of seq) {
                    if (s[0] == i[c] && s[1] == i[c+1] && s[2] == i[c+2]) {
                        valid = true
                    }
                }
                
            }
        }
        if (valid) {
            count++
            //console.log(i)
        }
    }  
    console.log(count) 
}