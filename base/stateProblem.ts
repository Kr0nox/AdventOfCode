import { JsonSet, Queue, Stack } from "./simpleStructure";

class StateProblem<S> {

  constructor(public next: (arg1: S) => S[], public explore?: (arg1: S) => boolean) {}

  public bfs(root: S) {
    const Q = new Queue<S>();
    const V = new JsonSet<S>();
    Q.push(root)
    while(!Q.isEmpty) {
      const q = Q.pop()
      if (this.explore != undefined) {
        const r = this.explore(q)
        if (!r) break
      }
      const next = this.next(q)
      for (const n of next) {
        if (!V.has(n)) {
          Q.push(n)
        }
      }
    }
  }

  public dfs(root: S) {
    const Q = new Stack<S>();
    const V = new JsonSet<S>();
    Q.push(root)
    while(!Q.isEmpty) {
      const q = Q.pop()
      if (this.explore != undefined) {
        const r = this.explore(q)
        if (!r) break
      }
      const next = this.next(q)
      for (const n of next) {
        if (!V.has(n)) {
          Q.push(n)
        }
      }
    }
  }
}