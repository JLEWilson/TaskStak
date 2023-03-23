import { useTheme } from "@react-navigation/native"
import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { DayPicker } from "react-native-picker-weekday"
import type { Task } from "../models/Task.Server"
import { useFonts } from "expo-font"
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
  const [fontsLoaded] = useFonts({
    "Averia-Libre": require("../../assets/fonts/AveriaLibre-Regular.ttf"),
    "Averia-Libre-Bold": require("../../assets/fonts/AveriaLibre-Bold.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <DayPicker
      weekdays={weekdays}
      setWeekdays={setWeekdays}
      activeColor={colors.background}
      textColor={colors.border}
      inactiveColor={colors.primary}
      dayTextStyle={{ fontFamily: "Averia-Libre-Bold" }}
      itemStyles={styles.item}
      wrapperStyles={styles.wrapper}
    />
  )
}

export default WeekdaySelect
