import { combineReducers } from "redux"
import toDoListReducer from "./toDoListSlice.ts"

const rootReducer = combineReducers({
  todolist: toDoListReducer,
})

export default rootReducer
