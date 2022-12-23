import { Task } from "../models/Task.Server"
import { RootState } from "../../store"
import { defaultTask } from "../models/Task.Server"

export const initialState: RootState = {
  allTasks: [],
  dailyToDoList: [],
  currentToDoList: [],
  currentTask: defaultTask,
}
type Action =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "SET_DAILY_TO_DO_LIST"; payload: Task[] }
  | { type: "SET_CURRENT_TO_DO_LIST"; payload: Task[] }
  | { type: "SET_CURRENT_TASK"; payload: Task }

const toDoListReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "SET_TASKS":
      return Object.assign({}, state, {
        allTasks: action.payload,
      })
    case "SET_DAILY_TO_DO_LIST":
      return Object.assign({}, state, {
        dailyToDoList: action.payload,
      })
    case "SET_CURRENT_TO_DO_LIST":
      return Object.assign({}, state, {
        dailyToDoList: action.payload,
      })
    case "SET_CURRENT_TASK":
      return Object.assign({}, state, {
        currentTask: action.payload,
      })
    default:
      return initialState
  }
}

export default toDoListReducer
