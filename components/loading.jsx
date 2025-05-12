import { View, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Loading({ message = "Loading...", size = "medium" }) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(withTiming(360, { duration: 2000 }), -1, false);

    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(1, { duration: 1000 })
      ),
      -1,
      true
    );

    opacity.value = withTiming(1, { duration: 500 });
  }, []);

  const iconSize = {
    small: 24,
    medium: 32,
    large: 48,
  }[size];

  const containerSize = {
    small: "h-[60px]",
    medium: "h-[80px]",
    large: "h-[100px]",
  }[size];

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      className={`items-center justify-center space-y-3 h-[100vh] ${containerSize}`}
    >
      <Animated.View
        className="items-center justify-center"
        style={animatedStyle}
      >
        <Ionicons name="sync" size={iconSize} color="#8B5CF6" />
      </Animated.View>
      <Text className="text-base text-gray-500 font-medium">{message}</Text>
    </View>
  );
}
