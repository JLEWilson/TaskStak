import { Task } from "../models/Task.Server"
import { defaultState, RootState } from "../../store"
import { defaultTask } from "../models/Task.Server"
import * as c from "../actions/ActionTypes"
import type { Action } from "../actions/ActionTypes"

export const initialState: defaultState = {
  error: null,
  isLoadingAllTasks: false,
  allTasks: [],
  isLoadingDaily: false,
  dailyToDoList: [],
  isLoadingCurrent: false,
  currentToDoList: [],
  currentTask: defaultTask,
}

const toDoListReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case c.REQUEST_ALL_TASKS:
      return Object.assign({}, state, {
        isLoading: true,
      })
    case c.GET_ALL_TASKS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        allTasks: action.payload,
      })
    case c.GET_ALL_TASKS_FAILURE:
      return Object.assign({}, state, {
        isLoading: true,
        error: action.payload,
      })
    case c.REQUEST_DAILY_TO_DO_LIST:
      return Object.assign({}, state, {
        isLoadingDaily: true,
      })
    case c.GET_DAILY_TO_DO_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoadingDaily: false,
        dailyToDoList: action.payload,
      })
    case c.GET_DAILY_TO_DO_LIST_FAILURE:
      return Object.assign({}, state, {
        isLoadingDaily: false,
        error: action.payload,
      })
    case c.REQUEST_CURRENT_TO_DO_LIST:
      return Object.assign({}, state, {
        isLoadingCurrent: true,
      })
    case c.GET_CURRENT_TO_DO_LIST_SUCCESS:
      return Object.assign({}, state, {
        isLoadingCurrent: false,
        dailyToDoList: action.payload,
      })
    case c.GET_CURRENT_TO_DO_LIST_FAILURE:
      return Object.assign({}, state, {
        isLoadingCurrent: false,
        dailyToDoList: action.payload,
      })
    case c.SET_CURRENT_TASK:
      return Object.assign({}, state, {
        currentTask: action.payload,
      })
    default:
      return initialState
  }
}

export default toDoListReducer
