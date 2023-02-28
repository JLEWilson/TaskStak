import A from "@react-native-async-storage/async-storage"
import { userIdModifier } from "./Globals.Models"

export type UserData = {
  createdAt: string | undefined
  lastSignIn: string | undefined
}
export const getUserData = async () => {
  try {
    const data = await A.getItem(userIdModifier)
    if (data) {
      return JSON.parse(data) as UserData
    }
    return undefined
  } catch (err) {
    throw err
  }
}
export const createUserData = async () => {
  const now = new Date()
  const userData: UserData = {
    createdAt: now.toString(),
    lastSignIn: now.toString(),
  }
  try {
    return await A.setItem(userIdModifier, JSON.stringify(userData))
  } catch (err) {
    throw err
  }
}
export const updateSignInDate = async () => {
  try {
    const userData = await getUserData()
    if (userData) {
      const now = new Date()
      userData.lastSignIn = now.toString()
      A.setItem(userIdModifier, JSON.stringify(userData))
    }
    return null
  } catch (err) {
    throw err
  }
}
