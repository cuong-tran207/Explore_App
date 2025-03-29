import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Portal, Modal } from "react-native-paper";
import { useRouter } from "expo-router";

// Fake data for notifications with mention type
const fakeNotifications = [
  {
    id: 1,
    type: "tour",
    title: "Chuyến đi Bromo Mountain đã được xác nhận",
    message: "Chuyến đi của bạn sẽ bắt đầu vào ngày 20/12/2023",
    time: "2 giờ trước",
    isRead: false,
  },
  {
    id: 2,
    type: "promotion",
    title: "Giảm giá 20% cho chuyến đi tiếp theo",
    message: "Áp dụng cho tất cả các tour từ 15/12 đến 31/12",
    time: "1 ngày trước",
    isRead: false,
  },
  {
    id: 3,
    type: "review",
    title: "Đánh giá chuyến đi Hạ Long",
    message: "Hãy chia sẻ trải nghiệm của bạn về chuyến đi",
    time: "3 ngày trước",
    isRead: true,
  },
  {
    id: 4,
    type: "update",
    title: "Cập nhật ứng dụng",
    message: "Phiên bản mới đã sẵn sàng để cập nhật",
    time: "1 tuần trước",
    isRead: true,
  },
  {
    id: 5,
    type: "mention",
    title: "An đã nhắc đến bạn trong một bình luận",
    message: '"@John ý kiến của bạn về chuyến đi này thế nào?"',
    time: "5 phút trước",
    isRead: false,
    linkTo: "/home/detail/comment/123", // ID của comment
    tourName: "Tour Hạ Long 3 ngày 2 đêm",
  },
  {
    id: 6,
    type: "mention",
    title: "An đã nhắc đến bạn trong một bình luận",
    message: '"@John ý kiến của bạn về chuyến đi này thế nào?"',
    time: "5 phút trước",
    isRead: false,
    linkTo: "/home/detail/comment/123", // ID của comment
    tourName: "Tour Hạ Long 3 ngày 2 đêm",
  },
];

const NotificationDialog = ({ visible, onClose }) => {
  const router = useRouter();

  const handleNotificationPress = (notification) => {
    if (notification.type === "mention") {
      onClose();
      router.push(notification.linkTo);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case "tour":
        return <Ionicons name="airplane" size={20} color="#3B82F6" />;
      case "promotion":
        return <Ionicons name="pricetag" size={20} color="#10B981" />;
      case "review":
        return <Ionicons name="star" size={20} color="#F59E0B" />;
      case "update":
        return <Ionicons name="refresh" size={20} color="#6366F1" />;
      case "mention":
        return <Ionicons name="chatbubble" size={20} color="#EC4899" />;
      default:
        return null;
    }
  };

  if (!visible) return null;

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={{
          backgroundColor: "transparent",
          paddingHorizontal: 16,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            maxHeight: "80%",
          }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-lg font-bold">Thông báo</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} />
            </TouchableOpacity>
          </View>

          {/* Notifications List */}
          <ScrollView
            className="px-4"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 16 }}
          >
            {fakeNotifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => handleNotificationPress(notification)}
                className={`mb-4 p-4 rounded-xl ${
                  notification.isRead ? "bg-blue-50" : "bg-gray-50"
                }`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-row flex-1 gap-3">
                    {renderIcon(notification.type)}
                    <View className="flex-1">
                      <Text
                        className={`text-base ${
                          notification.isRead ? "font-normal" : "font-bold"
                        }`}
                      >
                        {notification.title}
                      </Text>
                      <Text className="text-gray-600 mt-1">
                        {notification.message}
                      </Text>
                      {notification.type === "mention" && (
                        <Text className="text-gray-500 text-sm mt-1">
                          Trong: {notification.tourName}
                        </Text>
                      )}
                      <Text className="text-gray-400 text-sm mt-2">
                        {notification.time}
                      </Text>
                    </View>
                  </View>
                  {!notification.isRead && (
                    <View className="w-2 h-2 rounded-full bg-blue-500 mt-2 ml-2" />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

export default NotificationDialog;
