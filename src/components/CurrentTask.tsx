import React from "react"
import type { Task } from "../models/Task.Server"
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import CurrentTaskSVG from "./CurrentTaskSVG"
import Button1SVG from "./Button1SVG"
import Button2SVG from "./Button2SVG"
import ReusableSVG from "./ReusableSVG"

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    marginTop: 100,
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
  buttonText: { fontSize: 18 },
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
      <ReusableSVG
        height={230}
        width={200}
        fill={colors.card}
        opacity={1}
        viewBox={"0 0 139.114 92.868"}
        offset={"-29.04 -37.553"}
        d={
          "M39.742 46.839c23.326-6.356 105.816-15.934 120.29-2.484 19.16 15.414-2.571 42.405 4.658 56.418 7.538 13.212.546 23.978-10.335 26.969-10.882 2.99-97.542 3.499-111.774 1.42-14.233-2.08-16.73-12.58-9.902-27.557 6.828-14.978 5.663-14.354-.566-27.799-6.23-13.444-.133-24.852 7.629-26.967z"
        }
        strokeWidth={1}
        containerStyles={styles.taskContainer}
      >
        <Text style={[styles.text, styles.primaryText]}>{task.description}</Text>
      </ReusableSVG>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => onComplete(task)}>
          <ReusableSVG
            height={130}
            width={200}
            fill={colors.card}
            opacity={1}
            viewBox={"0 0 85.031 36.64"}
            offset={"-63.633 -100.192"}
            d={
              "M71.677 106.097c11.387-8.95 57.578-7.02 69.194 1.064 11.615 8.084 8.77 15.303 1.064 23.42-7.706 8.116-65.16 8.177-72.387 1.064-7.227-7.113-9.257-16.598 2.13-25.548z"
            }
            strokeWidth={1}
            containerStyles={styles.button}
          >
            <Text style={[styles.text, styles.buttonText]}>Complete</Text>
          </ReusableSVG>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onPass(task)}>
          <ReusableSVG
            height={130}
            width={200}
            fill={colors.card}
            opacity={1}
            viewBox={"0 0 82.524 36.204"}
            offset={"-63.996 -99.823"}
            d={
              "M71.677 106.097c9.613-8.95 61.127-8.084 69.194 1.064 8.067 9.149 6.641 16.013 1.064 23.42-5.576 7.406-64.45 6.758-72.387 1.064-7.936-5.694-7.483-16.598 2.13-25.548z"
            }
            strokeWidth={1}
            containerStyles={styles.button}
          >
            <Text style={[styles.text, styles.buttonText]}>Pass</Text>
          </ReusableSVG>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CurrentTask
