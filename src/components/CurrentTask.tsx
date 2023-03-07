import React from "react"
import type { Task } from "../models/Task.Server"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { useTheme } from "@react-navigation/native"
import CurrentTaskSVG from "./CurrentTaskSVG"
import Button1SVG from "./Button1SVG"
import Button2SVG from "./Button2SVG"

const styles = StyleSheet.create({
  mainContainer: {
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginTop: 60,

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
  onPass: (task: Task) => void
  onComplete: (task: Task) => void
}
const CurrentTask: React.FC<CurrentTaskProps> = ({
  task,
  onPass,
  onComplete,
}) => {
  const { colors } = useTheme()
  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.taskContainer]}>
        <CurrentTaskSVG
          height={200}
          width={200}
          fill={colors.card}
          opacity={1}
          strokeWidth={0.233}
        />
        <Text style={[styles.text, { color: colors.text }]}>
          {task.description}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button1SVG
          height={100}
          width={100}
          fill={colors.card}
          margin={{ marginRight: 10 }}
          position={{ top: 0, right: 0, bottom: 0, left: 0 }}
          opacity={1}
          strokeWidth={0.233}
          onPress={onComplete}
          task={task}
        >
          <Text style={[styles.text, { color: colors.text, top: -60 }]}>
            Complete
          </Text>
        </Button1SVG>
        <Button2SVG
          height={100}
          width={100}
          fill={colors.card}
          margin={{ marginLeft: 10 }}
          position={{ top: 0, right: 0, bottom: 0, left: 0 }}
          opacity={1}
          strokeWidth={0.233}
          onPress={onPass}
          task={task}
        >
          <Text style={[styles.text, { color: colors.text, top: -60 }]}>
            Pass
          </Text>
        </Button2SVG>
      </View>
    </View>
  )
}

export default CurrentTask
