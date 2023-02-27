import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"

const styles = StyleSheet.create({
  mainContainer: {
    height: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  taskContainer: {
    width: 200,
    height: 100,
    borderRadius: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 15,
  },
})

const NoTasksMessage = () => {
  const { colors } = useTheme()
  return (
    <View style={[styles.mainContainer, { backgroundColor: colors.background }]}>
      <View style={[styles.taskContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.text, { color: colors.text }]}>
          You have no more tasks!
        </Text>
      </View>
    </View>
  )
}

export default NoTasksMessage
