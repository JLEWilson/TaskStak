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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Pressable onPress={() => handleFormReset()} style={styles.cancel}>
          <CloseSVG
            width={50}
            height={50}
            stroke={colors.border}
            strokeWidth={0}
            viewBox="-2 -2 40 40"
            fill={colors.primary}
          />
        </Pressable>
        {taskToEdit && (
          <Pressable onPress={() => handleDeleteTask()} style={styles.delete}>
            <TrashSVG
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
        <View style={styles.innerContainer}>
          <View style={{ marginTop: 15 }}>
            <StyledText style={[styles.label, { color: colors.text }]}>
              Description
            </StyledText>
            <TextInput
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
              onSubmitEditing={(e) => setDescription(e.nativeEvent.text)}
            />
          </View>
          <View style={styles.propertyContainer}>
            <StyledText style={[styles.label, { color: colors.text }]}>
              Priority
            </StyledText>
            <Switch
              thumbColor={colors.primary}
              trackColor={{ false: colors.notification, true: colors.primary }}
              value={priority}
              onValueChange={(value) => setPriority(value)}
            />
          </View>

          <View style={styles.propertyContainer}>
            <StyledText style={[styles.label, { color: colors.text }]}>
              Repeating
            </StyledText>
            <Switch
              thumbColor={colors.primary}
              trackColor={{ false: colors.notification, true: colors.primary }}
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
            <StyledText style={[styles.label, { color: colors.text }]}>
              TimeRange
            </StyledText>
            <Switch
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
          >
            <Button3SVG
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
