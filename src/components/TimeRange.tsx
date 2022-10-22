import React from "react"
import { Text, StyleSheet, View } from "react-native"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import { formatAMPM } from "../utils"
import type {
  EvtTypes,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
})

const TimeRange = () => {
  const [startTime, setStartTime] = React.useState<Date>(
    new Date("01/01/2022 06:00 AM"),
  )
  const onStartTimeChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined,
  ) => {
    switch (event.type) {
      case "set":
        if (date) setStartTime(date)
        break
      default:
        console.log("nothing happening here")
    }
  }
  const [endTime, setEndTime] = React.useState<Date>(
    new Date("01/01/2022 10:00 PM"),
  )
  const onEndTimeChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined,
  ) => {
    switch (event.type) {
      case "set":
        if (date) setEndTime(date)
        break
      default:
        console.log("nothing happening here")
    }
  }
  const startDisplay = formatAMPM(startTime)
  const endDisplay = formatAMPM(endTime)

  return (
    <View>
      <Text style={{ color: "white" }}>
        {startDisplay} - {endDisplay}
      </Text>
      <RNDateTimePicker
        mode="time"
        value={startTime}
        onChange={onStartTimeChange}
      />
      <RNDateTimePicker mode="time" value={endTime} onChange={onEndTimeChange} />
    </View>
  )
}

export default TimeRange
