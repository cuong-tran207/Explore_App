import {
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { FadeInUp } from "react-native-reanimated";
import CustomInput from "../../components/CustomInput";
import PasswordInput from "../../components/PasswordInput";
import AuthForm from "../../components/AuthForm";
import { useRouter } from "expo-router";
import useAuthStore from "../../store/authStore";
import { validateField, handleFieldChange } from "../../utils/validate";

export default function Login() {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const setters = {
    setErrors,
    setEmail,
    setPassword,
  };

  const handleLogin = async () => {
    const emailValidation = validateField("email", email);
    const passwordValidation = validateField("password", password);
    setErrors({
      email: emailValidation.error,
      password: passwordValidation.error,
    });
    if (emailValidation.isValid && passwordValidation.isValid) {
      const success = await signIn(email, password);
      if (success) {
        router.push("/home");
      }
    }
  };

  const handleSignUpPress = () => {
    router.push("/signup");
    setEmail("");
    setPassword("");
    setErrors({});
    setShowPassword(false);
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
              uri: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf",
            }}
            className="absolute w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute w-full h-full bg-black/35" />

          <SafeAreaView className="flex-1">
            <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
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
                title="Sign In"
                buttonText="Sign In"
                onButtonPress={handleLogin}
                footerText="Don't have an account?"
                footerActionText="Sign Up"
                onFooterAction={handleSignUpPress}
                isLoading={isLoading}
              >
                <View className="gap-3">
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

                  {error && (
                    <Text className="text-red-500 text-sm text-center">
                      {error}
                    </Text>
                  )}
                </View>
              </AuthForm>
            </ScrollView>
          </SafeAreaView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
