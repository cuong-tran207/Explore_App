import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const CardPlan = ({ index, plan }) => {
  const router = useRouter();
  const headerOpacity = useSharedValue(0);
  const infoOpacity = useSharedValue(0);
  const footerOpacity = useSharedValue(0);

  React.useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 300, delay: index * 100 });
    infoOpacity.value = withTiming(1, { duration: 300, delay: index * 200 });
    footerOpacity.value = withTiming(1, { duration: 300, delay: index * 300 });
  }, [headerOpacity, infoOpacity, footerOpacity, index]);

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  const infoStyle = useAnimatedStyle(() => {
    return {
      opacity: infoOpacity.value,
    };
  });

  const footerStyle = useAnimatedStyle(() => {
    return {
      opacity: footerOpacity.value,
    };
  });

  const getRoute = () => {
    router.push(`/plan/detail/${plan.id}`);
  };

  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return "N/A";
    }
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <Animated.View style={[]}>
      <TouchableOpacity
        onPress={getRoute}
        activeOpacity={1}
        className="py-5 px-6 border border-gray-200 rounded-lg shadow-sm bg-white mb-3"
      >
        {/* Header */}
        <Animated.View
          style={headerStyle}
          className="flex-row items-center mb-2"
        >
          {plan?.owner?.avatar ? (
            <Image
              source={{ uri: plan.owner.avatar }}
              className="w-10 h-10 rounded-full mr-3"
            />
          ) : (
            <View className="w-10 h-10 rounded-full bg-gray-300 mr-3"></View>
          )}
          <View>
            <Text className="font-semibold text-gray-800">
              {plan?.owner?.name || "Không rõ"}
            </Text>
            <Text className="font-bold text-black">
              {plan?.name || "Chưa đặt tên"}
            </Text>
          </View>
        </Animated.View>

        {/* Information */}
        <Animated.View
          style={infoStyle}
          className="flex-row justify-between items-center mt-2"
        >
          <View className="flex-row items-center">
            <FontAwesome5 name="gift" size={16} color="#28a745" />
            <Text className="text-green-600 ml-1 font-semibold">Miễn phí</Text>
          </View>

          <View className="flex-row items-center">
            <FontAwesome name="clock-o" size={16} color="#6c757d" />
            <Text className="text-gray-600 ml-1">
              {calculateDuration(plan?.startDate, plan?.endDate)} ngày
            </Text>
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          style={footerStyle}
          className="flex-row justify-between items-center mt-2"
        >
          <View className="flex-row items-center">
            <FontAwesome name="user" size={16} color="#6c757d" />
            <Text className="text-gray-600 ml-1">
              {plan?.inviter || 0} đã tham gia
            </Text>
          </View>

          <View className="flex-row items-center">
            <Ionicons name="location-outline" size={16} color="#6c757d" />
            <Text className="text-gray-600 ml-1">
              {plan?.location || "Chưa xác định"}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CardPlan;
