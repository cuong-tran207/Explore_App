import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import React from "react";

const evaluate = () => {
  return (
    <View className="bg-white mx-6 px-4 py-5 rounded-xl mt-2">
      <Text className="text-lg font-bold">Đánh giá</Text>
      <Text className="text-gray-700 mt-2">Chưa có đánh giá nào.</Text>
    </View>
  );
};

export default evaluate;
