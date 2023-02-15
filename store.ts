import { configureStore } from "@reduxjs/toolkit"
import toDoListReducer from "./src/reducers/toDoListSlice"
import type { ThunkAction, AnyAction } from "@reduxjs/toolkit"

const store = configureStore({
  reducer: {
    todolist: toDoListReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type storeType = typeof store

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
