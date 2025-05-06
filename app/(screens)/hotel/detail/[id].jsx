import { useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import Animated, {
  FadeIn,
  FadeInDown,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

const HEADER_HEIGHT = 350;

// Mock data - Replace with your actual data fetching logic
const mockHotel = {
  id: "1",
  name: "Khách sạn mường thanh",
  rating: 4.9,
  reviews: 3245,
  category: "Luxury Resort",
  priceRange: "$$$$",
  image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
  coverImage: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  address:
    "Số 13, đường Quang Trung, phường Quang Trung, thành phố Vinh, tỉnh Nghệ An, Việt Nam",
  distance: "",
  checkIn: "3:00 PM",
  checkOut: "11:00 AM",
  description:
    "Experience unparalleled luxury at our beachfront resort. Featuring stunning ocean views, world-class amenities, and exceptional service, Grand Plaza Resort & Spa offers an unforgettable escape in paradise.",
  amenities: [
    "Free Wi-Fi",
    "Swimming Pool",
    "Spa",
    "Restaurant",
    "Fitness Center",
    "Room Service",
    "Parking",
  ],
  rooms: [
    {
      id: "1",
      name: "Ocean View Suite",
      description:
        "Luxurious suite with panoramic ocean views, private balcony, and premium amenities",
      price: 450,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
      amenities: ["King Bed", "Ocean View", "Balcony", "Mini Bar"],
      maxOccupancy: 2,
      bedType: "King",
      roomSize: "55 m²",
    },
    {
      id: "2",
      name: "Deluxe Garden Room",
      description:
        "Elegant room overlooking our tropical gardens with modern furnishings",
      price: 320,
      image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
      amenities: ["Queen Bed", "Garden View", "Workspace", "Rain Shower"],
      maxOccupancy: 2,
      bedType: "Queen",
      roomSize: "40 m²",
    },
  ],
  coordinates: {
    latitude: 25.7617,
    longitude: -80.1918,
  },
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

const AmenityIcon = ({ name }) => {
  const icons = {
    "Free Wi-Fi": <Ionicons name="wifi" size={24} color="#666" />,
    Restaurant: <Ionicons name="restaurant" size={24} color="#666" />,
    "Fitness Center": (
      <Ionicons name="fitness-outline" size={24} color="#666" />
    ),
    "Room Service": <Ionicons name="bed-outline" size={24} color="#666" />,
    Parking: <Ionicons name="car" size={24} color="#666" />,
    "Swimming Pool": <Ionicons name="water" size={24} color="#666" />,
    Spa: <Ionicons name="sparkles" size={24} color="#666" />,
    TV: <Ionicons name="tv" size={24} color="#666" />,
  };

  return (
    <View className="items-center w-[30%] mb-4">
      {icons[name]}
      <Text className="mt-1 text-xs text-text-secondary text-center">
        {name}
      </Text>
    </View>
  );
};

export default function HotelScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const scrollY = useSharedValue(0);

  const hotel = mockHotel;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, HEADER_HEIGHT / 2], [1, 0]),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -HEADER_HEIGHT / 2]
          ),
        },
      ],
    };
  });

  const contentStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, HEADER_HEIGHT],
            [0, -HEADER_HEIGHT / 4],
            { extrapolateRight: "clamp" }
          ),
        },
      ],
    };
  });

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      {/* Animated Header Image */}
      <AnimatedImage
        source={{ uri: hotel.coverImage }}
        className="absolute top-0 w-full"
        style={[{ height: HEADER_HEIGHT }, headerStyle]}
      />

      {/* Back Button */}
      <TouchableOpacity
        className="absolute z-10 p-2 rounded-full bg-black/30 left-5"
        style={{ top: Platform.OS === "ios" ? 60 : 40 }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {/* Content Container */}
        <Animated.View
          entering={FadeInDown.duration(600)}
          className="bg-white rounded-t-3xl"
          style={[{ marginTop: HEADER_HEIGHT - 24 }, contentStyle]}
        >
          {/* Hotel Info */}
          <View className="p-5">
            <Animated.Text
              entering={FadeIn.delay(200)}
              className="text-3xl font-bold text-text-primary"
            >
              {hotel.name}
            </Animated.Text>

            <View className="flex-row items-center mt-2">
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text className="ml-1 text-base font-semibold text-text-primary">
                {hotel.rating}
              </Text>
              <Text className="ml-1 text-sm text-text-tertiary">
                ({hotel.reviews} reviews)
              </Text>
              <Text className="ml-2 text-sm text-text-tertiary">
                • {hotel.category}
              </Text>
              <Text className="ml-2 text-sm text-text-tertiary">
                • {hotel.priceRange}
              </Text>
            </View>

            <View className="mt-4">
              <View className="flex-row items-center mt-2">
                <Ionicons name="location" size={18} color="#666" />
                <Text className="ml-2 text-sm text-text-secondary">
                  {hotel.address}
                </Text>
              </View>
              <View className="flex-row items-center mt-2">
                <Ionicons name="time" size={18} color="#666" />
                <Text className="ml-2 text-sm text-text-secondary">
                  Check-in: {hotel.checkIn} • Check-out: {hotel.checkOut}
                </Text>
              </View>
            </View>

            <Text className="mt-4 text-base leading-6 text-text-secondary">
              {hotel.description}
            </Text>

            {/* Amenities Section */}
            <View className="mt-8">
              <Text className="text-2xl font-bold text-text-primary mb-4">
                Amenities
              </Text>
              <View className="flex-row flex-wrap justify-between">
                {hotel.amenities.map((amenity, index) => (
                  <AmenityIcon key={index} name={amenity} />
                ))}
              </View>
            </View>

            {/* Rooms Section */}
            <View className="mt-8">
              <Text className="text-2xl font-bold text-text-primary mb-4">
                Available Rooms
              </Text>
              {hotel.rooms.map((room) => (
                <Animated.View
                  key={room.id}
                  entering={FadeInDown.duration(400)}
                  className="bg-background rounded-xl overflow-hidden mb-6"
                >
                  <Image source={{ uri: room.image }} className="w-full h-48" />
                  <View className="p-4">
                    <Text className="text-xl font-semibold text-text-primary">
                      {room.name}
                    </Text>
                    <Text className="text-sm text-text-tertiary mt-1">
                      {room.description}
                    </Text>
                    <View className="flex-row justify-between mt-3">
                      <Text className="text-sm text-text-secondary">
                        {room.roomSize}
                      </Text>
                      <Text className="text-sm text-text-secondary">
                        Max: {room.maxOccupancy} guests
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between mt-4">
                      <Text className="text-2xl font-bold text-secondary">
                        ${room.price}
                      </Text>
                      <Text className="text-text-tertiary">per night</Text>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </View>
        </Animated.View>
      </Animated.ScrollView>

      {/* Book Now Button */}
      <TouchableOpacity
        className="absolute bottom-0 left-0 right-0 bg-secondary mx-4 mb-4 p-4 rounded-xl items-center"
        onPress={() => {}}
      >
        <Text className="text-white text-base font-semibold">Book Now</Text>
      </TouchableOpacity>
    </View>
  );
}
