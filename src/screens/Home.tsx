import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import type { storeType } from "../../store"
import CurrentTask from "../components/CurrentTask"
import { passOnTask, defaultTask, setTaskCompleted } from "../models/Task.Server"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import {
  setCurrentTask,
  setCurrentTasks,
  ToDoListState,
} from "../reducers/toDoListSlice"

const styles = StyleSheet.create({
  container: {
    display: "flex",
    //flex: 1,
    flexDirection: "column",
  },
  buttonContainer: {
    display: "flex",
  },
  text: {
    textAlign: "center",
    marginTop: 25,
  },
})

type HomeScreenProps = {
  store: storeType
}
const HomeScreen: React.FC<HomeScreenProps> = () => {
  const currentTask = useAppSelector(
    (state: { todolist: ToDoListState }) => state.todolist.currentTask,
  )
  const currentToDoList = useAppSelector(
    (state: { todolist: ToDoListState }) => state.todolist.currentToDoList,
  )
  React.useEffect(() => {
    console.log(currentTask)
  }, [currentTask])
  const { colors } = useTheme()

  const handleTaskCompleted = () => {
    if (currentTask.id === defaultTask.id) return

    setTaskCompleted(currentTask)
    const copy = currentToDoList.splice(0, 1)
    setCurrentTasks(copy)
    const tempTask = copy.length < 0 ? copy[0] : defaultTask
    setCurrentTask(tempTask)
  }
  const handleTaskPassed = () => {
    if (currentTask.id === defaultTask.id) return

    const newTaskList = passOnTask(currentTask, currentToDoList)
    setCurrentTasks(newTaskList)
    setCurrentTask(newTaskList[0])
    console.log("actually passed")
  }
  // now we want to conditionally render based on state
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Home</Text>
      <CurrentTask
        task={currentTask}
        onPass={handleTaskPassed}
        onComplete={handleTaskCompleted}
      />
      <View></View>
    </View>
  )
}

export default HomeScreen
