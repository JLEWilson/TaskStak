import { StatusBar } from "expo-status-bar"
import { StyleSheet, Text, View } from "react-native"
import { NavigationContainer, DefaultTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./src/screens/Home"
import TaskList from "./src/screens/TaskList"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

const MyTheme = {
  dark: true,
  colors: {
    primary: "rgb(178, 170, 170)",
    background: "black",
    card: "rgb(178, 170, 170)",
    text: "white",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
}
const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: MyTheme.colors.primary },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={({ route }) => ({
            tabBarIcon: () => {
              return (
                <MaterialIcon name="home" size={25} style={{ paddingTop: 5 }} />
              )
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        />
        <Tab.Screen
          name="TaskList"
          component={TaskList}
          options={({ route }) => ({
            tabBarIcon: () => {
              return (
                <MaterialIcon name="list" size={25} style={{ paddingTop: 5 }} />
              )
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    flex: 1,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
})
