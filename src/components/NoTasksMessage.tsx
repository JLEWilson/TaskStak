import React from "react"
import { View, StyleSheet } from "react-native"
import { useTheme } from "@react-navigation/native"
import StyledText from "./StyledText"
import DivSVG from "../SVGS/DivSVG"

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 55,
  },

  text: {
    position: "absolute",
    fontSize: 22,
  },
})

const NoTasksMessage = () => {
  const { colors } = useTheme()
  return (
    <View
      style={[styles.mainContainer, { backgroundColor: colors.background }]}
      accessible={false}
      accessibilityLabel="Positioning container"
    >
      <DivSVG
        accessible={true}
        accessibilityLabel="Background SVG"
        fill={colors.card}
        stroke={colors.border}
        strokeWidth={5}
        viewBox="-253 -175 1056 706"
      />
      <StyledText style={[styles.text, { color: colors.text }]}>
        You have nothing to do!
      </StyledText>
    </View>
  )
}

export default NoTasksMessage
