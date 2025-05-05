import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const ActionSendComment = ({
  isReplying = false,
  replyingTo = "",
  onCancel = () => {},
  value = "",
  onChangeText = () => {},
  onSend = () => {},
}) => {
  return (
    <View className="p-4 border-t border-gray-200 bg-white">
      {isReplying && (
        <View className="flex-row justify-between items-center mb-2 py-2">
          <Text className="text-gray-500">
            Trả lời <Text className="font-semibold">{replyingTo}</Text>
          </Text>
          <TouchableOpacity onPress={onCancel} className="px-2">
            <Text className="text-gray-500">Hủy</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-row gap-2">
        <TextInput
          style={{
            flex: 1,
            backgroundColor: "#f3f4f6",
            borderRadius: 9999,
            color: "#4b5563",
            marginRight: 8,
            paddingVertical: 8,
            paddingHorizontal: 16,
            height: 45,
          }}
          placeholder={
            isReplying
              ? `Trả lời ${replyingTo}...`
              : "Chia sẻ suy nghĩ của bạn..."
          }
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
        <TouchableOpacity
          className={`rounded-full px-4 justify-center items-center ${
            value.trim() ? "bg-black" : "bg-gray-300"
          }`}
          onPress={onSend}
          disabled={!value.trim()}
        >
          <Text className="text-white font-semibold">
            {isReplying ? "Trả lời" : "Đăng"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(ActionSendComment);
