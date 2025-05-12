import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";
import { hotels } from "@/data/hotelData";

export default function BookingScreen() {
  const { hotelId, roomId } = useLocalSearchParams();
  const hotel = hotels.find((h) => h.id === hotelId);
  const room = hotel?.rooms.find((r) => r.id === roomId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  if (!hotel || !room) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <Text className="text-xl text-gray-800">Booking not found</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 px-6 py-3 bg-primary-500 rounded-full"
        >
          <Text className="text-white font-medium">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center p-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800">Booking Details</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        <Animated.View entering={FadeInDown.delay(200).duration(400)}>
          <View className="bg-gray-50 rounded-xl p-4 mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-2">
              {hotel.name}
            </Text>
            <Text className="text-gray-600 mb-2">{room.name}</Text>
            <Text className="text-primary-700 font-bold">
              ${room.price}/night
            </Text>
          </View>
          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">Dates</Text>
            <View className="flex-row space-x-4">
              <View className="flex-1">
                <Text className="text-gray-600 mb-2">Check-in</Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl"
                  placeholder="Select date"
                  value={checkIn}
                  onChangeText={setCheckIn}
                />
              </View>
              <View className="flex-1">
                <Text className="text-gray-600 mb-2">Check-out</Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl"
                  placeholder="Select date"
                  value={checkOut}
                  onChangeText={setCheckOut}
                />
              </View>
            </View>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-gray-800 mb-4">
              Guest Information
            </Text>
            <View className="space-y-4">
              <View className="flex-row space-x-4">
                <View className="flex-1">
                  <Text className="text-gray-600 mb-2">First Name</Text>
                  <TextInput
                    className="bg-gray-100 p-4 rounded-xl"
                    value={formData.firstName}
                    onChangeText={(text) =>
                      setFormData({ ...formData, firstName: text })
                    }
                  />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-600 mb-2">Last Name</Text>
                  <TextInput
                    className="bg-gray-100 p-4 rounded-xl"
                    value={formData.lastName}
                    onChangeText={(text) =>
                      setFormData({ ...formData, lastName: text })
                    }
                  />
                </View>
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Email</Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
                />
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Phone</Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(text) =>
                    setFormData({ ...formData, phone: text })
                  }
                />
              </View>

              <View>
                <Text className="text-gray-600 mb-2">Special Requests</Text>
                <TextInput
                  className="bg-gray-100 p-4 rounded-xl"
                  multiline
                  numberOfLines={4}
                  value={formData.specialRequests}
                  onChangeText={(text) =>
                    setFormData({ ...formData, specialRequests: text })
                  }
                />
              </View>
            </View>
          </View>
        </Animated.View>
      </ScrollView>

      <View className="p-4 border-t border-gray-100">
        <TouchableOpacity
          className="bg-primary-500 py-4 rounded-xl items-center"
          onPress={() => {
            // Handle booking submission
            // router.push("/hotel/confirmation");
          }}
        >
          <Text className="text-white font-semibold text-lg">
            Confirm Booking
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
