import { ComplexNumber } from "./complex";
import { parseNumberList } from "./parse";

class Grid<T> {
  public grid : T[][];
  public rotation = new ComplexNumber(1,0);

  constructor(public width: number, public height: number, def: T) {
    this.grid = Array.from({length: width}, () => Array.from({length: height}, () => def))
  }

  public get(x: number, y: number) {
    const idx = this.getIdx(x, y)
    return this.grid[idx.x][idx.y]
  }

  public set(x: number, y: number, val: T) {
    const idx = this.getIdx(x, y)
    this.grid[idx.x][idx.y] = val 
  }

  public setAll(newGrid : T[][]) {
    this.grid = newGrid
    this.width = newGrid.length
    this.height = newGrid[0].length
  }

  public rotate(amount: -3|-2|-1|0|1|2|3|number) {
    if (amount == -3 || amount == 1) {
      this.rotation = this.rotation.mul(new ComplexNumber(0,1));
    }
    else if (amount == -1 || amount == 3) {
      this.rotation = this.rotation.mul(new ComplexNumber(0,-1));
    }
    else if (amount == -2 || amount == 2) {
      this.rotation = this.rotation.mul(new ComplexNumber(-1,0));
    }
    else if (amount != 0) {
      console.warn("Can not handle rotation value!")
    }
  }

  public getHeight() {
    if (this.rotation.imag != 0) {
      return this.width
    }
    return this.height
  }

  public getWidth() {
    if (this.rotation.imag != 0) {
      return this.height
    }
    return this.width
  }

  protected getIdx(x: number, y: number) {
    const idx = new ComplexNumber(x, y).mul(this.rotation)
    if (idx.real < 0) {
      idx.real = this.height - idx.real
    }
    if (idx.imag < 0) {
      idx.imag = this.width - idx.imag
    }
    return {x: idx.real, y: idx.imag}
  }
}

class NumGrid extends Grid<number> {
  constructor(width: number, height: number, def: number = 0) {
    super(width, height, def);
  }

  public setByLines(lines: string[], separator = '') {
    this.setAll(lines.map(i => parseNumberList(i, separator)))
  }
}

class CharGrid extends Grid<string> {
  constructor(width: number, height: number, def: string = ' ') {
    super(width, height, def);
  }

  public setByLines(lines: string[], separator = '') {
    this.setAll(lines.map(i => i.split(separator)))
  }
}

export { Grid, NumGrid, CharGrid }