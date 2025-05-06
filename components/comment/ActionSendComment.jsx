import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const ActionSendComment = ({ onPostComment, initialReplyUser = null }) => {
  const [comment, setComment] = useState("");
  const textInputRef = useRef(null);

  useEffect(() => {
    if (initialReplyUser) {
      setComment(`@${initialReplyUser.userName} `);
      setTimeout(() => {
        if (textInputRef.current) {
          textInputRef.current.focus();
        }
      }, 100);
    }
  }, [initialReplyUser]);

  const handleChangeText = useCallback((text) => {
    setComment(text);
  }, []);

  const handlePostComment = useCallback(() => {
    if (!comment.trim()) return;
    onPostComment(comment);
    setComment("");
  }, [comment, onPostComment]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 70 : 0}
    >
      <View className="flex-row p-4 border-t border-gray-200 bg-white gap-2">
        <TextInput
          ref={textInputRef}
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
          placeholder="Share your thoughts..."
          placeholderTextColor="#999"
          value={comment}
          onChangeText={handleChangeText}
        />
        <TouchableOpacity
          className="bg-black rounded-full px-4 justify-center items-center"
          onPress={handlePostComment}
        >
          <Text className="text-white font-semibold">Post</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default React.memo(ActionSendComment);
