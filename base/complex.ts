class ComplexNumber {
  constructor(public real: number, public imag: number) {}
  add(that: ComplexNumber) {
    return new ComplexNumber(this.real + that.real, this.imag + that.imag);
  }
  sub(that: ComplexNumber|number) {
    if (typeof that === 'number') {
      return new ComplexNumber(this.real - that, this.imag);
    }
    return new ComplexNumber(this.real - that.real, this.imag - that.imag);
  }
  mul(that: ComplexNumber|number) {
    if (typeof that === 'number') {
      return new ComplexNumber(this.real * that, this.imag * that);
    }
    return new ComplexNumber(
      this.real * that.real - this.imag * that.imag,
      this.real * that.imag + this.imag * that.real
    );
  }
  div(that: ComplexNumber|number) {
    if (typeof that === 'number') {
      return new ComplexNumber(this.real / that, this.imag / that);
    }
    const r = that.real * that.real + that.imag * that.imag;
    return new ComplexNumber(
      (this.real * that.real + this.imag * that.imag) / r,
      (this.imag * that.real - this.real * that.imag) / r
    );
  }
  abs() {
    return Math.sqrt(this.real * this.real + this.imag * this.imag);
  }
  toString() {
    return `${this.real} ${this.imag >= 0 ? '+':'-'} ${Math.abs(this.imag)}i`;
  }
}

export { ComplexNumber };