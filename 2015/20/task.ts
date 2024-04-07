export async function taskOne(input: string[]): Promise<void> {
    const GOAL = parseInt(input[0]) / 10

    const primes: number[] = [2,3,5,7]
    let i = 2;
    console.log(val(4))
    //for (let i = 2; i <= 120; i++)
     //   console.log(i, val(i))
    while(val(i) < GOAL) {
        if (i % 1000 == 0) {
        }
        i++;
    }
    console.log(i)

    function val(nu: number) {
        let n = nu
        let s = 1
        for (const p of primes) {
            if (n % p == 0) {
                let i = 1
                let j = 0
                while(n % p == 0) {
                    j += i
                    i *= p
                    n /= p
                }
                j += i
                s *= j
            }
        }
        if (s == 1) {
            primes.push(n)
            return (1+n)
        }
        return s
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const GOAL = parseInt(input[0]) / 11
    const MAX = Math.ceil(GOAL)

    const A = Array.from({length: Math.ceil(MAX)}, ()=>0)

    for (let i = 1; i <= MAX; i++) {
        for (let j = 1; j <= 50; j++) {
            if (i * j >= MAX) break;
            A[i*j] += i
        }
        if(A[i] > GOAL) {
            console.log(i)
            return
        }
    }

}