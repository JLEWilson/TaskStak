import {
  getTodaysTasks,
  getTasksForNow,
  getAllTasks,
  testStack,
} from "../models/Task.Server"
import * as a from "../actions/ActionTypes"
import type { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import type { Task } from "../models/Task.Server"
import type { AppDispatch } from "../../store"

const requestAllTasks = () => ({
  type: a.REQUEST_ALL_TASKS,
})
const getAllTasksSuccess = (allTasks: Task[]) => ({
  type: a.GET_ALL_TASKS_SUCCESS,
  allTasks,
})
const getAllTasksFailure = (error: Error) => ({
  type: a.GET_ALL_TASKS_FAILURE,
  error,
})
const requestDailyToDoList = () => ({
  type: a.REQUEST_DAILY_TO_DO_LIST,
})
const getDailyToDoListSuccess = (dailyTasks: Task[]) => ({
  type: a.GET_DAILY_TO_DO_LIST_SUCCESS,
  dailyTasks,
})
const getDailyToDoListFailure = (error: Error) => ({
  type: a.GET_DAILY_TO_DO_LIST_FAILURE,
  error,
})
const requestCurrentToDoList = () => ({
  type: a.REQUEST_DAILY_TO_DO_LIST,
})
const getCurrentToDoListSuccess = (currentTasks: Task[]) => ({
  type: a.GET_DAILY_TO_DO_LIST_SUCCESS,
  currentTasks,
})
const getCurrentToDoListFailure = (error: Error) => ({
  type: a.GET_DAILY_TO_DO_LIST_FAILURE,
  error,
})
const setCurrentTask = (task: Task) => ({
  type: a.SET_CURRENT_TASK,
  task,
})
export const fetchData = () => {
  //CHANGE FROM ANY
  return async (dispatch: AppDispatch) => {
    //All Tasks
    dispatch(requestAllTasks())
    const allTasks = await getAllTasks()
    if (allTasks instanceof Error || allTasks === null) {
      // use default data maybe?
      dispatch(getAllTasksFailure(new Error("There are no tasks")))
      return
    } else {
      dispatch(getAllTasksSuccess(allTasks))
    }
    //Daily Tasks
    dispatch(requestDailyToDoList())
    const dailyTasks = await getTodaysTasks(allTasks)
    if (dailyTasks instanceof Error || dailyTasks.length < 1) {
      dispatch(
        getDailyToDoListFailure(new Error("There are no tasks for today")),
      )
      return
    } else {
      dispatch(getDailyToDoListSuccess(dailyTasks))
    }
    //Current Tasks
    dispatch(requestCurrentToDoList())
    const currentTasks = getTasksForNow(dailyTasks)
    if (currentTasks instanceof Error || dailyTasks.length < 1) {
      dispatch(
        getCurrentToDoListFailure(
          new Error("There are no tasks scheduled for now"),
        ),
      )
      return
    } else {
      dispatch(getCurrentToDoListSuccess(currentTasks))
    }
    //Current Task
    dispatch(setCurrentTask(currentTasks[0]))
  }
}

// export const setCurrentTask = (store: ToolkitStore, nextTask: Task) => {
//   const action = {
//     type: a.setCurrentTask,
//     payload: nextTask,
//   }
//   store.dispatch(action)
// }

// export const setCurrentToDoList = (store: ToolkitStore, newTaskList: Task[]) => {
//   const action = {
//     type: a.setCurrentToDoList,
//     payload: newTaskList,
//   }
//   store.dispatch(action)
// }
