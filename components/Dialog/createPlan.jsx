import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import apiServer from "../../utils/api";
import SetTime from "../setTime";
import { Ionicons } from "@expo/vector-icons";
import useAuthStore from "../../store/authStore";
import { useRouter } from "expo-router";
import { formatDate } from "../../utils/help";

export default function PlanModal({ onDismiss }) {
  const router = useRouter();
  const { reset } = useAuthStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locate, setLocate] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const createPlan = async () => {
    const res = await apiServer.call("plan", {
      title: title,
      location: locate,
      startDate: startDate,
      endDate: endDate,
      description: description,
    });
    if (res.message === "WRONG_TOKEN") {
      reset();
      router.replace("/login");
    }
  };
  return (
    <Modal transparent animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View className="flex-1 justify-center items-center bg-black/50 ">
            <View className="bg-white rounded-lg w-[90%] max-w-md p-5 shadow-lg">
              {/* Tiêu đề */}
              <View className="flex flex-row justify-between items-center my-2">
                <Text className="text-xl font-semibold">
                  Tạo kế hoạch du lịch
                </Text>
                <TouchableOpacity onPress={onDismiss}>
                  <Text className="text-gray-500 text-xl">✖</Text>
                </TouchableOpacity>
              </View>

              {/* Form */}
              <View className="mt-3 flex-col gap-4">
                <View>
                  <Text className="text-gray-600">Tên kế hoạch</Text>
                  <TextInput
                    placeholder="Nhập tên kế hoạch..."
                    value={title}
                    onChangeText={(data) => setTitle(data)}
                    className="w-full border-b border-[#ccc] rounded-md px-3 py-3 mt-1"
                  />
                </View>

                <View>
                  <Text className="text-gray-600 mt-3">Địa điểm</Text>
                  <TextInput
                    placeholder="Chọn hoặc nhập tỉnh/thành phố..."
                    value={locate}
                    onChangeText={(data) => setLocate(data)}
                    className="w-full border-b border-[#ccc] rounded-md px-3 py-3 mt-1"
                  />
                </View>

                <View className="flex flex-row justify-between mt-3 ">
                  <View>
                    <Text className="text-gray-600">Ngày bắt đầu</Text>
                    <TouchableOpacity
                      onPress={() => setShowStart(true)}
                      className="bg-gray-200 rounded-md px-3 py-2 mt-1 flex-row items-center gap-2"
                    >
                      <Ionicons name="time" size={24} color="#666" />
                      <Text>{formatDate(startDate)}</Text>
                    </TouchableOpacity>
                    <Modal
                      visible={showStart}
                      transparent
                      animationType="slide"
                    >
                      <SetTime
                        time={startDate}
                        setTime={setStartDate}
                        show={showStart}
                        setShow={setShowStart}
                      />
                    </Modal>
                  </View>
                  <View>
                    <Text className="text-gray-600">Ngày kết thúc</Text>
                    <TouchableOpacity
                      onPress={() => setShowEnd(true)}
                      className="bg-gray-200 rounded-md px-3 py-2 mt-1  flex-row items-center gap-2"
                    >
                      <Ionicons name="time" size={24} color="#666" />
                      <Text>{formatDate(endDate)}</Text>
                    </TouchableOpacity>
                    <Modal visible={showEnd} transparent animationType="slide">
                      <SetTime
                        time={endDate}
                        setTime={setEndDate}
                        show={showEnd}
                        setShow={setShowEnd}
                      />
                    </Modal>
                  </View>
                </View>

                <View>
                  <Text className="text-gray-600 mt-3">Mô tả chuyến đi</Text>
                  <TextInput
                    placeholder="Mô tả ngắn về chuyến đi của bạn..."
                    value={description}
                    onChangeText={(data) => setDescription(data)}
                    className="w-full border-b border-[#ccc] rounded-md px-3 py-2 mt-1 h-20"
                    multiline
                    textAlignVertical="top"
                  />
                  <Text className="text-gray-400 text-sm mt-1">
                    Tối đa 500 ký tự
                  </Text>
                </View>
              </View>

              {/* Nút bấm */}
              <View className="flex flex-row justify-between mt-5">
                <TouchableOpacity
                  onPress={onDismiss}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  <Text>Hủy</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={createPlan}
                  className="px-4 py-2 bg-orange-500 rounded-md"
                >
                  <Text className="text-white font-semibold">Tạo kế hoạch</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
