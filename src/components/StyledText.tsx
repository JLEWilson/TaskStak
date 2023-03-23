import React, { Children } from "react"
import { Text } from "react-native"
import { TextStyle } from "react-native"
import { useFonts } from "expo-font"
import { StyleProp } from "react-native"

type StyledTextProps = {
  style?: StyleProp<TextStyle> | undefined
  children?: React.ReactNode
}
const StyledText = (props: StyledTextProps) => {
  const [fontsLoaded] = useFonts({
    "Averia-Libre": require("../../assets/fonts/AveriaLibre-Regular.ttf"),
    "Averia-Libre-Bold": require("../../assets/fonts/AveriaLibre-Bold.ttf"),
    "Averia-Libre-Italic": require("../../assets/fonts/AveriaLibre-Italic.ttf"),
    "Averia-Libre-BoldItalic": require("../../assets/fonts/AveriaLibre-BoldItalic.ttf"),
    "Averia-Libre-Light": require("../../assets/fonts/AveriaLibre-Light.ttf"),
    "Averia-Libre-LightItalic": require("../../assets/fonts/AveriaLibre-LightItalic.ttf"),
  })

  if (!fontsLoaded) {
    return null
  }
  return (
    <Text style={[props.style, { fontFamily: "Averia-Libre-Bold" }]}>
      {props.children}
    </Text>
  )
}
export default StyledText
