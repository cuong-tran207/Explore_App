import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { formatNumber } from "../utils/help";

const cardHotel = ({ hotel, width, height }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace(`/hotel/detail/${hotel.id}`)}
      key={hotel.id}
      className={`bg-white rounded-2xl mt-2 ${
        width > 200 ? "mr-4" : ""
      } ${Platform.select({
        ios: "shadow-sm",
        android: "elevation-2",
        web: "shadow-sm",
      })}`}
      style={{ width: width }}
    >
      <Image
        source={{ uri: hotel.image }}
        className={`w-full h-${height} rounded-t-2xl`}
      />
      <View className="p-4">
        <Text
          className="text-lg font-bold text-gray-800 mb-2"
          numberOfLines={1}
        >
          {hotel.name}
        </Text>
        <View className="flex-row items-center mb-3">
          <Ionicons
            className="p-2 rounded-3xl"
            style={{
              boxShadow:
                "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
            }}
            name="location"
            size={16}
            color="black"
          />
          <Text className="text-sm text-gray-500 ml-1 flex-1" numberOfLines={1}>
            {hotel.address}
          </Text>
        </View>
        <View className="flex-col justify-between items-start">
          <View className="flex-row items-center">
            <Ionicons
              className="p-2 rounded-3xl"
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
              name="star"
              size={16}
              color="black"
            />
            <Text className="text-sm font-semibold text-gray-800 ml-1">
              {hotel.rating ? hotel.rating : 4.5}
            </Text>
          </View>
          <View className="flex-row w-full justify-end items-start">
            <Text className="text-base font-bold text-blue-800">
              {formatNumber(hotel.rentalPrice)}VNĐ
            </Text>
            <Text className="text-sm font-normal text-gray-500">/đêm</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default cardHotel;
