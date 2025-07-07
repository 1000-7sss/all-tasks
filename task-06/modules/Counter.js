export class Counter {
  constructor(min = 0, max = Infinity) {
    this.value = 0;
    this.min = min;
    this.max = max;
  }

  increment() {
    if (this.value < this.max) this.value++;
  }

  decrement() {
    if (this.value > this.min) this.value--;
  }

  reset() {
    this.value = 0;
  }

  getValue() {
    return this.value;
  }
}
