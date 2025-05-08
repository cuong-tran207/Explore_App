import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { formatNumber } from "../utils/help";
import { Ionicons } from "@expo/vector-icons";

const cardRestaurant = ({ item }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.replace(`/restaurant/detail/${item.id}`)}
      key={item.id}
      className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
      style={{
        elevation: 2,
      }}
    >
      <Image
        source={{ uri: item.photo }}
        className="w-full h-32 rounded-t-2xl"
      />
      <View className="p-3">
        <Text className="text-base font-semibold">{item.name}</Text>
        <View className="flex-row justify-between items-center mt-2">
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
            <Text
              className="text-sm text-gray-500 ml-1 flex-1"
              numberOfLines={1}
            >
              {item.address}
            </Text>
          </View>
          <TouchableOpacity className="bg-primary px-3 py-1 rounded-full">
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default cardRestaurant;
