import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Task } from "../src/models/task"
import { TIME_OF_DAY } from "../src/utils"
import { createTask, getTask, deleteTask } from "../src/models/task"

beforeEach(async () => {
  await AsyncStorage.clear()
})

describe("getTask", () => {
  test("if no result exists at key, return null", async () => {
    const result = await getTask("fakekey")
    expect(result).toEqual(null)
  })

  test("returns a task by id", async () => {
    const myTask: Task = {
      id: "test_id",
      description: "this is a task for testing",
      priority: 1,
      timeOfDay: TIME_OF_DAY.Morning,
    }
    const taskString = JSON.stringify(myTask)
    await AsyncStorage.setItem(myTask.id, taskString)

    const result = await getTask(myTask.id)
    expect(result).toEqual(myTask)
  })
})
describe("createTask", () => {})
describe("deleteTask", () => {})
