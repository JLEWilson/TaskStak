import {
  Pressable,
  Text,
  TextInput,
  View,
  Switch,
  StyleSheet,
} from "react-native"
import React from "react"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import TimeRange from "./TimeRange"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"
import type { Task } from "../models/Task.Server"
import { createTask } from "../models/Task.Server"
import { v4 as uuidv4 } from "uuid"
import WeekdaySelect from "./WeekdaySelect"
import type { TimeOfDay } from "../models/Task.Server"

interface TaskFormProps {
  setModalVisible: (bool: boolean) => void
  taskToEdit?: Task
}
const styles = StyleSheet.create({
  header: {
    marginVertical: 10,
    fontSize: 20,
  },
  propertyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "auto",
  },
  innerContainer: {
    marginVertical: "auto",
    display: "flex",
    height: "100%",
    width: "70%",
  },
  label: {
    fontSize: 18,
  },
  button: {
    marginTop: "auto",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(150, 150, 200)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
  },
  cancel: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  add: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  textInput: {
    borderWidth: 3,
    width: 220,
    textAlign: "center",
  },
})
export const RADIO_OPTIONS = ["Any", "Morning", "Afternoon", "Evening", "Night"]
const TaskForm: React.FC<TaskFormProps> = (props) => {
  const { colors } = useTheme()
  const [description, setDescription] = React.useState(
    props.taskToEdit ? props.taskToEdit?.description : "Do The Dishes",
  )
  const [time, setTime] = React.useState(
    props.taskToEdit && props.taskToEdit.timeOfDay
      ? props.taskToEdit.timeOfDay
      : null,
  )
  const [startTime, setStartTime] = React.useState(time ? time.startTime : null)
  const [endTime, setEndTime] = React.useState(time ? time.endTime : null)
  const [priority, setPriority] = React.useState(
    props.taskToEdit?.priority !== undefined
      ? props.taskToEdit.priority
      : undefined,
  )
  const [weekdays, setWeekdays] = React.useState(
    props.taskToEdit ? props.taskToEdit.weekdays : [-1],
  )
  const [isRepeating, setIsRepeating] = React.useState(
    props.taskToEdit ? props.taskToEdit.repeating : false,
  )
  const [isTimeRangeVisible, setTimeRangeVisible] = React.useState(
    props.taskToEdit && props.taskToEdit.timeOfDay ? true : false,
  )
  const [isPriorityVisible, setPriorityVisible] = React.useState(
    props.taskToEdit && props.taskToEdit.priority !== undefined ? true : false,
  )

  const formResetHandler = () => {
    props.setModalVisible(false)
    setIsRepeating(true)
    setTimeRangeVisible(false)
    setPriorityVisible(false)
    setPriority(0)
  }
  const formSubmitHandler = () => {
    const timeOfDayInput = isTimeRangeVisible
      ? ({ startTime: startTime, endTime: endTime } as TimeOfDay)
      : undefined
    const priorityInput = isPriorityVisible ? priority : undefined

    const task: Task = {
      id: uuidv4(),
      description: description,
      completed: false,
      priority: priorityInput,
      timeOfDay: timeOfDayInput,
      repeating: isRepeating,
      weekdays: weekdays,
    }
    createTask(task)
    formResetHandler()
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => formResetHandler()} style={styles.cancel}>
        <Icon name="close" color="#900" size={30} />
      </Pressable>
      <Text style={[styles.header, { color: colors.text }]}>Task Details</Text>
      <View style={styles.innerContainer}>
        <View>
          <Text style={[styles.label, { color: colors.text }]}>Description</Text>
          <TextInput
            style={[styles.textInput, { borderColor: colors.border }]}
            defaultValue={description}
            maxLength={20}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.propertyContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Time of Day</Text>
          <Switch
            value={isTimeRangeVisible}
            onValueChange={(value) => setTimeRangeVisible(value)}
          />
        </View>
        {isTimeRangeVisible && (
          <TimeRange
            setStartTimeFormInput={setStartTime}
            setEndTimeFormInput={setEndTime}
            defaultStartTime={startTime}
            defaultEndTime={endTime}
          />
        )}
        <View style={styles.propertyContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            Task Priority Level
          </Text>
          <Switch
            value={isPriorityVisible}
            onValueChange={(value) => setPriorityVisible(value)}
          />
        </View>
        {isPriorityVisible && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MultiSlider
              onValuesChange={(value) => setPriority(value[0])}
              values={priority ? [priority] : [0]}
              min={0}
              max={10}
              step={1}
              sliderLength={200}
              markerStyle={{ width: 20, height: 20 }}
              pressedMarkerStyle={{ width: 30, height: 30 }}
              snapped={true}
            />
            <Text
              style={{
                textAlign: "center",
                width: 30,
                height: 30,
                paddingTop: 5,
                borderRadius: 15,
              }}
            >
              {priority}
            </Text>
          </View>
        )}
        <View style={styles.propertyContainer}>
          <Text style={[styles.label, { color: colors.text }]}>
            Repeating Task
          </Text>
          <Switch
            value={isRepeating}
            onValueChange={(value) => setIsRepeating(value)}
          />
        </View>
        <View style={{ marginTop: 0 }}>
          {isRepeating && <WeekdaySelect setWeekdayFormData={setWeekdays} />}
        </View>
      </View>
      <Pressable style={styles.button} onPress={() => formSubmitHandler()}>
        <Text style={[styles.buttonText, { color: colors.text }]}>
          Add new Task
        </Text>
      </Pressable>
    </View>
  )
}
export default TaskForm
