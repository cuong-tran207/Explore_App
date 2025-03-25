import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import BannerSection from "../../components/HomeBanner";
import TourCard from "../../components/TourCard";
import { categories, tours } from "../../utils/TestData";
import useAuthStore from "../../store/authStore";

const Category = ({ categories = [] }) => {
  const router = useRouter();
  const pushRoute = (id) => {
    if (id === 1) {
      router.push(`restaurant`);
    }
    if (id === 2) {
      router.push(`hotel`);
    }
  };
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <Text className="text-lg font-bold">Danh mục</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            onPressOut={() => pushRoute(cat.id)}
            className="flex-row justify-center items-center mr-8 pt-2 bg-gray-200 py-2 px-4 rounded-lg gap-2"
          >
            <Ionicons name={cat.icon} size={22} color="#000" />
            <Text className="">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Home = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <BannerSection />
      <Category categories={categories} />
      <TourCard tours={tours} />
    </ScrollView>
  );
};

export default Home;
