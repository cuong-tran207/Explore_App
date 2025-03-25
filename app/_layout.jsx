import { Stack, useRouter, useSegments } from "expo-router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "../store/authStore";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const RootLayout = () => {
  const { token, user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    if (!token && !user && !inAuthGroup) {
      router.replace("/login");
    } else if (token && user && inAuthGroup) {
      router.replace("/home");
    }
  }, [isReady, token, user, segments]);

  const position = useRef(
    new Animated.ValueXY({ x: width - 80, y: height - 150 })
  ).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 2 || Math.abs(gestureState.dy) > 2;
      },
      onPanResponderGrant: () => {
        position.setOffset({
          x: position.x._value,
          y: position.y._value,
        });
        position.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: position.x, dy: position.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        position.flattenOffset(); // Cập nhật lại vị trí sau khi kết thúc drag
      },
    })
  ).current;

  const handlePress = () => {
    console.log("Nút được nhấn!");
  };

  return (
    <PaperProvider>
      <Fragment>
        <View className="flex-1">
          <Stack
            screenOptions={{
              headerShown: false,
              presentation: "card",
              animation: "slide_from_right",
              animationTypeForReplace: "push",
              gestureEnabled: true,
              gestureDirection: "horizontal",
              fullScreenGestureEnabled: true,
              animationDuration: 200,
              tabBarHideOnKeyboard: true,
            }}
          >
            <Stack.Screen
              name="(tab)"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />

            <Stack.Screen
              name="index"
              options={{
                headerShown: false,
                gestureEnabled: false,
              }}
            />
          </Stack>

          {/* Nút nổi có thể kéo thả */}
          <Animated.View
            style={[
              {
                position: "absolute",
                width: 56,
                height: 56,
              },
              position.getLayout(),
            ]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={handlePress}
              activeOpacity={0.8}
              className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <Ionicons name="chatbox" size={24} color="#fff" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <StatusBar barStyle="light-content" />
      </Fragment>
    </PaperProvider>
  );
};

export default RootLayout;
