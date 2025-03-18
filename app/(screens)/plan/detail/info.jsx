import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
} from "react-native";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Modal } from "react-native-paper";
import React from "react";

const info = () => {
  return (
    <View>
      {/* Mô tả chuyến đi */}
      <View className="bg-white mx-6 px-4 py-5 rounded-xl mt-2">
        <View className="flex-row items-center">
          <MaterialIcons name="info" size={20} color="#F97316" />
          <Text className="ml-2 text-lg font-bold">Mô tả chuyến đi</Text>
        </View>
        <Text className="mt-2 text-gray-700">Đi chơi Nghệ An</Text>
        {/* <TouchableOpacity>
          <Text className="text-orange-500 mt-1">Xem thêm ▼</Text>
        </TouchableOpacity> */}
        <View className="flex-row mt-3">
          <View className="flex-row items-center flex-1">
            <FontAwesome name="map-marker" size={16} color="gray" />
            <Text className="ml-2 text-gray-600">Thành phố Hà Nội</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialIcons name="event" size={16} color="gray" />
            <Text className="ml-2 text-gray-600">Tháng 9 - Tháng 12</Text>
          </View>
        </View>
      </View>

      {/* Thành viên */}
      <View className="bg-white mx-6 px-4 py-5 rounded-xl mt-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center ">
            <FontAwesome name="users" size={20} color="#F97316" />
            <Text className="ml-2 text-lg font-bold">Thành viên</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="add"
              size={20}
              color="black"
              className="bg-[#ddd] rounded-full p-1"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-3">
          <Image
            source={{
              uri: "https://res.cloudinary.com/dn6xdmqbl/image/upload/v1712251330/avatar_user/bijfuy5vd1ugjp0qlu0h.jpg",
            }}
            className="w-10 h-10 rounded-full"
          />
          <Text className="ml-3 text-gray-700 font-semibold">Cường Trần</Text>
          <View className="ml-2 bg-orange-100 px-2 py-1 rounded-lg">
            <Text className="text-orange-600 text-xs">Chủ kế hoạch</Text>
          </View>
        </View>
      </View>

      <View className="bg-white mx-6 px-4 py-5 rounded-xl mt-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <FontAwesome name="calendar" size={20} color="#F97316" />
            <Text className="ml-2 text-lg font-bold">Lịch trình</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="add"
              size={20}
              color="black"
              className="bg-[#ddd] rounded-full p-1"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-3"></View>
      </View>

      <View className="bg-white mx-6 px-4 py-5 rounded-xl mt-2">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center ">
            <FontAwesome name="money" size={20} color="#F97316" />
            <Text className="ml-2 text-lg font-bold">Chi phí dự kiến</Text>
          </View>
          <TouchableOpacity>
            <Ionicons
              name="add"
              size={20}
              color="black"
              className="bg-[#ddd] rounded-full p-1"
            />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center mt-4">
          <View className="flex-row justify-between items-center border-b-[1px] border-[#ccc] w-full pb-1">
            <Text className="text-lg">Tổng chi phí</Text>
            <Text className="text-orange-600 text-lg font-semibold">0đ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default info;
