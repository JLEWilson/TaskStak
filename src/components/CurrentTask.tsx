import React from "react"
import type { Task } from "../models/Task.Server"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useTheme } from "@react-navigation/native"

const styles = StyleSheet.create({
  container: {},
  text: {},
})
type CurrentTaskProps = {
  task: Task
}
const CurrentTask: React.FC<CurrentTaskProps> = ({ task }) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, colors.border]}>
      <Text style={[styles.text, colors.text]}>{task.description}</Text>
    </View>
  )
}

export default CurrentTask
