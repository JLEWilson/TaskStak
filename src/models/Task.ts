import A from "@react-native-async-storage/async-storage"

export type Task = {
  id: string
  description: string
  priority?: number
  timeOfDay?: string
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

export const deleteTask = async (id: Task["id"]) => {
  try {
    return await A.removeItem(id)
  } catch (err) {
    throw err
  }
}
