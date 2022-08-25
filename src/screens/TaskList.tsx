import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Switch,
} from "react-native"
import Modal from "react-native-modal"
import React from "react"
import { v4 as uuidv4 } from "uuid"
import type { NavigatorProps } from "../utils"
import { useTheme } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import Radio from "../components/Radio"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import { createTask } from "../models/task"
import type { Task } from "../models/task"
import { create } from "react-test-renderer"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    textAlign: "center",
    marginTop: 25,
  },
  text: {
    textAlign: "center",
  },
  button: {
    marginTop: "auto",
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(150, 150, 200)",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  cancel: {
    marginLeft: 5,
    marginTop: 5,
    marginRight: "auto",
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
  textInput: {
    borderWidth: 3,
  },
})
const RADIO_OPTIONS = ["Any", "Morning", "Afternoon", "Evening", "Night"]
const TaskList = ({ navigation }: NavigatorProps) => {
  const { colors } = useTheme()
  const [description, setDescription] = React.useState("Task To Do")
  const [checked, setChecked] = React.useState(0)
  const [radioInput, setRadioInput] = React.useState("Any")
  const [priority, setPriority] = React.useState(0)
  const [isModalVisible, setModalVisible] = React.useState(false)
  const [isRepeating, setIsRepeating] = React.useState(true)
  const [isRadioVisible, setRadioVisible] = React.useState(false)
  const [isPriorityVisible, setPriorityVisible] = React.useState(false)

  const formResetHandler = () => {
    // Clean this by using a Reducer
    setModalVisible(false)
    setIsRepeating(true)
    setRadioVisible(false)
    setChecked(0)
    setPriorityVisible(false)
    setPriority(0)
  }
  const formSubmitHandler = () => {
    const timeOfDayInput = isRadioVisible ? radioInput : undefined
    const priorityInput = isPriorityVisible ? priority : undefined

    const task: Task = {
      id: uuidv4(),
      description: description,
      completed: false,
      priority: priorityInput,
      timeOfDay: timeOfDayInput,
      repeating: isRepeating,
    }
    createTask(task)
    formResetHandler()
  }

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
        <Pressable onPress={() => formResetHandler()} style={styles.cancel}>
          <Icon name="close" color="#900" size={30} />
        </Pressable>
        <Text style={[styles.text, { color: colors.text }]}>Task Details</Text>
        <TextInput
          style={[styles.textInput, { borderColor: colors.border }]}
          defaultValue="Task To Do"
          onChangeText={(text) => setDescription(text)}
        />
        <View style={{ flexDirection: "row" }}>
          <Text>Time of Day</Text>
          <Switch
            value={isRadioVisible}
            onValueChange={(value) => setRadioVisible(value)}
          />
        </View>
        {isRadioVisible && (
          <Radio
            category="Time of Day"
            options={RADIO_OPTIONS}
            checked={checked}
            setChecked={setChecked}
            setRadioInput={setRadioInput}
          />
        )}
        <View style={{ flexDirection: "row" }}>
          <Text>Task Priority Level</Text>
          <Switch
            value={isPriorityVisible}
            onValueChange={(value) => setPriorityVisible(value)}
          />
        </View>
        {isPriorityVisible && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MultiSlider
              onValuesChange={(value) => setPriority(value[0])}
              min={0}
              max={10}
              step={1}
              sliderLength={200}
              markerStyle={{ width: 20, height: 20 }}
              pressedMarkerStyle={{ width: 30, height: 30 }}
              snapped={true}
            />
            <Text
              style={{
                backgroundColor: colors.notification,
                textAlign: "center",
                width: 30,
                height: 30,
                paddingTop: 5,
                borderRadius: 15,
              }}
            >
              {priority}
            </Text>
          </View>
        )}
        <View style={{ flexDirection: "row" }}>
          <Text>Repeat Task Daily</Text>
          <Switch
            value={isRepeating}
            onValueChange={(value) => setIsRepeating(value)}
          />
        </View>
        <Pressable style={styles.button} onPress={() => formSubmitHandler()}>
          <Text style={[styles.text, { color: colors.text }]}>Add new Task</Text>
        </Pressable>
      </Modal>
      <Pressable style={styles.add} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} />
      </Pressable>
    </View>
  )
}

export default TaskList
