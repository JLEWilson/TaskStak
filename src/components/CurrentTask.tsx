import React from "react"
import type { Task } from "../models/Task.Server"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useTheme } from "@react-navigation/native"

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    width: 130,
    borderRadius: 50,
    elevation: 3,
    marginTop: 15,
    marginHorizontal: 15,
  },
  mainContainer: {
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    width: 200,
    height: 100,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
  },
})
type CurrentTaskProps = {
  task: Task
  onPass: () => void
  onComplete: () => void
}
const CurrentTask: React.FC<CurrentTaskProps> = ({
  task,
  onPass,
  onComplete,
}) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.taskContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.text, { color: colors.text }]}>
          {task.description}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={() => onComplete()}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text>Complete</Text>
        </Pressable>
        <Pressable
          onPress={() => onPass()}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text>Pass</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default CurrentTask
