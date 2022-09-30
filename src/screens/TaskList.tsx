import { View, Text, StyleSheet, Pressable } from "react-native"
import NewTaskForm, { RADIO_OPTIONS } from "../components/NewTaskForm"
import Modal from "react-native-modal"
import React from "react"
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { getAllTasks } from "../models/Task.Server"
import type { Task } from "../models/Task.Server"

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
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 150,
    marginHorizontal: 0,
    marginBottom: 0,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 2,
  },
  task: {
    backgroundColor: "gray",
  },
})

const testTasks: Task[] = [
  {
    id: "base",
    description: "task1",
    completed: false,
    timeOfDay: RADIO_OPTIONS[0],
    repeating: true,
  },
  {
    id: "morning_1",
    description: "task2",
    completed: false,
    timeOfDay: RADIO_OPTIONS[1],
    repeating: true,
  },
  {
    id: "morning_2",
    description: "task3",
    completed: false,
    timeOfDay: RADIO_OPTIONS[1],
    repeating: true,
  },
  {
    id: "morning_3",
    description: "task4",
    completed: false,
    priority: 1,
    timeOfDay: RADIO_OPTIONS[1],
    repeating: true,
  },
  {
    id: "morning_4",
    description: "task5",
    completed: false,
    priority: 2,
    timeOfDay: RADIO_OPTIONS[1],
    repeating: true,
  },
  {
    id: "afternoon_1",
    description: "task6",
    completed: false,
    timeOfDay: RADIO_OPTIONS[2],
    repeating: true,
  },
  {
    id: "afternoon_2",
    description: "task7",
    completed: false,
    timeOfDay: RADIO_OPTIONS[2],
    repeating: true,
  },
  {
    id: "afternoon_3",
    description: "task8",
    completed: false,
    timeOfDay: RADIO_OPTIONS[2],
    repeating: true,
  },
]
const TaskList = () => {
  const { colors } = useTheme()

  const [isModalVisible, setModalVisible] = React.useState(false)
  const [tasks, setTasks] = React.useState<Task[]>([])

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTasks()
      if (data) {
        setTasks(data)
      } else setTasks(testTasks)
    }
    const result = fetchData().catch(console.error)
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
        <NewTaskForm setModalVisible={setModalVisible}></NewTaskForm>
      </Modal>
      {tasks.map((task, index) => (
        <View key={task.id} style={styles.task}>
          <Text style={{ color: colors.text }}>{task.description}</Text>
        </View>
      ))}
      <Pressable style={styles.add} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} />
      </Pressable>
    </View>
  )
}

export default TaskList
