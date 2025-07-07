export function formatValue(val) {
  return `Текущее значение: ${val}`;
}

export function validateStep(step) {
  return Number.isInteger(step) && step > 0;
}
