import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import { useSelector } from "react-redux"
import type { RootState, storeType } from "../../store"
import CurrentTask from "../components/CurrentTask"
import {
  getAllTasks,
  Task,
  defaultTask,
  setTaskCompleted,
} from "../models/Task.Server"

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
  const displayTask = currentTask ? currentTask : defaultTask
  const dispatch = store.dispatch
  const { colors } = useTheme()

  const handleTaskCompleted = () => {
    // will also need to reload the currentTasks list
    setTaskCompleted(displayTask)
  }
  const handleTaskPassed = () => {
    // will also need to reload the currentTasks list
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
