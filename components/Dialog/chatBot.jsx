import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  KeyboardAvoidingView,
  Platform,
  LayoutAnimation,
} from "react-native";
import Animated from "react-native-reanimated";
import useAuthStore from "@store/authStore";
import axios from "axios";

const ChatBot = ({ onDismiss }) => {
  const { token, user } = useAuthStore();
  const [message, setMessage] = useState("");
  const [random, setRandom] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Xin chào! Tôi có thể giúp gì cho bạn?", sender: "bot" },
  ]);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
    };
    setMessages([...messages, newMessage]);
    setMessage("");

    try {
      const encodedMessage = encodeURIComponent(message);
      const res = await axios.get(
        `https://5601-171-242-75-98.ngrok-free.app/api/gen-ai/chat?sessionId=${random}&message=${encodedMessage}`
      );
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: res.data.reply, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    }
  };

  useEffect(() => {
    setRandom(new Date().getTime());
  }, []);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  return (
    <Modal transparent animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#1a1a1a",
              padding: 16,
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              height: "80%",
            }}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600", color: "white" }}>
                Chatbot
              </Text>
              <TouchableOpacity onPress={onDismiss}>
                <Text style={{ color: "white", fontSize: 24 }}>✖</Text>
              </TouchableOpacity>
            </View>

            {/* Danh sách tin nhắn */}
            <Animated.ScrollView
              ref={scrollViewRef}
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
              }}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled"
            >
              {messages.map((item) => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginVertical: 8,
                    alignSelf:
                      item.sender === "bot" ? "flex-start" : "flex-end",
                  }}
                >
                  <Image
                    source={
                      item.sender === "bot"
                        ? {
                            uri: "https://res.cloudinary.com/dn6xdmqbl/image/upload/v1731664045/avatar_user/embmui87itz8o4x1pcih.png",
                          }
                        : {
                            uri: "https://res.cloudinary.com/dn6xdmqbl/image/upload/v1721498345/avatar_user/li5azqqppupwifc8s1i9.jpg",
                          }
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 20,
                      marginRight: 8,
                    }}
                  />
                  <Text
                    style={{
                      padding: 12,
                      maxWidth: 300,
                      color: "white",
                      borderRadius: 8,
                      backgroundColor:
                        item.sender === "bot" ? "#2e2e2e" : "#6366f1",
                    }}
                  >
                    {item.text}
                  </Text>
                </View>
              ))}
            </Animated.ScrollView>

            {/* Ô nhập tin nhắn */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#4a4a4a",
                borderRadius: 8,
                padding: 8,
                marginTop: 12,
                marginBottom: 15,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  color: "white",
                  fontSize: 16,
                  paddingHorizontal: 8,
                }}
                placeholder="Nhập tin nhắn..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: "#6366f1",
                  padding: 12,
                  borderRadius: 8,
                  marginLeft: 8,
                }}
                onPress={handleSend}
              >
                <Text style={{ color: "white", fontSize: 16 }}>⏎</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ChatBot;
