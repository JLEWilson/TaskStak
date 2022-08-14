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
})
describe("createTask", () => {})
describe("deleteTask", () => {})
