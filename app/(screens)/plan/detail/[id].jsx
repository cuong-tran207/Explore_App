import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Evaluate from "./evaluate";
import Info from "./info";

const detailPlan = () => {
  const route = useRoute();
  const { id } = route.params;
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("info");
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView className="bg-gray-100" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center bg-white px-4 py-3">
          <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold ml-3">Chi tiết chuyến đi</Text>
        </View>
        {/* Tabs */}
        <View className="flex-row border-b border-gray-300 bg-white">
          <TouchableOpacity
            className={`flex-1 p-4 border-b-2 ${
              activeTab === "info" ? "border-orange-500" : "border-transparent"
            }`}
            onPress={() => setActiveTab("info")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "info" ? "text-orange-500" : "text-gray-500"
              }`}
            >
              Thông tin
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-4 border-b-2 ${
              activeTab === "review"
                ? "border-orange-500"
                : "border-transparent"
            }`}
            onPress={() => setActiveTab("review")}
          >
            <Text
              className={`text-center font-semibold ${
                activeTab === "review" ? "text-orange-500" : "text-gray-500"
              }`}
            >
              Đánh giá
            </Text>
          </TouchableOpacity>
        </View>

        {/* Nội dung Tabs */}
        {activeTab === "info" ? <Info></Info> : <Evaluate></Evaluate>}

        {/* Xuất bản lịch trình */}
        <TouchableOpacity className="bg-orange-500 p-4 rounded-lg mt-4 mx-6 flex-row items-center justify-center">
          <FontAwesome name="paper-plane" size={16} color="white" />
          <Text className="text-white text-lg font-semibold ml-2">
            Xác nhận
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default detailPlan;
