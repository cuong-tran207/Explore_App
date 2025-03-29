import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Link, useNavigation } from "expo-router";

const TourCard = ({ tours }) => {
  const navigation = useNavigation();
  return (
    <View className="mt-6 px-4">
      {tours.map((tour) => (
        <Link
          key={tour.id}
          className="bg-white rounded-2xl mb-4 overflow-hidden shadow"
          href={`/home/detail/${tour.id}`}
        >
          <View className="w-full h-[200px]">
            <Image
              source={{ uri: tour.photo }}
              className="w-full h-full rounded-t-2xl"
              resizeMode="cover"
            />
          </View>
          <View className="p-3">
            <Text className="text-lg font-bold">{tour.title}</Text>
            <View className="flex-row items-center mt-2">
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text className="ml-1">{tour?.rating || 5}</Text>
              <Text className="text-gray-500 ml-1">
                ({tour.isFavorite || 1} lượt thích)
              </Text>
            </View>
          </View>
        </Link>
      ))}
    </View>
  );
};

export default TourCard;
