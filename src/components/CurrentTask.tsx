import React from "react"
import type { Task } from "../models/Task.Server"
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native"
import StyledText from "./StyledText"
import { useTheme } from "@react-navigation/native"

import DivSVG from "../SVGS/DivSVG"
import Button1SVG from "../SVGS/Button2SVG"
import Button2SVG from "../SVGS/Button2SVG"

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
  },
  taskContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
    padding: 3,
  },
  text: {
    position: "absolute",
  },
  primaryText: {
    fontSize: 22,
  },
  buttonText: {
    fontSize: 22,
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
    <View
      accessible={false}
      accessibilityLabel="Component Container"
      style={[styles.mainContainer, { backgroundColor: colors.background }]}
    >
      <View
        style={styles.taskContainer}
        accessible={false}
        accessibilityLabel="Contains the Task Element"
      >
        <DivSVG
          accessible={false}
          accessibilityLabel="Task Background"
          fill={colors.card}
          stroke={colors.border}
          strokeWidth={5}
          viewBox="-253 -175 1056 706"
        />
        <StyledText
          style={[styles.text, styles.primaryText, { color: colors.text }]}
        >
          {task.description}
        </StyledText>
      </View>
      <View
        style={styles.buttonContainer}
        accessible={false}
        accessibilityLabel="Button Positioning"
      >
        <TouchableOpacity
          onPress={() => onComplete(task)}
          accessible={true}
          accessibilityLabel="Complete Task"
          accessibilityHint="Marks the task as complete and either deletes it or moves it back onto the stack"
        >
          <Button1SVG
            height={100}
            width={150}
            style={styles.button}
            fill={colors.primary}
            strokeWidth={5}
            stroke={colors.border}
            viewBox="40 -50 175 220"
          />
          <StyledText
            style={[
              styles.text,
              styles.buttonText,
              { color: colors.notification, left: 35, top: 50 },
            ]}
          >
            Complete
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPass(task)}
          accessible={true}
          accessibilityLabel="Pass on Task"
          accessibilityHint="Moves task back onto the stack"
        >
          <Button2SVG
            height={100}
            width={150}
            style={styles.button}
            fill={colors.primary}
            strokeWidth={5}
            stroke={colors.border}
            viewBox="40 -50 175 220"
          />
          <StyledText
            style={[
              styles.text,
              styles.buttonText,
              { color: colors.notification, left: 60, top: 50 },
            ]}
          >
            Pass
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CurrentTask
