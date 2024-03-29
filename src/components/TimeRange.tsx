import React from "react"
import { Text, StyleSheet, View, Pressable } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { formatAMPM } from "../utils"
import { useTheme } from "@react-navigation/native"
import type {
  EvtTypes,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker"
import { useFonts } from "expo-font"
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  button: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  text: {
    fontSize: 18,
  },
})
type TimeRangeProps = {
  setStartTimeFormInput: Function
  setEndTimeFormInput: Function
  defaultStartTime: string | null
  defaultEndTime: string | null
}

const TimeRange: React.FC<TimeRangeProps> = ({
  setStartTimeFormInput,
  setEndTimeFormInput,
  defaultStartTime,
  defaultEndTime,
}) => {
  const [fontsLoaded] = useFonts({
    "Averia-Libre": require("../../assets/fonts/AveriaLibre-Regular.ttf"),
  })
  const [startTime, setStartTime] = React.useState<Date>(
    defaultStartTime
      ? new Date(defaultStartTime)
      : new Date("01/01/2022 06:00 AM"),
  )
  const [showStart, setShowStart] = React.useState(false)
  const onStartTimeChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined,
  ) => {
    switch (event.type) {
      case "set":
        if (date) {
          setStartTime(date)
          setStartTimeFormInput(date.toString())
        }
        setShowStart(false)
        break
      default:
        console.log("nothing happening here")
    }
  }
  const [endTime, setEndTime] = React.useState<Date>(
    defaultEndTime ? new Date(defaultEndTime) : new Date("01/01/2022 10:00 PM"),
  )
  const [showEnd, setShowEnd] = React.useState(false)
  const onEndTimeChange = (
    event: DateTimePickerEvent,
    date?: Date | undefined,
  ) => {
    switch (event.type) {
      case "set":
        if (date) {
          setEndTime(date)
          setEndTimeFormInput(date.toString())
        }
        setShowEnd(false)
        break
      default:
        console.log("nothing happening here")
    }
  }
  const { colors } = useTheme()
  const startDisplay = formatAMPM(startTime)
  const endDisplay = formatAMPM(endTime)

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShowStart(true)}
        style={[
          styles.button,
          { backgroundColor: colors.notification, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: colors.text, fontFamily: "Averia-Libre" },
          ]}
        >
          {startDisplay}
        </Text>
      </Pressable>
      <Text style={[styles.text, { color: colors.text }]}> to </Text>
      <Pressable
        onPress={() => setShowEnd(true)}
        style={[
          styles.button,
          { backgroundColor: colors.notification, borderColor: colors.border },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: colors.text, fontFamily: "Averia-Libre" },
          ]}
        >
          {endDisplay}
        </Text>
      </Pressable>
      {showStart && (
        <DateTimePicker
          mode="time"
          value={startTime}
          onChange={onStartTimeChange}
        />
      )}
      {showEnd && (
        <DateTimePicker mode="time" value={endTime} onChange={onEndTimeChange} />
      )}
    </View>
  )
}

export default TimeRange
