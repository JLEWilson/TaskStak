import { combineReducers } from "redux"
import toDoListReducer from "./ToDoListReducer.ts"

const rootReducer = combineReducers({
  todolist: toDoListReducer,
})

export default rootReducer
