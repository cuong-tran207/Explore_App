import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import useAuthStore from "../store/authStore";
import { getTime } from "../utils/getTime";

const BannerSection = () => {
  const { user } = useAuthStore();

  const [bannerLoaded, setBannerLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const BannerSkeleton = () => (
    <View className="w-full h-72 bg-gray-200">
      <LinearGradient
        colors={["#f0f0f0", "#e0e0e0", "#f0f0f0"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="w-full h-full"
      />
    </View>
  );

  const ProfileSkeleton = () => (
    <View className="w-10 h-10 rounded-full bg-gray-300" />
  );

  return (
    <View className="relative h-72">
      {!bannerLoaded && <BannerSkeleton />}
      <Image
        source={{ uri: "https://picsum.photos/800/400" }}
        className="absolute w-full h-full"
        resizeMode="cover"
        onLoad={() => setBannerLoaded(true)}
        onError={() => setBannerLoaded(true)}
      />
      <View className="absolute w-full h-full bg-black/30" />
      <View
        style={{
          marginTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 42,
        }}
        className="absolute left-4 right-4 flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-2">
          <View>
            {!profileLoaded && <ProfileSkeleton />}
            <Image
              source={{ uri: user.avatar }}
              className={`w-10 h-10 rounded-full ${
                !profileLoaded ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setProfileLoaded(true)}
              onError={() => setProfileLoaded(true)}
            />
          </View>

          <View>
            <Text className="text-white">{getTime()}</Text>
            <Text className="text-white text-lg font-bold">{user.name}</Text>
          </View>
        </View>
        <TouchableOpacity>
          {/* <Ionicons name="notifications-outline" size={24} color="white" /> */}
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-4 left-4">
        <Text className="text-white">Nghệ An, Việt Nam</Text>
      </View>
    </View>
  );
};

export default BannerSection;
