import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk"
import toDoListReducer from "./src/reducers/toDoListSlice"

const store = configureStore({
  reducer: {
    todolist: toDoListReducer,
  },
  middleware: [thunk],
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type storeType = typeof store
