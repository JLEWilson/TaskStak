import { StyleSheet } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./src/screens/Home"
import TaskList from "./src/screens/TaskList"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import Store from "./store"

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

// Need to figure out a way to gather all data here and share it amongst components instead of grabbing the data in those components,
// or some other form of state management system

export default function App() {
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
          children={() => <HomeScreen store={Store} />}
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
          children={() => <TaskList store={Store} />}
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
