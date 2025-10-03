import { Stack, useRouter, useSegments } from "expo-router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Animated,
  PanResponder,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import useAuthStore from "../store/authStore";
import { Ionicons } from "@expo/vector-icons";
import ChatBot from "@components/Dialog/chatBot";

const { width, height } = Dimensions.get("window");

const RootLayout = () => {
  const { token, user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
        position.flattenOffset();
      },
    })
  ).current;

  return (
    <PaperProvider>
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

        {token && user && (
          <Animated.View
            style={[
              {
                position: "absolute",
                zIndex: 10,
              },
              position.getLayout(),
            ]}
            {...panResponder.panHandlers}
          >
            <TouchableOpacity
              onPress={showModal}
              activeOpacity={0.8}
              className="w-14 h-14 bg-gray-600 rounded-full flex items-center justify-center shadow-lg"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <Ionicons
                name="chatbox-ellipses-outline"
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </Animated.View>
        )}
      </View>
      {visible && <ChatBot onDismiss={hideModal} />}
      <StatusBar style="dark" />
    </PaperProvider>
  );
};

export default RootLayout;
