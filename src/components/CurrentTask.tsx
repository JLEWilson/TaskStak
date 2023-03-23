import React from "react"
import type { Task } from "../models/Task.Server"
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native"
import StyledText from "./StyledText"
import { useTheme } from "@react-navigation/native"

import ReusableSVG from "./ReusableSVG"
import DivSVG from "../SVGS/DivSVG"
import Button1SVG from "../SVGS/Button2SVG"
import Button2SVG from "../SVGS/Button2SVG"

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
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
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={styles.taskContainer}>
        <DivSVG
          fill={colors.card}
          stroke={colors.border}
          viewBox="-253 -175 1056 706"
        />
        <StyledText style={[styles.text, styles.primaryText]}>
          {task.description}
        </StyledText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onComplete(task)}>
          <Button1SVG
            height={100}
            width={150}
            style={styles.button}
            fill={colors.card}
            stroke={colors.border}
            viewBox="40 -50 175 220"
          />
          <StyledText
            style={[styles.text, styles.buttonText, { left: 35, top: 50 }]}
          >
            Complete
          </StyledText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPass(task)}>
          <Button2SVG
            height={100}
            width={150}
            style={styles.button}
            fill={colors.card}
            stroke={colors.border}
            viewBox="40 -50 175 220"
          />
          <StyledText
            style={[styles.text, styles.buttonText, { left: 60, top: 50 }]}
          >
            Pass
          </StyledText>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CurrentTask
