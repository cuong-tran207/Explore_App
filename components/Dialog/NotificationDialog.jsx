import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Portal, Modal } from "react-native-paper";
import { useRouter } from "expo-router";
import { notifications } from "@utils/TestData";

const NotificationDialog = ({ visible, onClose }) => {
  const router = useRouter();

  const handleNotificationPress = (notification) => {
    if (notification.type === "mention") {
      onClose();
      router.push({
        pathname: `/home/detail/${notification.linkTo.split("/").pop()}`,
        params: { message: notification.message },
      });
      
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
            {notifications.map((notification) => (
              <TouchableOpacity
                key={notification.id}
                onPress={() => handleNotificationPress(notification)}
                className={`mb-4 p-4 rounded-xl ${
                  notification.isRead ? "bg-gray-50" : "bg-blue-50"
                }`}
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-row flex-1 gap-3">
                    <Ionicons name="chatbubble" size={20} color="#EC4899" />
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
