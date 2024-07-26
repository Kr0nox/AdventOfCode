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
  private _head: StructureNode<T>|undefined
  private _tail: StructureNode<T>|undefined

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

class PriorityQueue<T> {
  private data: [number, T][]

  constructor() {
    this.data = []
  }

  public insert(p: number, v: T) {
    if (this.data.length == 0) {
      this.data.push([p,v])
      return
    }

    for (let index = 0; index < this.data.length; index++) {
      if (index == this.data.length - 1) {
        this.data.push([p, v])
        return
      }

      if (this.data[index][0] > p) {
        this.data.splice(index, 0, [p, v])
        return
      }
    }
  }

  public pop() {
    return this.data.length == 0 ? null : this.data.pop()![1]
  }

  public isEmpty() {
    return this.data.length == 0
  }

}

export { Stack, Queue, JsonSet, FunctionSet, PriorityQueue }