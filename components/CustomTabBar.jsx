import { BlurView } from "expo-blur";
import { Keyboard, Platform, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
function TabBarIcon({ name, color }) {
  return <Ionicons size={24} name={name} color={color} />;
}

export default function CustomTabBar({ state, descriptors, navigation }) {
  const getIconName = (routeName, isFocused) => {
    switch (routeName) {
      case "home":
        return isFocused ? "home" : "home-outline";
      case "explore":
        return isFocused ? "compass" : "compass-outline";
      case "favorite":
        return isFocused ? "heart" : "heart-outline";
      case "profile":
        return isFocused ? "person" : "person-outline";
      default:
        return "circle";
    }
  };
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  if (isKeyboardVisible) {
    return null;
  }

  return (
    <BlurView
      intensity={95}
      tint="light"
      style={{
        flexDirection: "row",
        height: 80,
        paddingBottom: 10,
        paddingTop: 12,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderWidth: 0.4,
        borderColor: "#ccc",
        overflow: "hidden",
        borderTopColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 1,
        shadowRadius: 5,
        elevation: 0.5,
        zIndex: 1,
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.tabBarLabel || options.title || route.name;

        return (
          <TouchableOpacity
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
              });
              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons
                name={getIconName(route.name, isFocused)}
                size={22}
                color={isFocused ? "#000" : "#8E8E93"}
              />
              <Text
                style={{
                  color: isFocused ? "#000" : "#8E8E93",
                  fontSize: 10,
                  fontWeight: isFocused ? "bold" : "500",
                  marginTop: 4,
                }}
              >
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </BlurView>
  );
}
