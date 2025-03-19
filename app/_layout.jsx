import {
  Redirect,
  SplashScreen,
  Stack,
  useRouter,
  useSegments,
} from "expo-router";
import React, { Fragment, useEffect, useState } from "react";
import "../global.css";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "../store/authStore";
import { PaperProvider } from "react-native-paper";

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

  return (
    <PaperProvider>
      <Fragment>
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
          ></Stack.Screen>

          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
              gestureEnabled: false,
            }}
          ></Stack.Screen>
        </Stack>
        <StatusBar barStyle="light-content" />
      </Fragment>
    </PaperProvider>
  );
};

export default RootLayout;
