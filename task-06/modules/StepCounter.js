import { Counter } from './Counter.js';

export class StepCounter extends Counter {
  constructor(step = 1, min = 0, max = Infinity) {
    super(min, max);
    this.step = step;
  }

  setStep(newStep) {
    this.step = newStep;
  }

  increment() {
    if (this.value + this.step <= this.max) {
      this.value += this.step;
    }
  }

  decrement() {
    if (this.value - this.step >= this.min) {
      this.value -= this.step;
    }
  }
}
