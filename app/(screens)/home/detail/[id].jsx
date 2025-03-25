import React, { Fragment, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  PanResponder,
  Animated,
  Dimensions,
} from "react-native";
import AnimatedReanimated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import { Modal, Portal } from "react-native-paper";
import { BlurView } from "expo-blur";
import AntDesign from "@expo/vector-icons/AntDesign";

import { images } from "@utils/TestData";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Header } from "@components/DetailPlaceHeader";
import CreatePlan from "@components/Dialog/createPlan";
import Comment from "./comment/[id]";

export default function Detail() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigation = useNavigation();

  const panY = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get("window").height;
  const closeModalWithAnimation = () => {
    Animated.timing(panY, {
      toValue: screenHeight, 
      duration: 300, 
      useNativeDriver: true, 
    }).start(() => {
      setModalVisible(false); 
      panY.setValue(0); 
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy > 20; // Chỉ cho phép vuốt xuống
      },
      onPanResponderMove: (evt, gestureState) => {
        panY.setValue(gestureState.dy > 0 ? gestureState.dy : 0); // Modal di chuyển theo tay
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 400) {
          closeModalWithAnimation();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Fragment>
      <View className="relative">
        <Header
          onBack={() => navigation.goBack()}
          setIsFavorited={setIsFavorited}
          isFavorited={isFavorited}
        />
        {selectedImage && (
          <AnimatedReanimated.Image
            key={selectedImage.uri}
            entering={
              Platform.OS === "ios"
                ? FadeIn.duration(700)
                : FadeIn.duration(500)
            }
            exiting={
              Platform.OS === "ios"
                ? FadeOut.duration(700)
                : FadeOut.duration(500)
            }
            source={{ uri: selectedImage.uri }}
            style={{ width: "100%", height: "100%", borderRadius: 10 }}
            resizeMode="cover"
            loadingStrategy="async"
            cachePolicy="memory"
          />
        )}
      </View>
      <View className="absolute bottom-10 w-full">
        <BlurView
          intensity={Platform.OS === "ios" ? 15 : 50}
          tint={Platform.OS === "ios" ? "light" : "dark"}
          className="mx-6 px-4 py-5 rounded-xl"
          style={{ overflow: "hidden", borderRadius: 20 }}
        >
          <View className="w-full">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="flex-row"
              contentContainerStyle={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >
              {images.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => setSelectedImage(item)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{ uri: item.uri }}
                    className={`w-16 h-16 rounded-xl ${
                      selectedImage.id === item.id
                        ? "border-2 border-white"
                        : ""
                    }`}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <AnimatedReanimated.Text
            key={selectedImage.id}
            entering={FadeInDown.duration(350).springify()}
            exiting={FadeOutUp.duration(300)}
            className="text-white text-sm font-medium mt-3"
            style={{ textAlign: "justify" }}
          >
            {selectedImage.description}
          </AnimatedReanimated.Text>
          <View
            style={{
              flexDirection: "row",
              gap: 12,
              width: "100%",
              marginTop: 12,
            }}
          >
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                flex: 0.9,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ fontWeight: "500" }}>Bình luận</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                backgroundColor: "white",
                borderRadius: 12,
                flex: 0.1,
                padding: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={showModal}
            >
              <AntDesign name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} animationType="slide">
          <CreatePlan onDismiss={hideModal} />
        </Modal>
        <Modal visible={modalVisible} transparent={true} animationType="none">
          <Animated.View
            style={{
              backgroundColor: "white",
              height: "100%",
              width: "100%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              transform: [{ translateY: panY }], // Modal trôi theo panY
            }}
            {...panResponder.panHandlers} // Gắn sự kiện vuốt
          >
            <View
              style={{
                width: 60,
                height: 5,
                backgroundColor: "gray",
                borderRadius: 2.5,
                alignSelf: "center",
                marginVertical: 10,
              }}
            />
            <Comment></Comment>
          </Animated.View>
        </Modal>
      </Portal>
    </Fragment>
  );
}
