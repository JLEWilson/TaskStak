import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import {
  getTask,
  getTasksForNow,
  getTodaysTasks,
  Task,
} from "../models/Task.Server"
import CurrentTask from "../components/CurrentTask"
import { passOnTask, setTaskCompleted } from "../models/Task.Server"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { setCurrentTask, setCurrentTasks } from "../reducers/toDoListSlice"
import NoTasksMessage from "../components/NoTasksMessage"
import { RootState } from "../../store"
import { current } from "@reduxjs/toolkit"

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
  const isLoadingAllTasks = useAppSelector(
    (state: RootState) => state.todolist.isLoadingAllTasks,
  )
  const allTasks = useAppSelector((state: RootState) => state.todolist.allTasks)
  const currentToDoList = useAppSelector(
    (state: RootState) => state.todolist.currentToDoList,
  )
  const currentTask = useAppSelector(
    (state: RootState) => state.todolist.currentTask,
  )
  const error = useAppSelector((state: RootState) => state.todolist.error)
  const dispatch = useAppDispatch()
  const { colors } = useTheme()
  React.useEffect(() => {
    const tasksForToday = getTodaysTasks(allTasks)
    const tasksForNow = getTasksForNow(tasksForToday)
    dispatch(setCurrentTasks(tasksForNow))
  }, [allTasks])
  React.useEffect(() => {
    if (currentToDoList.length > 0) {
      dispatch(setCurrentTask(currentToDoList[0]))
    }
  }, [currentToDoList])
  const handleTaskCompleted = (task: Task) => {
    setTaskCompleted(task)
    const copy = [...currentToDoList]
    const tempTask = copy.shift()
    dispatch(setCurrentTasks(copy))
    dispatch(setCurrentTask(tempTask))
  }
  const handleTaskPassed = (task: Task) => {
    const newTaskList = passOnTask(task, [...currentToDoList])
    setCurrentTasks(newTaskList)
    const tempTask = newTaskList.shift()
    dispatch(setCurrentTask(tempTask))
  }
  if (isLoadingAllTasks) {
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
