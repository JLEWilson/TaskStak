import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
// import type { NavigatorProps } from "../utils"
import { getAllTasks, Task } from "../models/Task.Server"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    textAlign: "center",
    marginTop: 25,
  },
})

const HomeScreen = () => {
  const { colors } = useTheme()
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.text, { color: colors.text }]}>Home</Text>
    </View>
  )
}

export default HomeScreen
