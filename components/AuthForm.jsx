import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AuthForm = ({
  title,
  children,
  buttonText,
  onButtonPress,
  footerText,
  footerActionText,
  onFooterAction,
  isLoading = false,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(scale.value, {
            damping: 15,
            stiffness: 150,
          }),
        },
      ],
    };
  });

  const handlePressIn = () => {
    if (!isLoading) {
      scale.value = 0.95;
    }
  };

  const handlePressOut = () => {
    if (!isLoading) {
      scale.value = 1;
    }
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(350).springify()}
      className="w-full bg-white rounded-t-3xl p-8"
    >
      <View className="gap-4">
        <Text className="text-black text-3xl text-center font-bold mb-2">
          {title}
        </Text>

        {children}

        <Animated.View style={animatedStyle}>
          <TouchableOpacity
            className={`py-4 rounded-full items-center mb-1 ${
              isLoading ? "bg-gray-400" : "bg-black"
            }`}
            onPress={onButtonPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={1}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" size={24} />
            ) : (
              <Text className="text-white font-bold text-lg">{buttonText}</Text>
            )}
          </TouchableOpacity>
        </Animated.View>

        <View className="flex-row justify-center gap-2 mb-3">
          <Text className="text-black">{footerText}</Text>
          <TouchableOpacity onPress={onFooterAction} disabled={isLoading}>
            <Text
              className={`font-semibold ${
                isLoading ? "text-gray-400" : "text-black"
              }`}
            >
              {footerActionText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default AuthForm;
