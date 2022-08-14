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
