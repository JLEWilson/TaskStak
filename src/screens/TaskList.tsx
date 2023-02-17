import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import NewTaskForm, { RADIO_OPTIONS } from "../components/NewTaskForm"
import Modal from "react-native-modal"
import React from "react"
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { getAllTasks } from "../models/Task.Server"
import type { Task } from "../models/Task.Server"
import TaskItem from "../components/TaskItem"
import { storeType } from "../../store"
import { testStack } from "../models/Task.Server"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginTop: 25,
  },
  add: {
    position: "absolute",
    bottom: 8,
    left: 150,
    right: 150,
    backgroundColor: "blue",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  modal: {
    marginTop: 150,
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 2,
    padding: 0,
  },
  taskContainer: {
    marginTop: 5,
    marginBottom: 0,
  },
  task: {
    backgroundColor: "gray",
  },
})

const TaskList = () => {
  const { colors } = useTheme()
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [taskToEdit, setTaskToEdit] = React.useState<Task | undefined>(undefined)

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTasks()
      if (data) {
        setTasks(data)
      } else setTasks(testStack)
    }
    const data = fetchData().catch(console.error)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: colors.text }]}>TaskList</Text>
      <Modal
        style={[
          styles.modal,
          { backgroundColor: colors.primary, borderColor: colors.border },
        ]}
        isVisible={isModalVisible}
      >
        <NewTaskForm
          setModalVisible={setModalVisible}
          taskToEdit={taskToEdit}
        ></NewTaskForm>
      </Modal>
      <ScrollView style={styles.taskContainer}>
        {tasks &&
          tasks.map((task, index) => (
            <TaskItem
              task={task}
              key={index}
              setModalVisible={setModalVisible}
              setTaskToEdit={setTaskToEdit}
            />
          ))}
      </ScrollView>
      <Pressable style={styles.add} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="white" />
      </Pressable>
    </View>
  )
}

export default TaskList
