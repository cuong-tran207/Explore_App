import { View, Text } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

const detailPlan = () => {
  const route = useRoute();
  const { id } = route.params;
  return (
    <View>
      <Text>{id}</Text>
    </View>
  );
};

export default detailPlan;
