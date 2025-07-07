import { Counter } from './modules/Counter.js';
import { TimerCounter } from './modules/TimerCounter.js';
import { StepCounter } from './modules/StepCounter.js';
import { formatValue } from './modules/utils.js';

const base = new Counter(0, 10);
base.increment();
base.increment();
console.log(formatValue(base.getValue())); // 2

const timer = new TimerCounter(1000, 0, 5);
timer.start();

setTimeout(() => {
  timer.stop();
  console.log('Timer stopped at:', timer.getValue());
}, 6000);

const stepper = new StepCounter(2, 0, 10);
stepper.increment();
stepper.increment();
console.log('Stepper:', stepper.getValue()); // 4
