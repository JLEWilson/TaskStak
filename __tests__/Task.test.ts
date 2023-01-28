import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Task } from "../src/models/Task.Server"
import { createTask, getTask, deleteTask } from "../src/models/Task.Server"
import { taskIdModifier } from "../src/models/Globals.Models"

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
      completed: false,
      description: "this is a task for testing",
      priority: false,
      repeating: false,
    }
    await AsyncStorage.setItem(
      taskIdModifier + myTask.id,
      JSON.stringify(myTask),
    )

    const result = await getTask(myTask.id)
    expect(result).toEqual(myTask)
  })
})
describe("createTask", () => {
  test("if no task exists, add the task", async () => {
    const myTask: Task = {
      id: "test_id",
      completed: false,
      description: "this is a task for testing",
      priority: false,
      repeating: false,
    }
    await createTask(myTask)

    const result = await getTask(myTask.id)
    expect(result).toEqual(myTask)
  })
})

describe("deleteTask", () => {
  test("if the task with that id exists in AsyncStorage, delete it", async () => {
    const myTask: Task = {
      id: "test_id",
      completed: false,
      description: "this is a task for testing",
      priority: false,
      repeating: false,
    }
    await createTask(myTask)

    const result = await getTask(myTask.id)
    expect(result).toEqual(myTask)

    deleteTask(myTask.id)

    const deletedResult = await getTask(myTask.id)
    expect(deletedResult).toEqual(null)
  })
})
