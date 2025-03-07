// components/Header.tsx
import React, { useCallback, useRef } from "react";
import { View, TouchableOpacity, Platform, StatusBar } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useDebounce } from "../hooks/useDebounce";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const Header = ({ onBack, isFavorited, setIsFavorited }) => {
  const scale = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(isFavorited ? 1.12 : 1) }],
  }));

  const timerRef = useRef(null);

  const handleFavoritePress = useCallback(() => {
    setIsFavorited(!isFavorited);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      console.log("API call for favorite:", !isFavorited);
    }, 1000);
  }, [isFavorited]);

  return (
    <View
      className="absolute top-4 left-4 right-4 flex-row justify-between z-10"
      style={{
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight + 2 : 20,
      }}
    >
      <TouchableOpacity
        className="bg-white/90 p-2 rounded-full"
        onPress={onBack}
      >
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>

      <AnimatedTouchable
        className=" p-2 rounded-full"
        style={scale}
        onPress={handleFavoritePress}
      >
        <AntDesign
          name={isFavorited ? "heart" : "hearto"}
          size={24}
          color={isFavorited ? "red" : "black"}
        />
      </AnimatedTouchable>
    </View>
  );
};
