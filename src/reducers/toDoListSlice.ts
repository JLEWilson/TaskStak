import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import type { Task } from "../models/Task.Server"

export interface ToDoListState {
  error: null | string
  isLoadingAllTasks: boolean
  allTasks: Task[]
  isLoadingDaily: boolean
  dailyToDoList: Task[]
  isLoadingCurrent: boolean
  currentToDoList: Task[]
  currentTask: Task | undefined
}

const initialState: ToDoListState = {
  error: null,
  isLoadingAllTasks: false,
  allTasks: [],
  isLoadingDaily: false,
  dailyToDoList: [],
  isLoadingCurrent: false,
  currentToDoList: [],
  currentTask: undefined,
}
type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never
}[keyof T]

export type ActionTypes = SliceActions<typeof toDoListSlice.actions>

export const toDoListSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {
    requestAllTasks: (state) => {
      return {
        ...state,
        isLoadingAllTasks: true,
      }
    },
    getAllTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      return {
        ...state,
        isLoadingAllTasks: false,
        allTasks: action.payload,
      }
    },
    getAllTasksFailure: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoadingAllTasks: false,
        error: action.payload,
      }
    },
    requestDailyToDoList(state) {
      return {
        ...state,
        isLoadingDaily: true,
      }
    },
    getDailyTasksSuccess(state, action: PayloadAction<Task[]>) {
      return {
        ...state,
        isLoadingDaily: false,
        dailyToDoList: action.payload,
      }
    },
    getDailyTasksFailure(state, action: PayloadAction<string>) {
      return {
        ...state,
        isLoadingDaily: false,
        error: action.payload,
      }
    },
    requestCurrentToDoList(state) {
      return {
        ...state,
        isLoadingCurrent: true,
      }
    },
    getCurrentTasksSuccess(state, action: PayloadAction<Task[]>) {
      return {
        ...state,
        isLoadingCurrent: false,
        currentToDoList: action.payload,
      }
    },
    getCurrentTasksFailure(state, action: PayloadAction<string>) {
      return {
        ...state,
        isLoadingCurrent: false,
        error: action.payload,
      }
    },
    setCurrentTasks(state, action: PayloadAction<Task[]>) {
      return {
        ...state,
        currentToDoList: action.payload,
      }
    },
    setCurrentTask(state, action: PayloadAction<Task | undefined>) {
      return {
        ...state,
        currentTask: action.payload,
      }
    },
  },
})

export const {
  requestAllTasks,
  getAllTasksSuccess,
  getAllTasksFailure,
  requestDailyToDoList,
  getDailyTasksSuccess,
  getDailyTasksFailure,
  requestCurrentToDoList,
  getCurrentTasksSuccess,
  getCurrentTasksFailure,
  setCurrentTasks,
  setCurrentTask,
} = toDoListSlice.actions

export default toDoListSlice.reducer
