import { View, Text, StyleSheet, Pressable } from "react-native"
import React from "react"
import { useTheme } from "@react-navigation/native"
import type { NavigatorProps } from "../utils"

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
const HomeScreen = ({ navigation }: NavigatorProps) => {
  const { colors } = useTheme()
  const forTesting = () => {}
  return (
    <View>
      <Text style={[styles.text, { color: colors.text }]}>Home</Text>
    </View>
  )
}

export default HomeScreen
