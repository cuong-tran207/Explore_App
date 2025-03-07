import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import SummaryPlan from "../../components/SummaryPlan";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import profile1 from "../../assets/image/profile1.jpg";
import profile2 from "../../assets/image/profile2.jpg";
import profile3 from "../../assets/image/profile3.jpg";

const Images = [profile1, profile2, profile3];
const Setting = () => {
  const randomImage = Images[Math.floor(Math.random() * Images.length)];
  console.log(randomImage);
  // Khởi tạo giá trị animation cho từng phần tử
  const elements = [
    { translateY: useSharedValue(-50), opacity: useSharedValue(0), delay: 0 },
    { translateY: useSharedValue(-50), opacity: useSharedValue(0), delay: 200 },
    { translateY: useSharedValue(-50), opacity: useSharedValue(0), delay: 400 },
    { translateY: useSharedValue(-50), opacity: useSharedValue(0), delay: 600 },
  ];

  useEffect(() => {
    elements.forEach((el) => {
      el.translateY.value = withTiming(0, { duration: 500, delay: el.delay });
      el.opacity.value = withTiming(1, { duration: 500, delay: el.delay });
    });
  }, []);

  // Hàm tạo animation style
  const animatedStyle = (index) =>
    useAnimatedStyle(() => ({
      transform: [{ translateY: elements[index].translateY.value }],
      opacity: elements[index].opacity.value,
    }));

  return (
    <View className="flex-1">
      <View className="relative flex flex-col w-full">
        {/* Ảnh nền */}
        <Animated.View
          style={[animatedStyle(0)]}
          className="w-full h-[300px] flex justify-center items-center"
        >
          <Image className="w-[600px] h-[300px]" source={randomImage} />
        </Animated.View>

        {/* Thông tin người dùng */}
        <Animated.View
          style={[animatedStyle(1)]}
          className="absolute bottom-[-100] w-full flex flex-row justify-around px-5 items-center"
        >
          <View className="flex justify-center items-center mt-[50px]">
            <Text className="text-[22px] font-semibold">120</Text>
            <Text className="text-[14px] text-gray-500">Yêu thích</Text>
          </View>

          {/* Avatar */}
          <Animated.View
            style={[animatedStyle(2)]}
            className="flex justify-center items-center"
          >
            <Image
              className="w-[150px] h-[150px] rounded-full"
              source={{
                uri: "https://res.cloudinary.com/dn6xdmqbl/image/upload/v1736754073/articles/vjaxchm2nnom2kv3qgqh.jpg",
              }}
            />
            <Text className="text-[22px] mt-3 font-semibold">Bảo Phạm</Text>
          </Animated.View>

          <View className="flex justify-center items-center mt-[50px]">
            <Text className="text-[22px] font-semibold">120</Text>
            <Text className="text-[14px] text-gray-500">Kế hoạch</Text>
          </View>
        </Animated.View>
      </View>

      {/* Danh sách kế hoạch */}
      <Animated.View style={[animatedStyle(3), { flex: 1 }]}>
        <SummaryPlan />
      </Animated.View>
    </View>
  );
};

export default Setting;
