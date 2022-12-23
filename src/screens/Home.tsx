import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import { useSelector } from "react-redux"
import type { RootState, storeType } from "../../store"
import CurrentTask from "../components/CurrentTask"
import { getAllTasks, Task, defaultTask } from "../models/Task.Server"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
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
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Home</Text>
      <CurrentTask task={displayTask} />
    </View>
  )
}

export default HomeScreen
