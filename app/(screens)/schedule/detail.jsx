import React, { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import profile1 from "../../../assets/image/profile1.jpg";

export default function Detail({ plan }) {
  const navigation = useNavigation();
  const [error, setError] = useState(false);

  return (
    <ScrollView className="flex-1 ">
      <View className="flex-row items-center gap-3 my-2 mb-4">
        <TouchableOpacity onPressOut={() => navigation.goBack()}>
          <Ionicons
            className="p-2 rounded-3xl"
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
            name="arrow-back"
            size={25}
            color="black"
          />
        </TouchableOpacity>
        <Text className="text-2xl font-bold">Gợi ý du lịch</Text>
      </View>
      {/* Header với ảnh nổi bật */}
      <View className="relative">
        <Image source={profile1} className="w-full h-72" />
        <View className="absolute inset-0 bg-black opacity-40" />

        {/* Thông tin cơ bản trên ảnh cover */}
        <View className="absolute bottom-6 left-4 right-4">
          <Text className="text-3xl font-bold text-white mb-2">
            {plan.title || "Kế Hoạch Du Lịch"}
          </Text>
          <View className="flex-row items-center">
            <Feather name="map-pin" size={16} color="white" />
            <Text className="text-white ml-1 font-medium">Nghệ An</Text>
            <View className="w-2 h-2 bg-white rounded-full mx-2" />
            <Feather name="calendar" size={16} color="white" />
            <Text className="text-white ml-1 font-medium">
              {plan.duration || `${plan.days.length} ngày`}
            </Text>
          </View>
        </View>
      </View>

      <View className="bg-white rounded-lg mx-4 p-5 shadow-sm -mt-3 mb-6">
        <Text className="text-xl font-semibold mb-3">Tóm Tắt Chuyến Đi</Text>
        <Text className="text-gray-700 leading-relaxed">{plan.summary}</Text>
      </View>

      {plan.days.map((day, index) => (
        <View
          key={index}
          className="bg-white rounded-lg mx-4 p-5 shadow-sm mb-6"
        >
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white font-bold">{index + 1}</Text>
              </View>
              <Text className="text-xl font-semibold ml-3">{day.day}</Text>
            </View>

            <TouchableOpacity>
              <Feather name="bookmark" size={22} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <Image
            source={day?.image}
            className="w-full h-48 rounded-lg mb-4"
            resizeMode="cover"
          />

          <View className="space-y-4">
            <View className="border-l-4 border-amber-400 pl-4 mb-2">
              <View className="flex-row items-center">
                <Feather name="sunrise" size={18} color="#F59E0B" />
                <Text className="text-lg font-semibold ml-2 text-gray-800">
                  Buổi sáng
                </Text>
              </View>
              <Text className="text-gray-700">{day.activities.morning}</Text>
            </View>

            <View className="border-l-4 border-blue-400 pl-4 mb-2">
              <View className="flex-row items-center ">
                <Feather name="sun" size={18} color="#3B82F6" />
                <Text className="text-lg font-semibold ml-2 text-gray-800">
                  Buổi chiều
                </Text>
              </View>
              <Text className="text-gray-700">{day.activities.afternoon}</Text>
            </View>

            <View className="border-l-4 border-indigo-400 pl-4 mb-2">
              <View className="flex-row items-center ">
                <Feather name="moon" size={18} color="#818CF8" />
                <Text className="text-lg font-semibold ml-2 text-gray-800">
                  Buổi tối
                </Text>
              </View>
              <Text className="text-gray-700">{day.activities.evening}</Text>
            </View>
          </View>

          {day.tips && (
            <View className="mt-4 bg-blue-50 p-4 rounded-lg">
              <View className="flex-row items-center mb-1">
                <Feather name="info" size={16} color="#3B82F6" />
                <Text className="font-semibold ml-2 text-blue-700">Lưu ý</Text>
              </View>
              <Text className="text-gray-700">{day.tips}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
