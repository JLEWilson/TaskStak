import {
  getTodaysTasks,
  getTasksForNow,
  getAllTasks,
} from "../models/Task.Server"
import type { AppDispatch } from "../../store"
import * as a from "../reducers/toDoListSlice"
import type { Task } from "../models/Task.Server"

// can maybe make this more pure
export const fetchData = () => {
  //CHANGE FROM ANY
  return async (dispatch: AppDispatch) => {
    //All Tasks
    dispatch(a.requestAllTasks())
    const allTasks = await getAllTasks()
    if (allTasks instanceof Error || allTasks === null) {
      // use default data maybe?
      dispatch(a.getAllTasksFailure(new Error("There are no tasks").message))
      return
    } else {
      dispatch(a.getAllTasksSuccess(allTasks))
    }
    //Daily Tasks
    dispatch(a.requestDailyToDoList())
    const dailyTasks = await getTodaysTasks(allTasks)
    if (dailyTasks instanceof Error || dailyTasks.length < 1) {
      dispatch(
        a.getDailyTasksFailure(
          new Error("There are no tasks for today").message,
        ),
      )
      return
    } else {
      dispatch(a.getDailyTasksSuccess(dailyTasks))
    }
    //Current Tasks
    dispatch(a.requestCurrentToDoList())
    const currentTasks = getTasksForNow(dailyTasks)
    if (currentTasks instanceof Error || dailyTasks.length < 1) {
      dispatch(
        a.getCurrentTasksFailure(
          new Error("There are no tasks scheduled for now").message,
        ),
      )
      return
    } else {
      dispatch(a.getCurrentTasksSuccess(currentTasks))
    }
    //Current Task
    dispatch(a.setCurrentTask(currentTasks[0]))
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