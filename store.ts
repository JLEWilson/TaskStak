import { configureStore } from "@reduxjs/toolkit"
import RootReducer from "./src/reducers/RootReducer"
import { Task } from "./src/models/Task.Server"
import thunk from "redux-thunk"

export type defaultState = {
  error: null | Error
  isLoadingAllTasks: false
  allTasks: Task[]
  isLoadingDaily: false
  dailyToDoList: Task[]
  isLoadingCurrent: false
  currentToDoList: Task[]
  currentTask: Task
}

const store = configureStore({
  reducer: RootReducer,
  middleware: [thunk],
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
