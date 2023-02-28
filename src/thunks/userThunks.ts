import { createAsyncThunk } from "@reduxjs/toolkit"
import { err } from "react-native-svg/lib/typescript/xml"
import { getUserData } from "../models/UserData.Server"

export const fetchUserData = createAsyncThunk(
  "user/fetchUserDataStatus",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const response = await getUserData()
      if (!response) throw new Error()
      return response
    } catch (err) {
      return rejectWithValue("Oops there seems to be an error")
    }
  },
)
