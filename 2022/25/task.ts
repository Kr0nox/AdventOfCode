export async function taskOne(input: string[]): Promise<void> {
    console.log(toSnafu(input.map(toDecimal).reduce((a,b)=> a+b,0)))
}

export async function taskTwo(input: string[]): Promise<void> {
    console.log("Unimplemented");
}

const digits = ['=', '-', '0', '1', '2'] 

function digit(s: string) {
    return digits.indexOf(s)-2
}

function snafuDigit(n: number) {
    return digits[n+2]
}

function toDecimal(s: string) {
    let sum = 0
    for (let i = 0; i < s.length; i++) {
        sum += digit(s[i]) * (5**(s.length-1-i))
    }
    return sum
}

function toSnafu(n: number) {
    let maxE = 0;
    let maxESum = 2
    while (n > maxESum) {
        maxE++
        maxESum += 2*(5**maxE)
    }
    let s = ""
    const exp = Array.from({length: maxE+1}, (_,i) => 5**i)
    for (let i = maxE; i >= 0; i--) {
        let digitLimit = 3*exp[i]
        for (let j = i-1; j >= 0; j--) {
            digitLimit -= 2*exp[j]
        }
        for (let j = 2; j >= -2; j--) {
            digitLimit -= exp[i]
            if (n >= digitLimit) {
                s += snafuDigit(j)
                n -= j*(5**i)
                break
            }
        }
        
    }
    return s   
}