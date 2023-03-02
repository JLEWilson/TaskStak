import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import type { Task } from "../models/Task.Server"

export interface ToDoListState {
  error: null | string
  isLoadingAllTasks: boolean
  allTasks: Task[]
  currentToDoList: Task[]
  currentTask: Task | undefined
}

const initialState: ToDoListState = {
  error: null,
  isLoadingAllTasks: false,
  allTasks: [],
  currentToDoList: [],
  currentTask: undefined,
}
type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never
}[keyof T]

export type ActionTypes = SliceActions<typeof toDoListSlice.actions>

// Re do this to use createAsyncThunk

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
  setCurrentTasks,
  setCurrentTask,
} = toDoListSlice.actions

export default toDoListSlice.reducer
