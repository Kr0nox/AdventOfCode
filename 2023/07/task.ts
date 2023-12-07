export async function taskOne(input: string[]): Promise<void> {
    const hands = parseInput(input)
    hands.sort(handComparator)
    console.log(evaluateGame(hands))
}

export async function taskTwo(input: string[]): Promise<void> {
    const hands = parseInput(input)
    hands.sort(handComparator2)
    console.log(evaluateGame(hands))
}

function parseInput (input: string[]) {
    return input.map(getParts).map(s => {
        return {
            hand: s[0].split(""),
            bid: parseInt(s[1])
        }
    })
}

function evaluateGame(handsSorted: Hand[]) {
    let total = 0
    for(let i = 0; i < handsSorted.length; i++) {
        total += handsSorted[i].bid * (i+1)
    }
    return total
}

interface Hand {
    hand: string[]
    bid: number
}

function getParts(s: string) {
    return s
      .split(" ")
      .filter((x) => x != "")
      .map((x) => x.trim());
}

const cardOrder1 = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A']

function cardComparator(a: string, b: string) {
    return cardOrder1.indexOf(a) - cardOrder1.indexOf(b)
}

function handComparator(a: Hand, b: Hand) {
    const compare = getHandValue(a) - getHandValue(b)
    if (compare != 0) return compare
    for (let i = 0; i < 5; i++) {
        const c = cardComparator(a.hand[i], b.hand[i])
        if (c != 0) return c
    }
    console.log("Equal", a, b)
    throw "Equal hands"
}

function getHandValue(hand: Hand) {
    const h = hand.hand
    const accuracies = h.map(n => h.filter(s => s == n).length)
    const maxAccuracy = Math.max(...accuracies)
    if (maxAccuracy == 5) return 6
    if (maxAccuracy == 4) return 5
    if (maxAccuracy == 1) return 0
    if (maxAccuracy == 3) {
        if (accuracies.includes(2)) {
            return 4
        }
        return 3
    }
    if (maxAccuracy == 2) {
        if (accuracies.filter(s => s == 2).length > 2) {
            return 2
        }
        return 1
    }
    console.log("Error", h)
    throw "Could not classify hand"
}

const cardOrder2 = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A']


function cardComparator2(a: string, b: string) {
    return cardOrder2.indexOf(a) - cardOrder2.indexOf(b)
}

function handComparator2(a: Hand, b: Hand) {
    const compare = getHandValue2(a) - getHandValue2(b)
    if (compare != 0) return compare
    for (let i = 0; i < 5; i++) {
        const c = cardComparator2(a.hand[i], b.hand[i])
        if (c != 0) return c
    }
    console.log("Equal", a, b)
    throw "Equal hands"
}

function getHandValue2(hand: Hand) {
    
    const h = hand.hand
    
    const jokerCount = h.filter(s => s== 'J').length
    if (jokerCount == 0) {
        return getHandValue(hand)
    }
    if (jokerCount >= 4) {
        return 6
    }
    const accuracies = h.map(n => h.filter(s => s == n && s != 'J').length)
    const maxAccuracy = Math.max(...accuracies)

    if (jokerCount == 3) {
        if (maxAccuracy == 2) return 6
        return 5
    }
    if (jokerCount == 2) {
        if (maxAccuracy == 3) return 6
        if (maxAccuracy == 2) return 5
        return 3
    }
    if (jokerCount == 1) {
        if (maxAccuracy == 4) return 6
        if (maxAccuracy == 3) return 5
        if (maxAccuracy == 2) {
            if (accuracies.filter(s => s == 2).length > 2) return 4
            return 3
        }
        return 1
    }
    console.log("Error", h)
    throw "Could not classify hand"
}