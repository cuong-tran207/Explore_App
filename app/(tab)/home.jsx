import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import BannerSection from "../../components/HomeBanner";
import TourCard from "../../components/TourCard";
import { categories, tours } from "../../utils/TestData";
import useAuthStore from "../../store/authStore";

const Category = ({ categories = [] }) => {
  return (
    <View className="mt-6">
      <View className="flex-row items-center justify-between px-4 mb-4">
        <Text className="text-lg font-bold">Category</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4"
      >
        {categories.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            className="flex-row justify-center items-center mr-8 pt-2 bg-gray-200 py-2 px-4 rounded-lg"
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
