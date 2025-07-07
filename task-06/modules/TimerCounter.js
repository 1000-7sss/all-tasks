import { Counter } from './Counter.js';

export class TimerCounter extends Counter {
  constructor(interval = 1000, min = 0, max = Infinity) {
    super(min, max);
    this.interval = interval;
    this.timer = null;
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.increment();
      console.log('Timer:', this.getValue());
    }, this.interval);
  }

  pause() {
    this.stop();
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
}
