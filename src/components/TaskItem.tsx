import React from "react"
import { View, StyleSheet, Pressable } from "react-native"
import type { Task } from "../models/Task.Server"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"
import StyledText from "./StyledText"
import EditSVG from "../SVGS/EditSVG"

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    padding: 10,
    borderRadius: 30,
    borderWidth: 0.75,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 20,
    fontSize: 20,
  },
  edit: {
    marginLeft: "auto",
    padding: 10,
    zIndex: 0.5,
  },
})
type TaskItemProps = {
  task: Task
  setModalVisible: (bool: boolean) => void
  setTaskToEdit: (task: Task) => void
}
const TaskItem: React.FC<TaskItemProps> = ({
  task,
  setModalVisible,
  setTaskToEdit,
}) => {
  const handleEditTask = () => {
    setTaskToEdit(task)
    setModalVisible(true)
  }
  const { colors } = useTheme()
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.card, borderColor: colors.border },
      ]}
    >
      <StyledText style={[styles.text, { color: colors.text }]}>
        {task.description}
      </StyledText>
      <Pressable
        style={styles.edit}
        onPress={() => {
          handleEditTask()
        }}
      >
        <EditSVG
          width={30}
          height={20}
          viewBox="0 0 154 110"
          fill={colors.border}
        />
      </Pressable>
    </View>
  )
}

export default TaskItem
