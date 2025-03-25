import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const FEATURED_HOTELS = [
  {
    id: "1",
    name: "Grand Luxury Resort & Spa",
    location: "Maldives",
    rating: 4.9,
    price: 599,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Mountain View Lodge",
    location: "Swiss Alps",
    rating: 4.8,
    price: 429,
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Coastal Paradise Hotel",
    location: "Bali",
    rating: 4.7,
    price: 349,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=500&fit=crop",
  },
];

const POPULAR_DESTINATIONS = [
  {
    id: "1",
    name: "Paris",
    country: "France",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Santorini",
    country: "Greece",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Dubai",
    country: "UAE",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop",
  },
];

const index = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-center ">
            <View className="flex-row items-center gap-3">
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

              <Text className="text-2xl font-bold">Khách sạn</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Featured Hotels
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className=""
          >
            {FEATURED_HOTELS.map((hotel) => (
              <TouchableOpacity
                key={hotel.id}
                className={`bg-white rounded-2xl mr-4 ${Platform.select({
                  ios: "shadow-sm",
                  android: "elevation-2",
                  web: "shadow-sm",
                })}`}
                style={{ width: 300 }}
              >
                <Image
                  source={{ uri: hotel.image }}
                  className="w-full h-48 rounded-t-2xl"
                />
                <View className="p-4">
                  <Text className="text-lg font-bold text-gray-800 mb-2">
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
                    <Text className="text-sm text-gray-500 ml-1">
                      {hotel.location}
                    </Text>
                  </View>
                  <View className="flex-row justify-between items-center">
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
                        {hotel.rating}
                      </Text>
                    </View>
                    <Text className="text-lg font-bold text-blue-800">
                      ${hotel.price}
                      <Text className="text-sm font-normal text-gray-500">
                        /night
                      </Text>
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text className="text-xl font-bold text-gray-800  mt-8 mb-4">
            Popular Destinations
          </Text>

          <View className="flex-row flex-wrap justify-between ">
            {POPULAR_DESTINATIONS.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                className={`bg-white rounded-2xl mb-4 overflow-hidden ${Platform.select(
                  {
                    ios: "shadow-sm",
                    android: "elevation-2",
                    web: "shadow-sm",
                  }
                )}`}
                style={{ width: "48%" }}
              >
                <Image
                  source={{ uri: destination.image }}
                  className="w-full h-36"
                />
                <View className="p-3">
                  <Text className="text-base font-bold text-gray-800">
                    {destination.name}
                  </Text>
                  <Text className="text-sm text-gray-500 mt-0.5">
                    {destination.country}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
