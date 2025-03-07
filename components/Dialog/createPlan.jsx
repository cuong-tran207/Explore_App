import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";

export default function PlanModal({ onDismiss }) {
  return (
    <Modal transparent>
      <View className="flex-1 justify-center items-center bg-black/50 ">
        <View className="bg-white rounded-lg w-[90%] max-w-md p-5 shadow-lg">
          {/* Tiêu đề */}
          <View className="flex flex-row justify-between items-center">
            <Text className="text-lg font-semibold">Tạo kế hoạch du lịch</Text>
            <TouchableOpacity onPress={onDismiss}>
              <Text className="text-gray-500 text-xl">✖</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View className="mt-3">
            <Text className="text-gray-600">Tên kế hoạch</Text>
            <TextInput
              placeholder="Nhập tên kế hoạch..."
              className="w-full border rounded-md px-3 py-2 mt-1"
            />

            <Text className="text-gray-600 mt-3">Địa điểm</Text>
            <TextInput
              placeholder="Chọn hoặc nhập tỉnh/thành phố..."
              className="w-full border rounded-md px-3 py-2 mt-1"
            />

            <View className="flex flex-row justify-between mt-3">
              <View>
                <Text className="text-gray-600">Ngày bắt đầu</Text>
                <View className="bg-gray-200 rounded-md px-3 py-2 mt-1">
                  <Text>ngày 28 thg 2, 2025</Text>
                </View>
              </View>
              <View>
                <Text className="text-gray-600">Ngày kết thúc</Text>
                <View className="bg-gray-200 rounded-md px-3 py-2 mt-1">
                  <Text>ngày 28 thg 2, 2025</Text>
                </View>
              </View>
            </View>

            <Text className="text-gray-600 mt-3">Mô tả chuyến đi</Text>
            <TextInput
              placeholder="Mô tả ngắn về chuyến đi của bạn..."
              className="w-full border rounded-md px-3 py-2 mt-1 h-20"
              multiline
              textAlignVertical="top"
            />
            <Text className="text-gray-400 text-sm mt-1">Tối đa 500 ký tự</Text>
          </View>

          {/* Nút bấm */}
          <View className="flex flex-row justify-between mt-5">
            <TouchableOpacity
              onPress={onDismiss}
              className="px-4 py-2 bg-gray-300 rounded-md"
            >
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity className="px-4 py-2 bg-orange-500 rounded-md">
              <Text className="text-white font-semibold">Tạo kế hoạch</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
