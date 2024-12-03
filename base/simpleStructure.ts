class StructureNode<T> {
  constructor(public val: T, public next?: StructureNode<T>) {}
}

class Stack<T> {
  private _top: StructureNode<T>|undefined

  public push(v: T) {
    const next = new StructureNode(v, this._top)
    this._top = next
  }

  public pop(): T {
    if (!this._top) throw "Empty Stack"
    const r = this._top.val
    this._top = this._top.next
    return r
  }

  public isEmpty() {
    return !this._top
  }

  public top() {
    if (!this._top) throw "Empty Stack"
    return this._top.val
  }

  public asArray() {
    let e = this._top
    if (!e) return []
    const arr: T[] = []
    while(e) {
      arr.push(e.val)
      e = e.next
    }
    return arr
  }
}

class Queue<T> {
  protected _head: StructureNode<T>|undefined
  protected _tail: StructureNode<T>|undefined

  public push(v: T) {
    if (!this._tail) {
      const n = new StructureNode(v)
      this._head = n
      this._tail = n
      return
    }
    const n = new StructureNode(v)
    this._tail.next = n
    this._tail = n
  }

  public pop(): T {
    if (!this._head) throw "Empty Queue"
    const r = this._head.val
    this._head = this._head.next
    if(!this._head) this._tail = undefined
    return r
  }

  public head(): T {
    if (!this._head) throw "Empty Queue"
    return this._head.val
  }

  public isEmpty() {
    return !this._head
  }

  public asArray() {
    let e = this._head
    if (!e) return []
    const arr: T[] = []
    while(e) {
      arr.push(e.val)
      e = e.next
    }
    return arr
  }
}

class JsonSet<S> {
  private set = new Set()

  public add(val: S) {
    this.set.add(JSON.stringify(val))
  }

  public has(val: S) {
    	return this.set.has(JSON.stringify(val))
  }

  public remove(val: S) {
    this.set.delete(JSON.stringify(val))
  }

  public get() {
    return this.set
  }
}

class FunctionSet<S> {

  private set: S[] = []

  constructor(public equals: (s1: S, s2:S) => boolean) {}

  public add(val: S) {
    if (!this.has(val))
      this.set.push(val)
  }

  public has(val: S) {
    return this.set.some(s => this.equals(s, val))
  }

  public remove(val: S) {
    const idx = this.set.findIndex(s => this.equals(s, val))
    if (idx >= 0) this.set = this.set.filter((_, ind) => ind != idx)
  }
}

class MinHeap<T> {

  private internal: {v:T, p:number}[];
  
  constructor() {
    this.internal = []
  }

  public isEmpty() {
      return this.internal.length == 0
  }


  public pop() {
    const min = this.internal[0]
    this.internal[0] = this.internal[this.internal.length - 1]
    this.internal.pop()

    let index = 0
    while(true) {
      const leftIdx = 2*index+1
      const rightIdx = 2*index+2
      let smallestIdx = index
      if (leftIdx < this.internal.length && this.internal[leftIdx].p < this.internal[smallestIdx].p) {
        smallestIdx = leftIdx
      }
      if (rightIdx < this.internal.length && this.internal[rightIdx].p < this.internal[smallestIdx].p) {
        smallestIdx = rightIdx
      }
      if (smallestIdx == index) break
      else {
        const t = this.internal[index]
        this.internal[index] = this.internal[smallestIdx]
        this.internal[smallestIdx] = t
      }
      index = smallestIdx
    }
    return min.v
  }

  public push(v : T, p: number) {
    this.internal.push({v,p})
    let i = this.internal.length - 1
    let parentIdx = Math.floor((i-1)/2)
    while(i > 0 && this.internal[parentIdx].p > this.internal[i].p) {
      let t = this.internal[i]
      this.internal[i] = this.internal[parentIdx]
      this.internal[parentIdx] = t
      i = parentIdx
      parentIdx = Math.floor((i-1)/2)
    }
  }

  public print() {
    console.log(this.internal)
  }

}

export { Stack, Queue, JsonSet, FunctionSet, MinHeap }