import {
  Pressable,
  Text,
  TextInput,
  View,
  Switch,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native"
import React from "react"
import { useAppDispatch } from "../hooks/redux"
import TimeRange from "./TimeRange"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"
import { deleteTask, updateTask, Task } from "../models/Task.Server"
import { createTask } from "../models/Task.Server"
import "react-native-get-random-values"
import { v4 as uuidv4 } from "uuid"
import WeekdaySelect from "./WeekdaySelect"
import type { TimeOfDay } from "../models/Task.Server"
import { fetchAllTasks } from "../thunks/fetchData"
import { useKeyboardVisible } from "../hooks/useKeyboardVisible"
import ReusableSVG from "./ReusableSVG"
interface TaskForm {
  setModalVisible: (bool: boolean) => void
  taskToEdit?: Task
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },
  header: {
    marginTop: 15,
    fontSize: 22,
  },
  propertyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "auto",
    marginTop: 25,
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 15,
  },
  label: {
    fontSize: 18,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: 60,
    width: 120,
    marginTop: "auto",
    marginBottom: 10,
  },
  buttonText: {
    position: "absolute",
    fontSize: 18,
  },
  cancel: {
    position: "absolute",
    left: 2,
    top: 2,
    padding: 5,
  },
  delete: {
    position: "absolute",
    right: 2,
    top: 2,
    padding: 5,
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
  textInput: {
    borderWidth: 3,
    width: 220,
    textAlign: "center",
  },
})
export const RADIO_OPTIONS = ["Any", "Morning", "Afternoon", "Evening", "Night"]
const TaskForm: React.FC<TaskForm> = ({ taskToEdit, setModalVisible }) => {
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  const [description, setDescription] = React.useState(
    taskToEdit ? taskToEdit?.description : "",
  )
  const [time, setTime] = React.useState(
    taskToEdit && taskToEdit.timeOfDay ? taskToEdit.timeOfDay : null,
  )
  const [startTime, setStartTime] = React.useState(time ? time.startTime : null)
  const [endTime, setEndTime] = React.useState(time ? time.endTime : null)
  const [priority, setPriority] = React.useState(
    taskToEdit ? taskToEdit.priority : false,
  )
  const [weekdays, setWeekdays] = React.useState(
    taskToEdit ? taskToEdit.weekdays : [-1],
  )
  const [isRepeating, setIsRepeating] = React.useState(
    taskToEdit ? taskToEdit.repeating : false,
  )
  const [isTimeRangeVisible, setTimeRangeVisible] = React.useState(
    taskToEdit && taskToEdit.timeOfDay ? true : false,
  )
  const isKeyboardVisible = useKeyboardVisible()

  const handleFormReset = () => {
    if (isKeyboardVisible) Keyboard.dismiss()
    setModalVisible(false)
    setIsRepeating(false)
    setTimeRangeVisible(false)
    setPriority(false)
  }

  const handleFormSubmit = async (
    databasePromise: (task: Task) => Promise<void>,
    task?: Task,
  ) => {
    const timeOfDayInput = isTimeRangeVisible
      ? ({
          startTime: startTime,
          endTime: endTime,
        } as TimeOfDay)
      : undefined

    const tempTask: Task = {
      id: task ? task.id : uuidv4(),
      description: description,
      completed: task ? task.completed : false,
      priority: priority,
      timeOfDay: timeOfDayInput,
      repeating: isRepeating,
      weekdays: weekdays,
    }

    await databasePromise(tempTask)
    dispatch(fetchAllTasks())
    handleFormReset()
  }

  const handleDeleteTask = async () => {
    if (!taskToEdit) return
    await deleteTask(taskToEdit.id)
    dispatch(fetchAllTasks())
    handleFormReset()
  }

  //There is the option of creating a custom component for this button, but I was unable how to figure out the onPress function as a paremeter
  const database = taskToEdit ? updateTask : createTask
  const buttonText = taskToEdit ? "Update Task" : "Create Task"
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { backgroundColor: colors.notification }]}>
        <Pressable onPress={() => handleFormReset()} style={styles.cancel}>
          <Icon name="close" color="#900" size={30} />
        </Pressable>
        {taskToEdit && (
          <Pressable onPress={() => handleDeleteTask()} style={styles.delete}>
            <Icon name="delete" color="#900" size={30} />
          </Pressable>
        )}
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
              onSubmitEditing={(e) => setDescription(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.propertyContainer}>
            <Text style={[styles.label, { color: colors.border }]}>
              Priority
            </Text>
            <Switch
              thumbColor={colors.primary}
              trackColor={{ false: colors.border, true: colors.primary }}
              value={priority}
              onValueChange={(value) => setPriority(value)}
            />
          </View>

          <View style={styles.propertyContainer}>
            <Text style={[styles.label, { color: colors.border }]}>
              Repeating
            </Text>
            <Switch
              thumbColor={colors.primary}
              trackColor={{ false: colors.border, true: colors.primary }}
              value={isRepeating}
              onValueChange={(value) => setIsRepeating(value)}
            />
          </View>
          <View style={{ marginTop: 0 }}>
            {isRepeating && (
              <WeekdaySelect
                setWeekdayFormData={setWeekdays}
                taskToEdit={taskToEdit}
              />
            )}
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
        {!isKeyboardVisible && (
          <TouchableOpacity
            onPress={() => handleFormSubmit(database, taskToEdit)}
            style={styles.button}
          >
            <ReusableSVG
              height={140}
              width={100}
              fill={colors.card}
              opacity={1}
              viewBox={"0 0 138.277 48.133"}
              offset={"-33.602 -61.691"}
              d={
                "M36.903 61.742c3.9-.238 127.925.381 131.645 1.42 3.72 1.037 4.342 43.77 1.775 45.773-2.568 2.004-127.703-.067-133.065.355-5.362.422-4.255-47.31-.355-47.548z"
              }
              strokeWidth={1}
              containerStyles={styles.button}
            >
              <Text style={[styles.buttonText, { color: colors.border }]}>
                {buttonText}
              </Text>
            </ReusableSVG>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
export default TaskForm
