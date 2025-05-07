import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";
import { useNavigation } from "expo-router";
import Detail from "./detail";
import axios from "axios";

const schedules = [
  {
    id: 1,
    name: "1 ngày",
    days: 1,
    difficulty: "Chớp nhoáng",
    hoursPerDay: 24,
    description:
      "Lịch trình tham quan nhanh gọn, tập trung vào những điểm nổi bật trong thời gian ngắn.",
    color: "#22C55E",
  },
  {
    id: 2,
    name: "2 ngày",
    days: 2,
    difficulty: "Ngắn hạn",
    hoursPerDay: 24,
    description:
      "Lịch trình kết hợp tham quan và trải nghiệm cơ bản trong thời gian ngắn.",
    color: "#3B82F6",
  },
  {
    id: 3,
    name: "3 ngày",
    days: 3,
    difficulty: "Cân bằng",
    hoursPerDay: 24,
    description:
      "Lịch trình phù hợp để khám phá kết hợp giữa tham quan, ẩm thực và nghỉ ngơi.",
    color: "#F59E0B",
  },
  {
    id: 4,
    name: "4 ngày trở lên",
    days: 4,
    difficulty: "Toàn diện",
    hoursPerDay: 24,
    description:
      "Lịch trình toàn diện, có thể khám phá sâu về văn hóa, thiên nhiên và đặc sản địa phương.",
    color: "#EF4444",
  },
];

