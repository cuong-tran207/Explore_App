import { View, Text, Image, Pressable } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";

export default function CarCard({ car }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withTiming(0.98, { duration: 200, easing: Easing.ease });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 120 });
  };

  return (
    <Animated.View
      style={animatedStyle}
      className="bg-white rounded-xl shadow-sm overflow-hidden mb-4"
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="border border-gray-100 rounded-xl"
      >
        <View className="p-4">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-lg font-bold text-gray-800">{car.name}</Text>
            <View className="flex-row">
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name={star <= car.rating ? "star" : "star-outline"}
                  size={14}
                  color={star <= car.rating ? "#F59E0B" : "#D1D5DB"}
                  style={{ marginLeft: 2 }}
                />
              ))}
            </View>
          </View>

          <Text className="text-gray-500 text-sm mb-3">{car.description}</Text>

          <View className="h-44 bg-gray-100 rounded-lg mb-3 overflow-hidden">
            <Image
              source={{ uri: car.image }}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            {/* <View className="flex-row items-center">
              <MaterialIcons name="attach-money" size={18} color="#4B5563" />
              <Text className="text-base font-bold text-gray-800 ml-1">
                {car.price}
                <Text className="font-normal text-gray-500"> /day</Text>
              </Text>
            </View> */}

            <View className="flex-row items-center space-x-3">
              <View className="flex-row items-center">
                <Ionicons
                  name="speedometer-outline"
                  size={16}
                  color="#4B5563"
                />
                <Text className="text-gray-500 text-sm ml-1">
                  {car.features.speed}
                </Text>
              </View>

              <View className="flex-row items-center">
                <MaterialIcons name="event-seat" size={16} color="#4B5563" />
                <Text className="text-gray-500 text-sm ml-1">
                  {car.features.seats}
                </Text>
              </View>
            </View>
          </View>

          <Pressable className="bg-primary-500  rounded-lg items-center">
            <Text className="text-white font-semibold">Select car</Text>
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}
