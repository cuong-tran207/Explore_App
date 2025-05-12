import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import profile1 from "../assets/image/profile1.jpg";
import { useRouter } from "expo-router";

const TourCard = () => {
  const router = useRouter();
  return (
    <View style={styles.bannerContainer}>
      <Image source={profile1} style={styles.bannerImage} />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.bannerOverlay}
      >
        <View style={styles.bannerContent}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>Nghệ An</Text>
          </View>
          <Text style={styles.bannerTitle}>Mùa hè đã đến</Text>
          <Text style={styles.bannerDescription}>
            Khám phá vẻ đẹp thiên nhiên hùng vĩ và những trải nghiệm không thể
            quên tại Nghệ An
          </Text>
          <TouchableOpacity
            style={styles.bannerButton}
            onPress={() => router.push(`explore`)}
          >
            <Text style={styles.bannerButtonText}>Khám phá ngay</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    overflow: "hidden",
    height: 230,
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
    padding: 20,
  },
  bannerContent: {
    gap: 8,
  },
  tagContainer: {
    backgroundColor: "#f97316",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  tagText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 4,
  },
  bannerDescription: {
    color: "#f8fafc",
    fontSize: 16,
    marginBottom: 16,
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: "flex-start",
    gap: 8,
  },
  bannerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default TourCard;
