import {
  getTodaysTasks,
  getTasksForNow,
  getAllTasks,
} from "../models/Task.Server"
import * as a from "../actions/ActionTypes"
import type { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore"
import type { Task } from "../models/Task.Server"

export const fetchData = async (store: ToolkitStore) => {
  const allTasks = await getAllTasks()
  if (allTasks === null) return
  const dailyList = await getTodaysTasks(allTasks)
  if (dailyList === null) return
  const currList = getTasksForNow(dailyList)

  const currTask = currList[0]

  const action1 = {
    type: a.setTasks,
    payload: allTasks,
  }
  const action2 = {
    type: a.setDailyToDoList,
    payload: dailyList,
  }
  const action3 = {
    type: a.setCurrentToDoList,
    payload: currList,
  }
  const action4 = {
    type: a.setCurrentTask,
    payload: currTask,
  }
  store.dispatch(action1)
  store.dispatch(action2)
  store.dispatch(action3)
  store.dispatch(action4)
}

export const setCurrentTask = (store: ToolkitStore, nextTask: Task) => {
  const action = {
    type: a.setCurrentTask,
    payload: nextTask,
  }
  store.dispatch(action)
}

export const setCurrentToDoList = (store: ToolkitStore, newTaskList: Task[]) => {
  const action = {
    type: a.setCurrentToDoList,
    payload: newTaskList,
  }
  store.dispatch(action)
}
