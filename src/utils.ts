import type { NativeStackScreenProps } from "@react-navigation/native-stack"

export const TIME_OF_DAY = {
  Morning: "Morning",
  Afternoon: "Afternoon",
  Evening: "Evening",
  Night: "Night",
}

type RootStackParamList = {
  Home: undefined
  TaskList: undefined
}

export type NavigatorProps = NativeStackScreenProps<
  RootStackParamList,
  "Home",
  "TaskList"
>

export const addNumbers = (...args: number[]): number => {
  return args.reduce(
    (runningTotal, currentValue) => runningTotal + currentValue,
    0,
  )
}
export const formatAMPM = (date: Date) => {
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let ampm = hours >= 12 ? "pm" : "am"
  hours = hours % 12
  hours = hours ? hours : 12
  minutes = +minutes.toString().padStart(2, "0")
  let strTime = hours + ":" + minutes + " " + ampm
  return strTime
}
