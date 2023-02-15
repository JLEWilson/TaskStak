import {
  getTodaysTasks,
  getTasksForNow,
  getAllTasks,
} from "../models/Task.Server"
import type { AppDispatch } from "../../store"
import * as a from "../reducers/toDoListSlice"

export const fetchData = () => {
  //CHANGE FROM ANY
  return async (dispatch: AppDispatch) => {
    //All Tasks
    dispatch(a.requestAllTasks())
    const allTasks = await getAllTasks()
    if (allTasks instanceof Error || allTasks === null) {
      // use default data maybe?
      dispatch(a.getAllTasksFailure(new Error("There are no tasks")))
      return
    } else {
      dispatch(a.getAllTasksSuccess(allTasks))
    }
    //Daily Tasks
    dispatch(a.requestDailyToDoList())
    const dailyTasks = await getTodaysTasks(allTasks)
    if (dailyTasks instanceof Error || dailyTasks.length < 1) {
      dispatch(a.getDailyTasksFailure(new Error("There are no tasks for today")))
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
          new Error("There are no tasks scheduled for now"),
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
