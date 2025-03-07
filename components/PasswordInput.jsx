import React from "react";
import CustomInput from "./CustomInput";

const PasswordInput = ({
  value,
  onChangeText,
  placeholder = "Password",
  showPassword,
  setShowPassword,
}) => {
  return (
    <CustomInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={!showPassword}
      rightIcon={showPassword ? "eye-off" : "eye"}
      onRightIconPress={() => setShowPassword(!showPassword)}
    />
  );
};

export default PasswordInput;
