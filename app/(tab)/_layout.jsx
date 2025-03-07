// app/(tab)/_layout.jsx
import { Tabs } from "expo-router";
<<<<<<< HEAD
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Text, Touchable, TouchableOpacity, View } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";

function TabBarIcon({ name, color }) {
  return <Ionicons size={24} name={name} color={color} />;
}

=======
import { View, Text, Button } from "react-native";
import CustomTabBar from "../../components/CustomTabBar";

>>>>>>> 332a7be (fix)
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
<<<<<<< HEAD
=======
        tabBarHideOnKeyboard: true,
        keyboardHidesTabBar: true,
>>>>>>> 332a7be (fix)
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          borderTopWidth: 0,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          marginBottom: 5,
        },
        tabBarShowLabel: true,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
<<<<<<< HEAD
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={focused ? "#007AFF" : "#8E8E93"}
            />
          ),
=======
>>>>>>> 332a7be (fix)
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
<<<<<<< HEAD
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "compass" : "compass-outline"}
              color={focused ? "#007AFF" : "#8E8E93"}
            />
          ),
=======
>>>>>>> 332a7be (fix)
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
<<<<<<< HEAD
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "calendar" : "calendar-outline"}
              color={focused ? "#007AFF" : "#8E8E93"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={focused ? "#007AFF" : "#8E8E93"}
            />
          ),
=======
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
>>>>>>> 332a7be (fix)
        }}
      />
    </Tabs>
  );
}
