import {
  Pressable,
  Text,
  TextInput,
  View,
  Switch,
  StyleSheet,
} from "react-native"
import React from "react"
import { useAppDispatch } from "../hooks/redux"
import TimeRange from "./TimeRange"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"
import { getAllTasks, Task } from "../models/Task.Server"
import { createTask } from "../models/Task.Server"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import WeekdaySelect from "./WeekdaySelect"
import type { TimeOfDay } from "../models/Task.Server"
import { fetchAllTasks } from "../thunks/fetchData"
import { AppDispatch } from "../../store"

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
    marginTop: 15,
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
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [description, setDescription] = React.useState(
    props.taskToEdit ? props.taskToEdit?.description : "Do The Dishes",
  )
  const [time, setTime] = React.useState(
    props.taskToEdit && props.taskToEdit.timeOfDay
      ? props.taskToEdit.timeOfDay
      : null,
  )
  const [startTime, setStartTime] = React.useState(
    time ? new Date(time.startTime) : null,
  )
  const [endTime, setEndTime] = React.useState(
    time ? new Date(time.endTime) : null,
  )
  const [priority, setPriority] = React.useState(
    props.taskToEdit ? props.taskToEdit.priority : false,
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

  const formResetHandler = () => {
    props.setModalVisible(false)
    setIsRepeating(false)
    setTimeRangeVisible(false)
    setPriority(false)
  }
  const formSubmitHandler = async (dispatch: AppDispatch) => {
    const timeOfDayInput = isTimeRangeVisible
      ? ({
          startTime: startTime?.toString(),
          endTime: endTime?.toString(),
        } as TimeOfDay)
      : undefined

    const task: Task = {
      id: uuidv4(),
      description: description,
      completed: false,
      priority: priority,
      timeOfDay: timeOfDayInput,
      repeating: isRepeating,
      weekdays: weekdays,
    }

    await createTask(task)
    dispatch(fetchAllTasks())
    formResetHandler()
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.notification }]}>
      <Pressable onPress={() => formResetHandler()} style={styles.cancel}>
        <Icon name="close" color="#900" size={30} />
      </Pressable>
      <Text style={[styles.header, { color: colors.text }]}>Task Details</Text>
      <View style={styles.innerContainer}>
        <View style={{ marginTop: 15 }}>
          <Text style={[styles.label, { color: colors.border }]}>
            Description
          </Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: colors.primary }]}
            defaultValue={description}
            maxLength={20}
            onChangeText={(text) => setDescription(text)}
          />
        </View>
        <View style={styles.propertyContainer}>
          <Text style={[styles.label, { color: colors.border }]}>Priority</Text>
          <Switch
            thumbColor={colors.primary}
            trackColor={{ false: colors.border, true: colors.primary }}
            value={priority}
            onValueChange={(value) => setPriority(value)}
          />
        </View>

        <View style={styles.propertyContainer}>
          <Text style={[styles.label, { color: colors.border }]}>Repeating</Text>
          <Switch
            thumbColor={colors.primary}
            trackColor={{ false: colors.border, true: colors.primary }}
            value={isRepeating}
            onValueChange={(value) => setIsRepeating(value)}
          />
        </View>
        <View style={{ marginTop: 0 }}>
          {isRepeating && <WeekdaySelect setWeekdayFormData={setWeekdays} />}
        </View>
        <View style={styles.propertyContainer}>
          <Text style={[styles.label, { color: colors.text }]}>TimeRange</Text>
          <Switch
            thumbColor={colors.primary}
            trackColor={{ false: colors.border, true: colors.primary }}
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
      </View>
      <Pressable
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => formSubmitHandler(dispatch)}
      >
        <Text style={[styles.buttonText, { color: colors.border }]}>
          Add new Task
        </Text>
      </Pressable>
    </View>
  )
}
export default TaskForm
