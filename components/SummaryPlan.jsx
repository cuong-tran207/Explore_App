import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import dataPlan from "../utils/PlanData";
import CardPlan from "./cardPlan";

const SummaryPlan = () => {
  const [status, setStatus] = useState(0);
  const change = (data) => {
    setStatus(data);
  };
  return (
    <SafeAreaView className="mt-[130px] flex-1">
      <View
        className="flex flex-row justify-center w-full gap-10 py-6"
        style={{
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <TouchableOpacity onPress={() => change(0)}>
          <Text
            className="text-[18px] font-semibold"
            style={{
              color: status === 0 ? "black" : "#777777",
            }}
          >
            Kế hoạch
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => change(1)}>
          <Text
            className="text-[18px] font-semibold"
            style={{
              color: status === 1 ? "black" : "#777777",
            }}
          >
            Hoàn thành
          </Text>
        </TouchableOpacity>
      </View>
      {status === 1 ? (
        <View className="flex-1">
          <ScrollView
            className="px-4 mt-3 "
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {dataPlan.map((plan) => (
              <CardPlan key={plan.id} index={plan.id} plan={plan} />
            ))}
          </ScrollView>
        </View>
      ) : (
        <View className="flex-1">
          <ScrollView
            className="px-4 mt-3"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {dataPlan.map((plan) => (
              <CardPlan key={plan.id} index={plan.id} plan={plan} />
            ))}
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default SummaryPlan;
