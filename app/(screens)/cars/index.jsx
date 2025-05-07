import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  FadeIn,
  FadeInDown,
} from "react-native-reanimated";
import { useState, useRef } from "react";
import { useNavigation } from "expo-router";
import CarCard from "@components/CarCard";
import { carData } from "../../../utils/carData";

export default function CarsScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef(null);

  const categories = ["All", "Taxi", "Thuê xe / Lái xe hộ"];

  const filteredCars =
    activeCategory === "All"
      ? carData
      : carData.filter((car) => car.category === activeCategory);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          {/* <Text className="text-2xl font-bold text-gray-800 px-4 mt-4 mb-2">
            Find your ideal car
          </Text>
          <Text className="text-base text-gray-500 px-4 mb-6">
            Browse from our premium selection
          </Text> */}
          <View className="flex-row items-center gap-3 my-2 mx-4">
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
            <Text className="text-2xl font-bold">Đặt xe</Text>
          </View>
        </Animated.View>

        <Animated.View
          className="mb-6"
          entering={FadeInDown.delay(300).duration(400)}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="pb-4"
          >
            {categories.map((category, index) => (
              <Pressable
                key={category}
                className={`px-6 py-3 rounded-full mr-3 ${
                  activeCategory === category ? "bg-primary-500" : "bg-gray-100"
                }`}
                onPress={() => setActiveCategory(category)}
              >
                <Text
                  className={`text-base font-medium ${
                    activeCategory === category ? "text-white" : "text-gray-700"
                  }`}
                >
                  {category}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        <View className="px-2 space-y-4">
          {filteredCars.map((car, index) => (
            <Animated.View
              key={car.id}
              entering={FadeInDown.delay(400 + index * 100).duration(400)}
            >
              <CarCard car={car} />
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
