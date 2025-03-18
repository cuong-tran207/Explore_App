import React, { Fragment, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutUp,
} from "react-native-reanimated";
import { Modal, Portal, PaperProvider } from "react-native-paper";
import { BlurView } from "expo-blur";

import { images } from "../../../../utils/TestData";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Header } from "../../../../components/DetailPlaceHeader";
import CreatePlan from "../../../../components/Dialog/createPlan";

export default function App() {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const { id } = useLocalSearchParams();
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigation = useNavigation();

  return (
    <Fragment>
      <View className="relative">
        <Header
          onBack={() => navigation.goBack()}
          setIsFavorited={setIsFavorited}
          isFavorited={isFavorited}
        />
        {selectedImage && (
          <Animated.Image
            key={selectedImage.uri}
            entering={
              Platform.OS == "ios" ? FadeIn.duration(700) : FadeIn.duration(500)
            }
            exiting={
              Platform.OS == "ios"
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
          <Animated.Text
            key={selectedImage.id}
            entering={FadeInDown.duration(350).springify()}
            exiting={FadeOutUp.duration(300)}
            className="text-white text-sm font-medium mt-3"
            style={{ textAlign: "justify" }}
          >
            {selectedImage.description}
          </Animated.Text>
        </BlurView>
      </View>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 300,
          right: 20,
          backgroundColor: "#fff",
          boxShadow:
            "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
        }}
        className="px-5 py-4 rounded-full"
        onPress={showModal}
      >
        <Text
          style={{
            color: "#000",
            fontSize: 14,
            fontWeight: "bold",
          }}
        >
          +
        </Text>
      </TouchableOpacity>
      <Modal visible={visible} onDismiss={hideModal} animationType="slide">
        <CreatePlan onDismiss={hideModal} />
      </Modal>
    </Fragment>
  );
}
