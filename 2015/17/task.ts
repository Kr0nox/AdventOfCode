const W = 150

export async function taskOne(input: string[]): Promise<void> {
    const w = input.map(Number);
    console.log(next(w, 0, 0));

    function next(w: number[], i: number, s: number): number {
        if (s > W) return 0
        if (i === w.length) return s == W ? 1 : 0;
        
        return next(w, i + 1, s + w[i]) + next(w, i + 1, s);
    }
}

export async function taskTwo(input: string[]): Promise<void> {
    const w = input.map(Number);
    console.log(next(w, 0, 0, 0));

    function next(w: number[], i: number, s: number, c: number): number {
        if (s > W) return Infinity
        if (i === w.length) return s == W ? c : Infinity;
        
        return Math.min(next(w, i + 1, s + w[i], c+1), next(w, i + 1, s, c));
    }
}

