import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { formatNumber } from "@utils/help";
import apiServer from "@utils/api"; // Adjust the import path as necessary

export default function RestaurantDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const data = await apiServer.call(`restaurant/detail/${id}`);
        console.log(data); // Logs the API response
        setRestaurantData(data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchRestaurantData();
  }, [id]);

  if (!restaurantData) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  const defaultRestaurant = {
    name: "Đại Dương",
    image:
      "https://cdn.tgdd.vn/Files/2022/07/02/1444043/diem-qua-9-nha-hang-noi-tieng-tai-tp-vinh-nghe-an-ma-ban-nen-thu-202207020901187801.jpg",
    rating: 4.5,
    reviews: 120,
    address: "Đại Lộ Lê Nin, Xã Nghi Phú, Thành Phố Vinh, Tỉnh Nghệ An",
    deliveryTime: 30,
    description: "Hải sản tươi sạch",
    menu: [
      {
        name: "Combo gia đình(4 người)",
        description: "Tặng 2 con tôm hùm (ưu đãi 20/4 - 22/4)",
        price: 700000,
      },
      {
        name: "Combo gia đình(6 người)",
        description: "Tặng 2 con tôm hùm (ưu đãi 20/4 - 22/4)",
        price: 1200000,
      },
    ],
  };

  const restaurant = {
    ...defaultRestaurant,
    ...restaurantData.data,
    menu:
      restaurantData.menu.length > 0
        ? restaurantData.menu
        : defaultRestaurant.menu,
  };

  console.log("Merged restaurant data:", restaurant); // Log the merged data

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" />

      {/* Header Image */}
      <View className="relative">
        <Image
          source={{ uri: restaurant.photo || restaurant.image }}
          className="w-full h-72"
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-14 left-4 bg-white p-2 rounded-full shadow"
        >
          <Ionicons name="arrow-back" size={20} color="#00CCBB" />
        </TouchableOpacity>
      </View>

      {/* Restaurant Details */}
      <ScrollView className="flex-1 bg-white -mt-12 pt-6 rounded-t-3xl">
        <View className="px-4">
          <Text className="text-3xl font-bold">{restaurant.name}</Text>

          <View className="flex-row items-center space-x-1 mt-1">
            <Ionicons name="star" size={22} color="#FFD700" />
            <Text className="text-green-600">{restaurant.rating}</Text>
            <Text className="text-gray-500">
              • {restaurant.reviews || 0} reviews
            </Text>
          </View>

          <View className="flex-row items-center space-x-1 mt-1">
            <Ionicons name="pin" size={22} color="#00CCBB" />
            <Text className="text-gray-600 flex-1">{restaurant.address}</Text>
          </View>

          <View className="flex-row items-center space-x-1 mt-1">
            <Ionicons name="time" size={22} color="#00CCBB" />
            <Text className="text-gray-600">
              {restaurant.deliveryTime || "N/A"} min
            </Text>
          </View>

          {/* Description */}
          <Text className="mt-4 text-gray-600 leading-6">
            {restaurant.description}
          </Text>

          {/* Menu Section */}
          <View className="mt-6">
            <Text className="text-2xl font-bold mb-4">Menu</Text>
            {restaurant.menu?.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center justify-between py-3 border-b border-gray-200"
              >
                <View className="flex-1">
                  <Text className="text-lg font-semibold">{item.name}</Text>
                  <Text className="text-gray-500 mt-1">{item.description}</Text>
                </View>
                <Text className="font-bold">{formatNumber(item.price)}đ</Text>
              </View>
            ))}
          </View>

          {/* Order Button */}
          <TouchableOpacity
            className="bg-[#00CCBB] rounded-lg p-4 mt-6 mb-6"
            onPress={() => {
              // Handle order
            }}
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
