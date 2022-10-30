import { useTheme } from "@react-navigation/native"
import React, { FC } from "react"
import { StyleSheet } from "react-native"
import { DayPicker } from "react-native-picker-weekday"

type WeekdaySelectProps = {
  setWeekdayFormData: (days: number[]) => void
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 30,
  },
  wrapper: {
    marginTop: -15,
  },
})

const WeekdaySelect: FC<WeekdaySelectProps> = ({ setWeekdayFormData }) => {
  const [weekdays, setWeekdays] = React.useState([-1])
  const { colors } = useTheme()
  React.useEffect(() => {
    setWeekdayFormData(weekdays)
  }, [weekdays])
  return (
    <DayPicker
      weekdays={weekdays}
      setWeekdays={setWeekdays}
      activeColor={colors.primary}
      textColor={colors.border}
      inactiveColor={colors.background}
      itemStyles={styles.item}
      wrapperStyles={styles.wrapper}
    />
  )
}

export default WeekdaySelect
