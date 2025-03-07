import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import { useNavigation, useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuthStore from "../../store/authStore";
import { validateField, handleFieldChange } from "../../utils/validate";

const Signup = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const { signUp, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const setters = {
    setErrors,
    setFullName,
    setEmail,
    setPhone,
    setPassword,
  };

  const handleSignUp = async () => {
    const fullNameValidation = validateField("fullName", fullName);
    const emailValidation = validateField("email", email);
    const phoneValidation = validateField("phone", phone);
    const passwordValidation = validateField("password", password);

    setErrors({
      fullName: fullNameValidation.error,
      email: emailValidation.error,
      phone: phoneValidation.error,
      password: passwordValidation.error,
    });

    if (
      fullNameValidation.isValid &&
      emailValidation.isValid &&
      phoneValidation.isValid &&
      passwordValidation.isValid
    ) {
      const register = await signUp({ email, password, phone, fullName });
      if (register) {
        router.push("/home");
      }
    }
  };

  const handleSignInPress = () => {
    router.push("/login");
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1">
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1724583698704-94b3f4771c58?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute w-full h-full bg-black/35" />
          <View className="flex-1">
            <SafeAreaView className="flex-1">
              <Animated.View
                entering={FadeInUp.delay(200).springify()}
                className="flex-1 items-center justify-center"
              >
                <Text className="text-white font-bold text-4xl tracking-wider text-center">
                  Khám Phá Nghệ An
                </Text>
                <Text className="text-white text-base tracking-widest mt-2">
                  Du lịch · Ẩm thực · Dịch vụ
                </Text>
              </Animated.View>
              <AuthForm
                title="Sign Up"
                buttonText="Sign Up"
                onButtonPress={handleSignUp}
                footerText="Already have an account?"
                footerActionText="Sign In"
                onFooterAction={handleSignInPress}
                isLoading={isLoading}
              >
                <View className="gap-3">
                  <View>
                    <CustomInput
                      placeholder="Full Name"
                      value={fullName}
                      onChangeText={(value) =>
                        handleFieldChange("fullName", value, setters)
                      }
                      editable={!isLoading}
                    />
                    {errors.fullName && (
                      <Text className="text-red-500 text-sm ml-1 mt-1">
                        {errors.fullName}
                      </Text>
                    )}
                  </View>

                  <View>
                    <CustomInput
                      placeholder="Email"
                      value={email}
                      onChangeText={(value) =>
                        handleFieldChange("email", value, setters)
                      }
                      keyboardType="email-address"
                      editable={!isLoading}
                    />
                    {errors.email && (
                      <Text className="text-red-500 text-sm ml-1 mt-1">
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  <View>
                    <CustomInput
                      placeholder="Phone"
                      value={phone}
                      onChangeText={(value) =>
                        handleFieldChange("phone", value, setters)
                      }
                      keyboardType="phone-pad"
                      editable={!isLoading}
                    />
                    {errors.phone && (
                      <Text className="text-red-500 text-sm ml-1 mt-1">
                        {errors.phone}
                      </Text>
                    )}
                  </View>

                  <View>
                    <PasswordInput
                      value={password}
                      onChangeText={(value) =>
                        handleFieldChange("password", value, setters)
                      }
                      showPassword={showPassword}
                      setShowPassword={setShowPassword}
                      editable={!isLoading}
                    />
                    {errors.password && (
                      <Text className="text-red-500 text-sm ml-1 mt-1">
                        {errors.password}
                      </Text>
                    )}
                  </View>
                </View>
              </AuthForm>
            </SafeAreaView>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Signup;
