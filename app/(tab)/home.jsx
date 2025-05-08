import { View, Text, ScrollView, StatusBar, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import BannerSection from "../../components/HomeBanner";
import TourCard from "../../components/TourCard";
import { categories, tours } from "../../utils/TestData";
import FeatureButton from "../../components/FeatureButton";
import useAuthStore from "@store/authStore";

const Category = ({ categories = [] }) => {
  const router = useRouter();
  const pushRoute = (id) => {
    if (id === 1) router.push(`restaurant`);
    if (id === 2) router.push(`hotel`);
    if (id === 3) router.push(`explore`);
  };

  return (
    <View className="flex-1 mt-2">
      <StatusBar barStyle="light-content" />
      <SafeAreaView className="flex-1 ">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="pb-2">
          <View className="bg-white m-4 rounded-2xl p-4 shadow-sm">
            <Text className="text-xl font-bold mb-4 text-slate-800">
              Danh mục
            </Text>
            <View className="flex-row flex-wrap justify-start gap-x-4 gap-y-4">
              <FeatureButton
                title="Điểm du lịch"
                icon="attractions"
                color="#ec4899"
                onPress={() => pushRoute(3)}
              />
              <FeatureButton
                title="Khách sạn"
                icon="hotel"
                color="#f97316"
                onPress={() => pushRoute(2)}
              />
              <FeatureButton
                title="Nhà hàng"
                icon="restaurant"
                color="#10b981"
                onPress={() => pushRoute(1)}
              />
              <FeatureButton
                title="Thuê xe"
                icon="local-taxi"
                color="#f59e0b"
                onPress={() => console.log("Taxis pressed")}
              />
              <FeatureButton
                title="Gợi ý lịch trình"
                icon="tour"
                color="#3b82f6"
                onPress={() => console.log("Tours pressed")}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const Home = () => {
  const { reset } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    reset();
    router.replace("/login");
  };
  return (
    <View>
      <BannerSection />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Category categories={categories} />
        <TourCard tours={tours} />
      </ScrollView>
    </View>
  );
};

export default Home;
