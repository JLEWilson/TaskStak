import type { Task } from "../models/Task.Server"

export const REQUEST_ALL_TASKS = "REQUEST_ALL_TASKS"
export const GET_ALL_TASKS_SUCCESS = "GET_ALL_TASKS_SUCCESS"
export const GET_ALL_TASKS_FAILURE = "GET_ALL_TASKS_FAILURE"
export const REQUEST_DAILY_TO_DO_LIST = "REQUEST_DAILY_TO_DO_LIST"
export const GET_DAILY_TO_DO_LIST_SUCCESS = "GET_DAILY_TO_DO_LIST_SUCCESS"
export const GET_DAILY_TO_DO_LIST_FAILURE = "GET_DAILY_TO_DO_LIST_FAILURE"
export const REQUEST_CURRENT_TO_DO_LIST = "REQUEST_CURRENT_TO_DO_LIST"
export const GET_CURRENT_TO_DO_LIST_SUCCESS = "GET_CURRENT_TO_DO_LIST_SUCCESS"
export const GET_CURRENT_TO_DO_LIST_FAILURE = "GET_CURRENT_TO_DO_LIST_FAILURE"
export const SET_CURRENT_TASK = "SET_CURRENT_TASK"

//There has got to be a better way to do this but I currently can not find
//A way to use variables within union types

export type Action =
  | { type: "REQUEST_ALL_TASKS" }
  | { type: "GET_ALL_TASKS_SUCCESS"; payload: Task[] }
  | { type: "GET_ALL_TASKS_FAILURE"; payload: Error }
  | { type: "REQUEST_DAILY_TO_DO_LIST" }
  | { type: "GET_DAILY_TO_DO_LIST_SUCCESS"; payload: Task[] }
  | { type: "GET_DAILY_TO_DO_LIST_FAILURE"; payload: Error }
  | { type: "REQUEST_CURRENT_TO_DO_LIST" }
  | { type: "GET_CURRENT_TO_DO_LIST_SUCCESS"; payload: Task[] }
  | { type: "GET_CURRENT_TO_DO_LIST_FAILURE"; payload: Error }
  | { type: "SET_CURRENT_TASK"; payload: Task }
