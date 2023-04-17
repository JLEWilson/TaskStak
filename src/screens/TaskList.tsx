import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native"
import NewTaskForm from "../components/NewTaskForm"
import Modal from "react-native-modal"
import React from "react"
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useAppSelector, useAppDispatch } from "../hooks/redux"
import { ToDoListState } from "../reducers/toDoListSlice"
import type { Task } from "../models/Task.Server"
import TaskItem from "../components/TaskItem"
import StyledText from "../components/StyledText"
import { useKeyboardVisible } from "../hooks/useKeyboardVisible"
import PlusSVG from "../SVGS/PlusSVG"
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 25,
  },
  add: {
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 100,

    padding: 10,
  },
  modal: {
    marginTop: 100,
    marginRight: 0,
    marginLeft: 0,
    marginBottom: 0,
    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 2,
    padding: 5,
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
  const isKeyboardVisible = useKeyboardVisible()
  const isLoadingAllTasks = useAppSelector(
    (state: { todolist: ToDoListState }) => state.todolist.isLoadingAllTasks,
  )
  const tasks = useAppSelector(
    (state: { todolist: ToDoListState }) => state.todolist.allTasks,
  )

  const [taskToEdit, setTaskToEdit] = React.useState<Task | undefined>(undefined)
  const handleNewTaskForm = () => {
    setModalVisible(true)
    setTaskToEdit(undefined)
  }
  const handleModalOutsidePress = () => {
    if (isKeyboardVisible) Keyboard.dismiss()
    setModalVisible(false)
  }
  if (isLoadingAllTasks) {
    return (
      <View>
        <StyledText>Loading...</StyledText>
      </View>
    )
  } else {
    return (
      <View
        style={styles.container}
        accessible={false}
        accessibilityLabel="container"
      >
        <StyledText style={[styles.header, { color: colors.text }]}>
          TaskList
        </StyledText>
        <Modal
          accessible={false}
          accessibilityLabel="Modal"
          onBackdropPress={() => handleModalOutsidePress()}
          backdropOpacity={0.3}
          animationIn={"bounceInUp"}
          animationInTiming={700}
          animationOut={"bounceOutDown"}
          animationOutTiming={700}
          style={[
            styles.modal,
            { backgroundColor: colors.border, borderColor: colors.border },
          ]}
          isVisible={isModalVisible}
        >
          <NewTaskForm
            setModalVisible={setModalVisible}
            taskToEdit={taskToEdit}
          ></NewTaskForm>
        </Modal>
        <ScrollView
          style={styles.taskContainer}
          accessible={false}
          accessibilityLabel="scrikk cibtauber"
        >
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
        <TouchableOpacity
          style={styles.add}
          onPress={() => handleNewTaskForm()}
          accessible={true}
          accessibilityLabel="open new task form"
        >
          <PlusSVG
            width={50}
            height={50}
            stroke={colors.border}
            strokeWidth={0}
            viewBox="-2 -2 40 40"
            fill={colors.primary}
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default TaskList
