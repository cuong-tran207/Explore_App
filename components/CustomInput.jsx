import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  rightIcon,
  onRightIconPress,
  secureTextEntry,
  keyboardType = "default",
  editable = true, // Thêm prop editable
}) => {
  return (
    <View className="relative">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={editable}
        className={`border border-gray-200 p-4 rounded-2xl ${
          editable ? "text-gray-700" : "text-gray-400 bg-gray-100"
        }`}
      />
      {rightIcon && (
        <TouchableOpacity
          onPress={onRightIconPress}
          className="absolute right-4 top-4"
          disabled={!editable}
        >
          <Ionicons
            name={rightIcon}
            size={24}
            color={editable ? "gray" : "#9CA3AF"}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;
