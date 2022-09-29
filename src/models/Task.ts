import A from "@react-native-async-storage/async-storage"

export type Task = {
  id: string
  description: string
  completed: boolean
  priority?: number
  timeOfDay?: string
  repeating: boolean
}

export const createTask = async (task: Task): Promise<void> => {
  try {
    return await A.setItem(task.id, JSON.stringify(task))
  } catch (err) {
    throw err
  }
}

export const getTask = async (id: Task["id"]): Promise<Task | null> => {
  try {
    const result = await A.getItem(id)
    if (result) {
      return JSON.parse(result) as Task
    }

    return null
  } catch (err) {
    throw err
  }
}

//Since this app is only a to do list, we can just grab everything from the database
//If I expand this app later I will abstract this further, use the keys to denote item types and use multiGet() instead
export const getAllTasks = async () => {
  try {
    const keys = await A.getAllKeys()
    const result = await A.multiGet(keys)
    const resultsWithValues: Task[] = []
    if (result && result.length >= 1) {
      result.map((req) =>
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
    return await A.removeItem(id)
  } catch (err) {
    throw err
  }
}
