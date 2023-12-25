export async function taskOne(input: string[]): Promise<void> {
    const pos = input.map(i=>parseInt(i.replace(" ", "").split(":")[1].trim()) - 1)
    const score = input.map(i=>0)
    let die = 0
    let rollCount = 0
    function roll() {
        die++
        rollCount++
        const temp = die
        die %= 100
        return temp
    }
    let player = 0
    while(!score.some(i=>i>=1000)) {
        const r = roll()+ roll()+ roll()
        pos[player] = (pos[player] + r) % 10
        score[player] += pos[player] + 1
        player = (player + 1) % pos.length
    }
    console.log(rollCount*Math.min(...score))
}

export async function taskTwo(input: string[]): Promise<void> {
    const pos = input.map(i=>parseInt(i.replace(" ", "").split(":")[1].trim()) - 1)
    const dieOccurences = [0, 0, 0, 1, 3, 6, 7, 6, 3, 1]
    interface PlayerState {
        p: number
        s: number
    }
    type Game = { p:[PlayerState, PlayerState], c:0|1, o: number}
    const queue: Game[] = [
        {p: [{p:pos[0], s:0}, {p:pos[1], s:0}], c:0, o:1}
    ]
    while(queue.length > 0) {
        const q = queue.pop() as Game
        if (q.o == 0) continue
        if (q.p[0].s >= 21) {
            continue
        }
        if (q.p[1].s >= 21) {
            continue
        }
        for(let [roll,occ] of dieOccurences.entries()) {
            const newPos = (q.p[q.c].p + roll) % 10
            const newScore = q.p[q.c].s+newPos+1
            const newP: PlayerState[] = []
            if (q.o == 0) {
                newP.push({p:newPos, s:newScore})
                newP.push(q.p[1])
            } else {
                newP.push(q.p[0])
                newP.push({p:newPos, s:newScore})
            }
            queue.push({
                p: newP as [PlayerState, PlayerState],
                c: (q.c+1)%2 as 0|1,
                o: q.o*occ
            })
        }

    }

    console.log("done")
}
