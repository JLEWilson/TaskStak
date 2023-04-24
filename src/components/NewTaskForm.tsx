import {
  Pressable,
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
import StyledText from "./StyledText"
import TrashSVG from "../SVGS/TrashSVG"
import CloseSVG from "../SVGS/CloseSVG"
import Button3SVG from "../SVGS/Button3SVG"
import { useFonts } from "expo-font"
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
    marginTop: 30,
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
  const [fontsLoaded] = useFonts({
    "Averia-Libre": require("../../assets/fonts/AveriaLibre-Regular.ttf"),
  })
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
    <TouchableWithoutFeedback
      onPress={() => Keyboard.dismiss()}
      accessible={true}
      accessibilityLabel="Returns to Task List"
      accessibilityHint="Click outside of the Modal as an alternative way to close the form"
    >
      <View
        style={[styles.container, { backgroundColor: colors.background }]}
        accessible={false}
        accessibilityLabel="Form Parent"
      >
        <Pressable
          onPress={() => handleFormReset()}
          style={styles.cancel}
          accessible={true}
          accessibilityLabel="Close Form"
          accessibilityHint="Closes the task form and returns to the task lsit"
        >
          <CloseSVG
            accessible={false}
            accessibilityLabel="svg image"
            width={50}
            height={50}
            stroke={colors.border}
            strokeWidth={0}
            viewBox="-2 -2 40 40"
            fill={colors.primary}
          />
        </Pressable>
        {taskToEdit && (
          <Pressable
            onPress={() => handleDeleteTask()}
            style={styles.delete}
            accessible={true}
            accessibilityLabel="Delete Task"
            accessibilityHint="Deletes the Task"
          >
            <TrashSVG
              accessible={false}
              accessibilityLabel="Delete Task SVG"
              fill={colors.primary}
              stroke={colors.border}
              width={50}
              height={50}
              strokeWidth={2}
              viewBox="-10 0 75 85"
            />
          </Pressable>
        )}
        <StyledText style={[styles.header, { color: colors.text }]}>
          Task Details
        </StyledText>
        <View
          style={styles.innerContainer}
          accessible={false}
          accessibilityLabel="Task Parameters Container"
        >
          <View
            style={{ marginTop: 15 }}
            accessible={false}
            accessibilityLabel="Header Container"
            accessibilityHint="Marks the task as complete and either deletes it or moves it back onto the stack"
          >
            <StyledText style={[styles.label, { color: colors.text }]}>
              Description
            </StyledText>
            <TextInput
              accessible={true}
              accessibilityLabel="Input for Task Description"
              accessibilityHint="Enter what you want your task to say"
              style={[
                styles.textInput,
                {
                  backgroundColor: colors.notification,
                  borderColor: colors.border,
                  color: colors.text,
                  fontFamily: fontsLoaded ? "Averia-Libre" : undefined,
                },
              ]}
              defaultValue={description}
              maxLength={20}
              onEndEditing={(e) => setDescription(e.nativeEvent.text)}
              onSubmitEditing={(e) => setDescription(e.nativeEvent.text)}
            />
          </View>
          <View
            style={styles.propertyContainer}
            accessible={false}
            accessibilityLabel="Property Container"
          >
            <StyledText style={[styles.label, { color: colors.text }]}>
              Priority
            </StyledText>
            <Switch
              accessible={true}
              accessibilityLabel="Mark Task As Priority"
              accessibilityHint="True or False"
              thumbColor={colors.primary}
              trackColor={{ false: colors.notification, true: colors.primary }}
              value={priority}
              onValueChange={(value) => setPriority(value)}
            />
          </View>
          <View
            style={styles.propertyContainer}
            accessible={false}
            accessibilityLabel="Property Container"
          >
            <StyledText style={[styles.label, { color: colors.text }]}>
              Repeating
            </StyledText>
            <Switch
              accessible={true}
              accessibilityLabel="Mark Task as Repeating"
              accessibilityHint="Select which days the task is to be repeated on"
              thumbColor={colors.primary}
              trackColor={{ false: colors.notification, true: colors.primary }}
              value={isRepeating}
              onValueChange={(value) => setIsRepeating(value)}
            />
          </View>
          <View
            style={{ marginTop: 0 }}
            accessible={false}
            accessibilityLabel="extra view for positioning of element"
          >
            {isRepeating && (
              <WeekdaySelect
                setWeekdayFormData={setWeekdays}
                taskToEdit={taskToEdit}
              />
            )}
          </View>
          <View
            style={styles.propertyContainer}
            accessible={false}
            accessibilityLabel="Property Container"
          >
            <StyledText style={[styles.label, { color: colors.text }]}>
              TimeRange
            </StyledText>
            <Switch
              accessible={true}
              accessibilityLabel="Does the task have a time range?"
              accessibilityHint="True or False to select the time range"
              thumbColor={colors.primary}
              trackColor={{ false: colors.notification, true: colors.primary }}
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
            accessible={true}
            accessibilityLabel="Submit"
            accessibilityHint="Finish editing task and add it onto the stack"
          >
            <Button3SVG
              accessible={false}
              accessibilityLabel="Button SVG"
              fill={colors.primary}
              width={250}
              height={60}
              viewBox={"4.6 00 25 50"}
              stroke={colors.border}
              strokeWidth={3}
            />
            <StyledText
              style={[styles.buttonText, { color: colors.notification }]}
            >
              {buttonText}
            </StyledText>
          </TouchableOpacity>
        )}
      </View>
    </TouchableWithoutFeedback>
  )
}
export default TaskForm
