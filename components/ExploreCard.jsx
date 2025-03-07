import { Link, useNavigation, useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export const ExploreCard = ({ item, index, isLeft }) => {
  const router = useRouter();
  const pressed = useSharedValue(1);
  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(pressed.value, {
            damping: 10,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 150 + (isLeft ? 0 : 50)).springify()}
      className="w-full mb-4"
    >
      <Animated.View style={animatedCardStyle}>
        <TouchableOpacity
          className="w-full rounded-[18px] overflow-hidden"
          style={{ height: item.height }}
          activeOpacity={1}
          onPressIn={() => {
            pressed.value = withSpring(0.9);
          }}
          onPressOut={() => {
            pressed.value = withSpring(1);
            router.push(`home/detail/${item.id}`);
          }}
        >
          <Image
            source={{ uri: item.image }}
            className="h-full w-full"
            style={{ position: "absolute" }}
          />
          <View className="absolute inset-0 bg-black/30 justify-end p-4">
            <Text className="text-white font-bold text-lg">{item.title}</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};
