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
  startTime: string
  endTime: string
}

export const defaultTask: Task = {
  id: "default_task",
  description: "You have no tasks!",
  completed: false,
  priority: false,
  repeating: true,
}
export const testStack: Task[] = [
  defaultTask,
  {
    id: "morning_1",
    description: "task2",
    completed: false,
    priority: true,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
  {
    id: "morning_2",
    description: "task3",
    completed: false,
    priority: true,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
  {
    id: "morning_3",
    description: "task4",
    completed: false,
    priority: true,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
  {
    id: "morning_4",
    description: "task5",
    completed: false,
    priority: false,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
  {
    id: "afternoon_1",
    description: "task6",
    completed: false,
    priority: false,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
  {
    id: "afternoon_2",
    description: "task7",
    completed: false,
    priority: false,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
  {
    id: "afternoon_3",
    description: "task8",
    completed: false,
    priority: true,
    timeOfDay: {
      startTime: new Date(0).toString(),
      endTime: new Date().toString(),
    },
    repeating: true,
  },
]
export const createTask = async (task: Task): Promise<void> => {
  try {
    return await A.setItem(taskIdModifier + task.id, JSON.stringify(task))
  } catch (err) {
    console.log(err)
  }
}

export const getTask = async (id: Task["id"]): Promise<Task | undefined> => {
  try {
    const result = await A.getItem(taskIdModifier + id)
    if (result) {
      return JSON.parse(result) as Task
    }
    return undefined
  } catch (err) {
    console.log(err)
  }
}

export const getAllTasks = async () => {
  try {
    const keys = await A.getAllKeys()
    const taskKeys = keys.filter((key) => key.includes(taskIdModifier))
    const results = await A.multiGet(taskKeys)
    const resultsWithValues: Task[] = []
    if (results) {
      results.map((req) =>
        req[1] ? resultsWithValues.push(JSON.parse(req[1]) as Task) : undefined,
      )
    }
    return resultsWithValues
  } catch (err) {
    console.log(err)
  }
}

export const deleteTask = async (id: Task["id"]) => {
  try {
    return await A.removeItem(taskIdModifier + id)
  } catch (err) {
    console.log(err)
  }
}

export const updateTask = async (task: Task) => {
  try {
    return await A.mergeItem(taskIdModifier + task["id"], JSON.stringify(task))
  } catch (err) {
    console.log(err)
  }
}
export const setTaskCompleted = async (task: Task) => {
  const updatedTask: Task = { ...task, completed: true }
  try {
    if (updatedTask.repeating) {
      return await A.setItem(
        taskIdModifier + task.id,
        JSON.stringify(updatedTask),
      )
    } else {
    }
    return await A.removeItem(updatedTask.id)
  } catch (err) {
    console.log(err)
  }
}
/*
 _________                   __   .__                  
 /   _____/  ____  _______ _/  |_ |__|  ____     ____  
 \_____  \  /  _ \ \_  __ \\   __\|  | /    \   / ___\ 
 /        \(  <_> ) |  | \/ |  |  |  ||   |  \ / /_/  >
/_______  / \____/  |__|    |__|  |__||___|  / \___  / 
        \/                                 \/ /_____/             
*/
export const getTodaysTasks = (tasks: Task[]) => {
  //getDay is 0-6 Sun - Sat, WeekdayPicker is 1-7 Sun - Sat
  const today = new Date().getDay()
  const isForToday = (task: Task) => {
    return task.weekdays?.includes(today + 1) || task.repeating === false
  }
  return tasks?.filter(isForToday)
}

export const getTasksForNow = (tasks: Task[]) => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  const isInTimeRange = (task: Task) => {
    if (task.completed) return false
    if (task.timeOfDay === undefined) return true
    const startTimeAsDate = new Date(task.timeOfDay.startTime)
    const startTime =
      startTimeAsDate.getHours() * 60 + startTimeAsDate.getMinutes()
    const endTimeAsDate = new Date(task.timeOfDay.endTime)
    const endTime = endTimeAsDate.getHours() * 60 + endTimeAsDate.getMinutes()

    if (startTime <= currentTime && endTime > currentTime) return true
    if (endTime < currentTime && task.priority) return true
  }
  return tasks.filter(isInTimeRange)
}

export const randomizeTasks = (tasks: Task[]) => {
  for (let i = tasks.length - 1; i > 0; i--) {
    let randomPos = Math.floor(Math.random() * (i + 1))
    let temp = tasks[i]
    tasks[i] = tasks[randomPos]
    tasks[randomPos] = temp
  }
  return tasks
}

export const passOnTask = (taskToPass: Task, tasks: Task[]) => {
  const task = (e: Task) => e.id === taskToPass.id
  const copy = [...tasks]
  const index = copy.findIndex(task)
  copy.splice(index, 1)
  const newList = randomizeTasks(copy)
  newList.push(taskToPass)
  return newList
}