const languages = [
  { id: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { id: "en", name: "English", flag: "🇺🇸" },
  { id: "es", name: "Spanish", flag: "🇪🇸" },
  { id: "fr", name: "French", flag: "🇫🇷" },
  { id: "de", name: "German", flag: "🇩🇪" },
  { id: "it", name: "Italian", flag: "🇮🇹" },
  { id: "jp", name: "Japanese", flag: "🇯🇵" },
  { id: "kr", name: "Korean", flag: "🇰🇷" },
  { id: "cn", name: "Chinese", flag: "🇨🇳" },
  { id: "ru", name: "Russian", flag: "🇷🇺" },
];

const plan = {
  summary:
    "Hành trình 3 ngày khám phá Nghệ An đưa bạn đến với những địa danh lịch sử, văn hóa nổi tiếng, những bãi biển đẹp và thưởng thức ẩm thực đặc sắc của vùng đất này.",
  days: [
    {
      day: "Ngày 1",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Quang_truong_Ho_Chi_Minh_Vinh_City.jpg/1280px-Quang_truong_Ho_Chi_Minh_Vinh_City.jpg",
      activities: {
        morning:
          "Đến thành phố Vinh, nhận phòng khách sạn và tham quan Quảng trường Hồ Chí Minh, Bảo tàng Hồ Chí Minh.",
        afternoon: "Tham quan Khu di tích lịch sử Truông Bồn.",
        evening: "Ăn tối tại nhà hàng đặc sản Nghệ An, thưởng thức cháo lươn.",
      },
    },
    {
      day: "Ngày 2",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Cua_Lo_Beach.jpg/1280px-Cua_Lo_Beach.jpg",
      activities: {
        morning:
          "Di chuyển đến Cửa Lò, tắm biển và tham gia các hoạt động thể thao dưới nước.",
        afternoon: "Ăn trưa hải sản tươi ngon tại Cửa Lò.",
        evening: "Thưởng thức hải sản nướng tại bờ biển Cửa Lò.",
      },
    },
    {
      day: "Ngày 3",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/ThacKem2.JPG/1280px-ThacKem2.JPG",
      activities: {
        morning: "Tham quan Làng Sen quê Bác.",
        afternoon: "Mua sắm đặc sản Nghệ An làm quà.",
        evening: "Ăn tối và di chuyển ra sân bay/ga tàu, kết thúc hành trình.",
      },
    },
  ],
};

export default function ScheduleScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [selectedSchedule, setSelectedSchedule] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(false);

  const renderPlan = async () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      // console.log("Final selection:", {
      //   schedule: selectedSchedule,
      //   language: selectedLanguage,
      // });
      const res = await axios.get(
        `https://5601-171-242-75-98.ngrok-free.app/api/gen-ai/chat?sessionId=${random}&message=${encodedMessage}`
      );
      setStep(3);
    }
  };

  const renderScheduleSelection = () => (
    <>
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        className="mt-4 mb-6"
      >
        <View className="flex-row items-center gap-3 my-2">
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
          <Text className="text-2xl font-bold">Gợi ý du lịch</Text>
        </View>
      </Animated.View>

      <View className="space-y-4">
        {schedules.map((schedule, index) => (
          <Animated.View
            key={schedule.id}
            entering={FadeInDown.delay(200 + index * 100).duration(400)}
          >
            <Pressable
              onPress={() => setSelectedSchedule(schedule.id)}
              className={`p-4 rounded-xl border-2 ${
                selectedSchedule === schedule.id
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              <View className="flex-row justify-between items-center mb-3">
                <View className="flex-row items-center">
                  <View
                    style={{ backgroundColor: schedule.color }}
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                  >
                    <Text className="text-white font-bold">
                      {schedule.days}d
                    </Text>
                  </View>
                  <View>
                    <Text className="text-lg font-semibold text-gray-800">
                      {schedule.name}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      {schedule.difficulty}
                    </Text>
                  </View>
                </View>
                {selectedSchedule === schedule.id && (
                  <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
                )}
              </View>

              <View className="mb-3">
                <Text className="text-gray-600">{schedule.description}</Text>
              </View>

              <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                <View className="flex-row items-center">
                  <Ionicons name="time-outline" size={20} color="#6B7280" />
                  <Text className="text-gray-600 ml-2">
                    {schedule.hoursPerDay} giờ/ngày
                  </Text>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </>
  );

  const renderLanguageSelection = () => (
    <>
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        className="mt-4 mb-6"
      >
        <View className="flex-row items-center gap-3 my-2">
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
          <Text className="text-2xl font-bold">Chọn ngôn ngữ</Text>
        </View>
      </Animated.View>

      <View className="flex-row flex-wrap justify-between">
        {languages.map((language, index) => (
          <Animated.View
            key={language.id}
            entering={FadeInDown.delay(200 + index * 100).duration(400)}
            className="w-[48%] mb-4"
          >
            <Pressable
              onPress={() => setSelectedLanguage(language.name)}
              className={`p-4 rounded-xl border-2 ${
                selectedLanguage === language.name
                  ? "border-primary-500 bg-primary-50"
                  : "border-gray-100 bg-white"
              }`}
            >
              <Text className="text-4xl mb-2">{language.flag}</Text>
              <Text className="text-lg font-semibold text-gray-800">
                {language.name}
              </Text>
              {selectedLanguage === language.name && (
                <View className="absolute top-2 right-2">
                  <Ionicons name="checkmark-circle" size={24} color="#8B5CF6" />
                </View>
              )}
            </Pressable>
          </Animated.View>
        ))}
      </View>
    </>
  );

  const isNextEnabled = () => {
    if (step === 1) return !!selectedSchedule;
    if (step === 2) return !!selectedLanguage;
    if (step === 3) return false;
    return true;
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {step === 1 && renderScheduleSelection()}
        {step === 2 && renderLanguageSelection()}
        {step === 3 && <Detail plan={plan} />}

        <Animated.View
          entering={FadeInDown.delay(600).duration(400)}
          className="mt-6 mb-8"
        >
          <Pressable
            className={`py-4 rounded-xl ${
              !isNextEnabled() ? "bg-primary-500" : "bg-gray-100"
            }`}
            disabled={!isNextEnabled()}
            onPress={() => renderPlan()}
          >
            <Text
              className={`text-center font-semibold ${
                !isNextEnabled() ? "text-white" : "text-gray-900"
              }`}
            >
              {step === 2 ? "Confirm Selection" : "Continue"}
            </Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
