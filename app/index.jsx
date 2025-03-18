import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { useNavigation, useRouter, useSegments } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import useAuthStore from "../store/authStore";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  const buttonWidthAnim = useRef(new Animated.Value(50)).current;
  const buttonTextOpacity = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const textFadeAnim = useRef(new Animated.Value(1)).current;

  const { width, height } = Dimensions.get("screen");

  const slides = [
    {
      image: require("../assets/image/anh4.jpg"),
      text: "Chào mừng đến với ứng dụng của chúng tôi",
    },
    {
      image: require("../assets/image/anh2.jpg"),
      text: "Khám phá những tính năng tuyệt vời",
    },
  ];

  const isLastSlide = currentIndex === slides.length - 1;
    const initializeTokenManager = useAuthStore(
      (state) => state.initializeTokenManager
    );

  const { token, user } = useAuthStore();
  const segments = useSegments();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!isReady) {
      setIsReady(true);
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";
    let backHandler;
    if (!token && !user && !inAuthGroup) {
      router.replace("/login");
    } else if (token && user && inAuthGroup) {
      router.replace("/home");
    }
  }, [isReady, token, user, segments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.navigate("/login");
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLastSlide) {
      const finalWidth = 130;

      Animated.sequence([
        Animated.timing(iconOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(buttonWidthAnim, {
            toValue: finalWidth,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(buttonTextOpacity, {
            toValue: 1,
            duration: 200,
            delay: 50,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(buttonTextOpacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.parallel([
          Animated.timing(buttonWidthAnim, {
            toValue: 50,
            duration: 250,
            useNativeDriver: false,
          }),
          Animated.timing(iconOpacity, {
            toValue: 1,
            duration: 200,
            delay: 50,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [currentIndex, isLastSlide]);

  const handleAnimation = (callback) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -50,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      callback();
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(textFadeAnim, {
          toValue: 1,
          duration: 600,
          delay: 100,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      handleAnimation(() => {
        setCurrentIndex((prev) => prev + 1);
      });
    } else {
      router.navigate("login");
    }
  };

  useEffect(() => {
    initializeTokenManager();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <BlurView intensity={90} tint="light" style={StyleSheet.absoluteFill} />
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: width,
          height: height,
          opacity: fadeAnim,
          transform: [{ translateX: slideAnim }],
          zIndex: 1,
        }}
      >
        <Image
          source={slides[currentIndex]?.image}
          style={{
            width: width,
            height: height,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          resizeMode="cover"
        />
        <View
          style={[
            styles.overlay,
            {
              backgroundColor: `rgba(0, 0, 0, ${0.4})`,
            },
          ]}
        />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            opacity: textFadeAnim,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              fontWeight: "bold",
              textAlign: "center",
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
            }}
          >
            {slides[currentIndex]?.text}
          </Text>
        </Animated.View>
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          right: 20,
          bottom: 40,
          width: buttonWidthAnim,
          height: 50,
          backgroundColor: isLastSlide ? "#10b981" : "#3b82f6",
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <TouchableOpacity
          onPress={handleNext}
          style={{
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 12,
          }}
          activeOpacity={0.8}
        >
          <Animated.View
            style={{
              opacity: iconOpacity,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <AntDesign name="arrowright" size={24} color="white" />
          </Animated.View>
          <Animated.Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 16,
              opacity: buttonTextOpacity,
              textAlign: "center",
            }}
          >
            Bắt đầu
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // phủ toàn bộ view cha
  },
});

export default WelcomeScreen;
