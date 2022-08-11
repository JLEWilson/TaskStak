export const addNumbers = (...args: number[]): number => {
  return args.reduce(
    (runningTotal, currentValue) => runningTotal + currentValue,
    0,
  )
}
