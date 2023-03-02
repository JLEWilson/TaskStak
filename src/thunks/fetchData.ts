import {
  getTodaysTasks,
  getTasksForNow,
  getAllTasks,
} from "../models/Task.Server"
import type { AppDispatch } from "../../store"
import * as a from "../reducers/toDoListSlice"
import type { Task } from "../models/Task.Server"

// can maybe make this more pure
export const fetchAllTasks = () => {
  return async (dispatch: AppDispatch) => {
    dispatch(a.requestAllTasks())
    const allTasks = await getAllTasks()
    if (allTasks instanceof Error) {
      // use default data maybe?
      dispatch(a.getAllTasksFailure(allTasks.message))
      return
    } else {
      dispatch(a.getAllTasksSuccess(allTasks))
    }
  }
}
export const setCurrentTask = (nextTask: Task) => {
  return (dispatch: AppDispatch) => {
    dispatch(a.setCurrentTask(nextTask))
  }
}

export const setCurrentTasks = (taskList: Task[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(a.setCurrentTasks(taskList))
  }
}
