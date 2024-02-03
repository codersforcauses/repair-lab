export function randBetween(min: number, max: number): number {
  if (min >= max) throw new Error("Min value must be less than max value");
  return Math.random() * (max - min) + min;
}
