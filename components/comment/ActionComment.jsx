import { View, Text, TouchableOpacity } from "react-native";
import React, { memo } from "react";

const ActionComment = memo(({ onReply, commentData }) => {
  const handleReply = () => {
    if (onReply && commentData) {
      onReply(commentData.id, commentData.userName);
    }
  };

  return (
    <View className="flex-row items-center mb-3">
      <TouchableOpacity activeOpacity={0.7} onPress={handleReply}>
        <Text className="text-blue-500 font-semibold">Reply</Text>
      </TouchableOpacity>
    </View>
  );
});

export default ActionComment;
