import {
  Pressable,
  Text,
  TextInput,
  View,
  Switch,
  StyleSheet,
} from "react-native"
import React from "react"
import MultiSlider from "@ptomasroos/react-native-multi-slider"
import Radio from "./Radio"
import Icon from "react-native-vector-icons/MaterialIcons"
import { useTheme } from "@react-navigation/native"
import type { Task } from "../models/Task"
import { createTask } from "../models/Task"
import { v4 as uuidv4 } from "uuid"

interface NewTaskFormProps {
  setModalVisible: (bool: boolean) => void
}
const styles = StyleSheet.create({
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
export const RADIO_OPTIONS = ["Any", "Morning", "Afternoon", "Evening", "Night"]
const NewTaskForm: React.FC<NewTaskFormProps> = (props) => {
  const { colors } = useTheme()
  const [description, setDescription] = React.useState("Task To Do")
  const [checked, setChecked] = React.useState(0)
  const [radioInput, setRadioInput] = React.useState("Any")
  const [priority, setPriority] = React.useState(0)
  const [isRepeating, setIsRepeating] = React.useState(true)
  const [isRadioVisible, setRadioVisible] = React.useState(false)
  const [isPriorityVisible, setPriorityVisible] = React.useState(false)

  const formResetHandler = () => {
    props.setModalVisible(false)
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
    <View>
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
    </View>
  )
}
export default NewTaskForm
