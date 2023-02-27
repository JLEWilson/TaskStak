import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import type { Task } from "../models/Task.Server"
import CurrentTask from "../components/CurrentTask"
import { passOnTask, setTaskCompleted } from "../models/Task.Server"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { setCurrentTask, setCurrentTasks } from "../reducers/toDoListSlice"
import NoTasksMessage from "../components/NoTasksMessage"
import { RootState } from "../../store"

const styles = StyleSheet.create({
  container: {
    display: "flex",
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

const HomeScreen = () => {
  const currentTask = useAppSelector(
    (state: RootState) => state.todolist.currentTask,
  )
  const currentToDoList = useAppSelector(
    (state: RootState) => state.todolist.currentToDoList,
  )
  const isLoadingAllTasks = useAppSelector(
    (state: RootState) => state.todolist.isLoadingAllTasks,
  )
  const isLoadingCurrentTasks = useAppSelector(
    (state: RootState) => state.todolist.isLoadingCurrent,
  )
  const isLoadingDailyTasks = useAppSelector(
    (state: RootState) => state.todolist.isLoadingDaily,
  )
  const error = useAppSelector((state: RootState) => state.todolist.error)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()

  const handleTaskCompleted = (task: Task) => {
    setTaskCompleted(task)
    if (currentToDoList.length <= 1) return
    const copy = [...currentToDoList]
    const tempTask = copy.shift()
    dispatch(setCurrentTasks(copy))
    dispatch(setCurrentTask(tempTask))
    console.log("complete")
    console.log("currentTask")
    console.log(currentTask)
  }
  const handleTaskPassed = (task: Task) => {
    const newTaskList = passOnTask(task, [...currentToDoList])
    setCurrentTasks(newTaskList)
    const tempTask = newTaskList.shift()
    dispatch(setCurrentTask(tempTask))
    console.log("passed")
  }
  // now we want to conditionally render based on state
  if (isLoadingAllTasks || isLoadingCurrentTasks || isLoadingDailyTasks) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    )
  }
  if (currentTask) {
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
  } else return <NoTasksMessage />
}

export default HomeScreen
