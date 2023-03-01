import { AnyAction, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../../store"
import type { Task } from "../models/Task.Server"
import { createUserData } from "../models/UserData.Server"
import { fetchUserData } from "../thunks/userThunks"
import type { UserData } from "../models/UserData.Server"
export interface UserState {
  timeStamps: UserData
  loading: "idle" | "pending" | "succeeded" | "failed"
  error: Error | null
}

const initialState: UserState = {
  timeStamps: {
    createdAt: undefined,
    lastSignIn: undefined,
  },
  loading: "idle",
  error: null,
}

type SliceActions<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer A ? A : never
}[keyof T]

export type ActionTypes = SliceActions<typeof userSlice.actions>

export const userSlice = createSlice({
  name: "toDoList",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return {
        ...state,
        timeStamps: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state, action) => {
      return { ...state, loading: "pending" }
    }),
      builder.addCase(fetchUserData.fulfilled, (state, action) => {
        return {
          ...state,
          loading: "succeeded",
          timeStamps: action.payload,
        }
      }),
      builder.addCase(fetchUserData.rejected, (state, action) => {
        return { ...state, loading: "failed" }
      })
  },
})

export const {} = userSlice.actions

export default userSlice.reducer
