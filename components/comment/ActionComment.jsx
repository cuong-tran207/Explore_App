import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const ActionComment = ({ onReply, commentId }) => {
  return (
    <View className="flex-row items-center mb-3">
      <TouchableOpacity activeOpacity={0.7} onPress={onReply}>
        <Text className="text-blue-500 font-semibold">Reply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ActionComment;
