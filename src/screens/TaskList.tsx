import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import type { NavigatorProps } from "../utils"
import { ThemeProvider, useTheme } from "@react-navigation/native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    textAlign: "center",
    marginTop: 25,
  },
  button: {
    marginTop: "auto",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
})

const TaskList = ({ navigation }: NavigatorProps) => {
  const { colors } = useTheme()
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: colors.text }]}>TaskList</Text>
    </View>
  )
}

export default TaskList
