// useLoadingAnimation.js
import { useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

export const useLoadingAnimation = (count = 1) => {
  const animatedValues = Array(count)
    .fill(0)
    .map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    const animations = animatedValues.map((animatedValue) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ])
      )
    );

    animations.forEach((animation) => animation.start());
    return () => animations.forEach((animation) => animation.stop());
  }, []);

  return animatedValues;
};
