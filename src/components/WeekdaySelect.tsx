import { useTheme } from "@react-navigation/native"
import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { DayPicker } from "react-native-picker-weekday"
import type { Task } from "../models/Task.Server"

type WeekdaySelectProps = {
  setWeekdayFormData: (days: number[]) => void
  taskToEdit?: Task
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 3,
    elevation: 6,
  },
  wrapper: {
    marginTop: -25,
    marginBottom: -45,
    marginHorizontal: -40,
  },
})

const WeekdaySelect: FC<WeekdaySelectProps> = ({
  setWeekdayFormData,
  taskToEdit,
}) => {
  const [weekdays, setWeekdays] = React.useState(
    taskToEdit?.weekdays ? taskToEdit.weekdays : [-1],
  )
  const { colors } = useTheme()
  React.useEffect(() => {
    setWeekdayFormData(weekdays)
  }, [weekdays])
  return (
    <DayPicker
      weekdays={weekdays}
      setWeekdays={setWeekdays}
      activeColor={colors.background}
      textColor={colors.border}
      inactiveColor={colors.primary}
      itemStyles={styles.item}
      wrapperStyles={styles.wrapper}
    />
  )
}

export default WeekdaySelect
