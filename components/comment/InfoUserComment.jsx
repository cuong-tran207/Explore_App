import { View, Text, Image } from "react-native";
import React from "react";

const InfoUserComment = ({ userName, time, userAvatar }) => {
  return (
    <View
      className="flex-row items-center mb-2"
      style={{
        paddingBottom: 6,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
      }}
    >
      <Image
        source={{ uri: userAvatar }}
        className="w-9 h-9 rounded-full mr-2"
        style={{ width: 40, height: 40, borderRadius: 1000 }}
        defaultSource={{
          uri: "https://cdn-icons-png.flaticon.com/512/219/219983.png",
        }}
      />
      <View className="flex flex-col items-start justify-center">
        <Text className="font-semibold text-black">{userName}</Text>

        {time && <Text className="text-gray-400 text-xs">{time}</Text>}
      </View>
    </View>
  );
};

export default InfoUserComment;
