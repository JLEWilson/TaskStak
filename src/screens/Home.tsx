import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import { useSelector } from "react-redux"
import type { RootState, storeType } from "../../store"
import CurrentTask from "../components/CurrentTask"
import { setCurrentTask, setCurrentToDoList } from "../actions/index"
import { passOnTask, defaultTask, setTaskCompleted } from "../models/Task.Server"
import { current } from "@reduxjs/toolkit"

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
const HomeScreen: React.FC<HomeScreenProps> = ({ store }) => {
  const currentTask = useSelector((state: RootState) => state.currentTask)
  const currentTDL = useSelector((state: RootState) => state.currentToDoList)
  const displayTask = currentTask ? currentTask : defaultTask
  const { colors } = useTheme()

  const handleTaskCompleted = () => {
    setTaskCompleted(displayTask)
    const copy = currentTDL.splice(0, 1)
    setCurrentToDoList(store, copy)
    const tempTask = copy.length < 0 ? copy[0] : defaultTask
    setCurrentTask(store, tempTask)
  }
  const handleTaskPassed = () => {
    const newTaskList = passOnTask(currentTask, currentTDL)
    setCurrentToDoList(store, newTaskList)
    setCurrentTask(store, newTaskList[0])
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Home</Text>
      <CurrentTask task={displayTask} />
      <View>
        <Pressable onPress={() => handleTaskCompleted}>Completed</Pressable>
        <Pressable onPress={() => handleTaskPassed}>Pass</Pressable>
      </View>
    </View>
  )
}

export default HomeScreen
