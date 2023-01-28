import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"

export default function SampleScreen() {
  return (
    <View style={styles.container}>
      <Text>This is to test react-test-renderer</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
})
