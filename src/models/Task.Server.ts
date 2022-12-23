import A from "@react-native-async-storage/async-storage"
import { taskIdModifier } from "./Globals.Models"

export type Task = {
  id: string
  description: string
  completed: boolean
  priority: boolean
  timeOfDay?: TimeOfDay
  repeating: boolean
  weekdays?: Array<number>
}
export type TimeOfDay = {
  startTime: Date
  endTime: Date
}
export const defaultTask: Task = {
  id: "default_task",
  description: "You have no tasks!",
  completed: false,
  priority: false,
  repeating: true,
}

export const createTask = async (task: Task): Promise<void> => {
  try {
    return await A.setItem(taskIdModifier + task.id, JSON.stringify(task))
  } catch (err) {
    throw err
  }
}

export const getTask = async (id: Task["id"]): Promise<Task | null> => {
  try {
    const result = await A.getItem(taskIdModifier + id)
    if (result) {
      return JSON.parse(result) as Task
    }

    return null
  } catch (err) {
    throw err
  }
}

export const getAllTasks = async () => {
  try {
    const keys = await A.getAllKeys()
    const taskKeys = keys.filter((key) => key.includes(taskIdModifier))
    console.log(taskKeys)
    const results = await A.multiGet(taskKeys)
    const resultsWithValues: Task[] = []
    if (results && results.length > 0) {
      results.map((req) =>
        req[1] ? resultsWithValues.push(JSON.parse(req[1]) as Task) : null,
      )
      return resultsWithValues
    }
    return null
  } catch (err) {
    throw err
  }
}

export const deleteTask = async (id: Task["id"]) => {
  try {
    return await A.removeItem(taskIdModifier + id)
  } catch (err) {
    throw err
  }
}

//The following functions are all about sorting

// Needs a function that sets completed to false the next day
export const getTodaysTasks = async () => {
  const tasks = await getAllTasks()
  //getDay is 0-6 Sun - Sat, WeekdayPicker is 1-7 Sun - Sat
  const today = new Date().getDay()
  const isForToday = (task: Task) => {
    return task.weekdays?.includes(today + 1) || task.repeating === false
  }
  return tasks?.filter(isForToday)
}

export const getTasksForNow = (tasks: Task[]) => {
  const now = new Date()
  const isInTimeRange = (task: Task) => {
    if (task.completed) return false
    if (task.timeOfDay === undefined) return true
    if (task.timeOfDay.startTime < now && task.timeOfDay.endTime > now)
      return true
    if (task.timeOfDay.endTime < now && task.priority) return true
    return false
  }
  return tasks.filter(isInTimeRange)
}
// change task to completed and then if the task is not repeating delete it
export const setTaskCompleted = (task: Task) => {
  task.completed = true
  return A.setItem(taskIdModifier + task.id, JSON.stringify(task))
}
