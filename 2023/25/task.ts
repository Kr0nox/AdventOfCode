export async function taskOne(input: string[]): Promise<void> {
  const graph: Record<string, string[]> = {};
  let sum = 0;
  function add(a: string, b: string) {
    if (graph[a] == undefined) graph[a] = [];
    if (graph[b] == undefined) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }
  input.forEach((i) => {
    const split = i.split(": ");
    const root = split[0].trim();
    split[1]
      .split(" ")
      .map((j) => j.trim())
      .forEach((j) => add(root, j));
  });

  let potential: [string, string][][] = [];
  const keys = Object.keys(graph);
  const keys2 = keys.reverse();
  let i = 0
  let maxPos = 200
  for (const k1 of keys) {
    for (const k2 of keys2) {
      if (k1 == k2) continue;
      if (k1 > k2) continue;
      const pot = findCutSet(graph, k1, k2);
      if (pot != undefined) {
        potential.push(pot);
        break;
      }
    }
    if (potential.length > 500) break;
  }
  const eCount: Record<string, Record<string, number>> = {};
  const pot2 = potential.flat();
  const max: [string, string, number][] = [];
  for (const e of pot2) {
    const _a = e[0] < e[1] ? e[0] : e[1];
    const _b = e[0] < e[1] ? e[1] : e[0];
    if (eCount[_a] == undefined) eCount[_a] = {};
    if (eCount[_a][_b] == undefined) eCount[_a][_b] = 0;
    eCount[_a][_b]++;
  }
  for (const k1 of keys) {
    for (const k2 of keys) {
      if (k1 == k2) continue;
      if (k1 > k2) continue;
      if (eCount[k1] == undefined) continue;
      if (eCount[k1][k2] == undefined) continue;
      max.push([k1, k2, eCount[k1][k2]]);
    }
  }

  max.sort((a, b) => b[2] - a[2]);
  const top = max.slice(0, 3);
  for (const e of top) {
    for (const i of [0, 1]) {
      const ind = graph[e[i]].indexOf(e[(i + 1) % 2] as string);
      graph[e[i]] = graph[e[i]]
        .slice(0, ind)
        .concat(graph[e[i]].slice(ind + 1));
    }
  }

  console.log(size(graph, top[0][0]) * size(graph, top[0][1]))
}

export async function taskTwo(input: string[]): Promise<void> {
  console.log("Unimplemented");
}

function findCutSet(graph: Record<string, string[]>, s: string, t: string) {
  const moved: Record<string, Record<string, boolean>> = {};
  const potential: [string, string][] = [];
  function incCapa(a: string, b: string) {
    const _a = a < b ? a : b;
    const _b = a < b ? b : a;
    if (moved[_a] == undefined) moved[_a] = {};
    if (moved[_a][_b] == undefined) moved[_a][_b] = true;
    moved[_a][_b] = true;
  }
  function get(a: string, b: string) {
    const _a = a < b ? a : b;
    const _b = a < b ? b : a;
    if (moved[_a] == undefined) return false;
    if (moved[_a][_b] == undefined) return false;
    return moved[_a][_b];
  }
  const parent: Record<string, string>[] = [];
  for (let i = 0; i < 4; i++) {
    parent[i] = {};
    const queue: string[] = [s];
    while (queue.length > 0) {
      const q = queue.pop() as string;

      for (const n of graph[q]) {
        if (get(q, n) || parent[i][n] != undefined) continue;
        queue.push(n);
        parent[i][n] = q;
      }
    }
    let m = t;
    if (i < 3 && parent[i][m] == undefined) return undefined;
    if (i == 3) {
      if (parent[i][m] == undefined) break;
      else return undefined;
    }
    while (m != s) {
      const p = parent[i][m];
      incCapa(m, p);
      potential.push([m, p]);
      m = p;
    }
  }
  return potential;
}

function size(graph: Record<string, string[]>, s: string) {
  const queue: string[] = [s];
  const visited: Set<string> = new Set()
  while (queue.length > 0) {
    const q = queue.pop() as string;
    visited.add(q)
    for (const n of graph[q]) {
      if (visited.has(n)) continue;
      queue.push(n);
    }
  }
  return visited.size
}
