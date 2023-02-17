import HomeScreen from "../screens/Home"
import React from "react"
import TaskList from "../screens/TaskList"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { NavigationContainer } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { fetchData } from "../thunks/fetchData"
import { useAppDispatch } from "../hooks/redux"

const MyTheme = {
  dark: true,
  colors: {
    primary: "#e2fcc7", //Buttons and form Inputs
    background: "#abced9",
    card: "#faf5c0", //TaskBackground
    text: "#170f33",
    border: "#152109", //Form Text
    notification: "#fcd4e4", //Modal Background
  },
}
const Tab = createBottomTabNavigator()
let firstLoad = true

const AppNavigator = () => {
  const dispatch = useAppDispatch()
  React.useEffect(() => {
    if (firstLoad) {
      firstLoad = false
      //All Tasks
      dispatch(fetchData())
    }
  }, [])
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: MyTheme.colors.primary,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          children={() => <HomeScreen />}
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
          children={() => <TaskList />}
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

export default AppNavigator
