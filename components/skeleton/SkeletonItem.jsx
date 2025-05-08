import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";

const SkeletonItem = ({ className }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animationRef = useRef(null);

  useEffect(() => {
    // Tạo animation
    animationRef.current = Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      })
    );

    // Start animation
    animationRef.current.start();

    // Cleanup khi unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
      animatedValue.setValue(0);
    };
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 0.5],
    outputRange: [-100, 150],
  });

  return (
    <View className={`${className} bg-gray-300 overflow-hidden`}>
      <Animated.View style={{ transform: [{ translateX }] }}>
        <LinearGradient
          colors={["transparent", "#ffffff", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: "100%",
            height: "100%",
            opacity: 0.5,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonItem;
