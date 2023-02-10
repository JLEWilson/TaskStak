import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import type { Task } from "../models/Task.Server"
import { defaultTask } from "../models/Task.Server"

export interface ToDoListState {
  error: null | Error
  isLoadingAllTasks: boolean
  allTasks: Task[]
  isLoadingDaily: boolean
  dailyToDoList: Task[]
  isLoadingCurrent: boolean
  currentToDoList: Task[]
  currentTask: Task
}

const initialState: ToDoListState = {
  error: null,
  isLoadingAllTasks: false,
  allTasks: [],
  isLoadingDaily: false,
  dailyToDoList: [],
  isLoadingCurrent: false,
  currentToDoList: [],
  currentTask: defaultTask,
}

export const toDoListSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {
    requestAllTasks: (state) => {
      state.isLoadingAllTasks = true
    },
    getAllTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.isLoadingAllTasks = false
      state.allTasks = action.payload
    },
    getAllTasksFailure: (state, action: PayloadAction<Error>) => {
      state.isLoadingAllTasks = false
      state.error = action.payload
    },
    requestDailyToDoList: (state) => {
      state.isLoadingDaily = true
    },
    getDailyTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.isLoadingDaily = false
      state.dailyToDoList = action.payload
    },
    getDailyTasksFailure: (state, action: PayloadAction<Error>) => {
      state.isLoadingDaily = false
      state.error = action.payload
    },
    requestCurrentToDoList: (state) => {
      state.isLoadingCurrent = true
    },
    getCurrentTasksSuccess: (state, action: PayloadAction<Task[]>) => {
      state.isLoadingCurrent = false
      state.currentToDoList = action.payload
    },
    getCurrentTasksFailure: (state, action: PayloadAction<Error>) => {
      state.isLoadingCurrent = false
      state.error = action.payload
    },
    setCurrentTasks: (state, action: PayloadAction<Task[]>) => {
      state.currentToDoList = action.payload
    },
    setCurrentTask: (state, action: PayloadAction<Task>) => {
      state.currentTask = action.payload
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
