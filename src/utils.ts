import type { Task } from "./models/Task.Server"
export interface SVGProps {
  height: number
  width: number
  fill: string
  opacity: number
  strokeWidth: number
  margin?: {
    marginTop?: number
    marginRight?: number
    marginBottom?: number
    marginLeft?: number
  }
  position?: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }
  children?: React.ReactNode
}

export interface SVGButtonProps extends SVGProps {
  onPress: (task: Task) => void
  task: Task
}
export const addNumbers = (...args: number[]): number => {
  return args.reduce(
    (runningTotal, currentValue) => runningTotal + currentValue,
    0,
  )
}
// minutes returning NaN
export const formatAMPM = (date: Date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = +minutes.toString().padStart(2, "0")
  let strTime =
    minutes < 10
      ? hours + ":" + 0 + minutes.toString() + " " + ampm
      : hours + ":" + minutes + " " + ampm

  return strTime
}
