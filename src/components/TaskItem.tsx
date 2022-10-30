import React from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import type { Task } from "../models/Task.Server"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    marginLeft: 20,
    fontSize: 20,
  },
  edit: {
    marginLeft: "auto",
    marginRight: 5,
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
  // CURRENTLY THIS IS NOT RUNNING
  const handleEditTask = () => {
    setTaskToEdit(task)
    setModalVisible(true)
  }
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.text, { color: colors.text }]}>
        {task.description}
      </Text>
      <Pressable
        style={styles.edit}
        onPress={() => {
          handleEditTask()
        }}
      >
        <Icon name="edit" size={30} />
      </Pressable>
    </View>
  )
}

export default TaskItem
