import React, { FC } from "react"
import { DayPicker } from "react-native-picker-weekday"

type WeekdaySelectProps = {
  setWeekdayFormData: (days: number[]) => void
}

const WeekdaySelect: FC<WeekdaySelectProps> = ({ setWeekdayFormData }) => {
  const [weekdays, setWeekdays] = React.useState([-1])
  // React.useEffect(() => {
  //   setWeekdayFormData(weekdays)
  // }, [weekdays])
  return (
    <DayPicker
      weekdays={weekdays}
      setWeekdays={setWeekdays}
      activeColor="violet"
      textColor="white"
      inactiveColor="grey"
    />
  )
}

export default WeekdaySelect
