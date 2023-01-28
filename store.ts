import { configureStore } from "@reduxjs/toolkit"
import { initialState } from "./src/reducers/ToDoListReducer"
import RootReducer from "./src/reducers/RootReducer"
import type { Task } from "./src/models/Task.Server"

export type RootState = {
  allTasks: Task[]
  dailyToDoList: Task[]
  currentToDoList: Task[]
  currentTask: Task
}

const store = configureStore({
  reducer: RootReducer,
})

export default store

export type storeType = typeof store
