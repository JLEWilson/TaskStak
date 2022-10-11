import React from "react"
import { View, StyleSheet, Text, Pressable } from "react-native"
import type { Task } from "../models/Task.Server"
import Icon from "react-native-vector-icons/MaterialIcons"

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 30,
    padding: 15,
    backgroundColor: "#2a2847",
    borderRadius: 30,
    display: "flex",
    flexDirection: "row",
  },
  text: {
    marginLeft: 20,
    color: "#8497cf",
    fontSize: 20,
  },
  edit: {
    backgroundColor: "red",
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
  let test = styles.edit
  return (
    <View style={styles.container}>
      <Text style={test}>{task.description}</Text>
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
