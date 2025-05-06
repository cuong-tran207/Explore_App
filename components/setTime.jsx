import { View, Text, Modal, TouchableOpacity } from "react-native";
import React from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const SetTime = ({ time, setTime, show, setShow }) => {
  if (!show) return null;

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setTime(
        (prevTime) =>
          new Date(
            selectedDate.setHours(prevTime.getHours(), prevTime.getMinutes())
          )
      );
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      setTime(
        (prevTime) =>
          new Date(
            prevTime.setHours(
              selectedTime.getHours(),
              selectedTime.getMinutes()
            )
          )
      );
    }
  };

  return (
    <Modal transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-6 shadow-lg w-[90%] max-w-md">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-gray-800">
              Chỉnh thời gian
            </Text>
            <TouchableOpacity onPress={() => setShow(false)}>
              <Text className="text-gray-500 text-2xl">✖</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-gray-900 p-4 rounded-lg">
            <View className="mb-4 items-center">
              <Text className="text-gray-600 mb-2 font-medium">Ngày</Text>
              <DateTimePicker
                value={time}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            </View>

            <View className="items-center">
              <Text className="text-gray-600 mb-2 font-medium">Giờ</Text>
              <DateTimePicker
                value={time}
                mode="time"
                display="spinner"
                onChange={handleTimeChange}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setShow(false)}
            className="mt-5 px-5 py-3 rounded-lg"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
            }}
          >
            <Text className="text-gray-900 text-center font-semibold text-lg">
              Xác nhận
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SetTime;
