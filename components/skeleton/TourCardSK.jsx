import { View } from "react-native";
import React from "react";
import SkeletonItem from "./SkeletonItem";

const TourCardSK = () => {
  return (
    <View className="mt-6 px-4">
      {[1, 2, 3].map((item) => (
        <View
          key={item}
          className="bg-white rounded-2xl mb-4 overflow-hidden shadow"
        >
          <SkeletonItem className="w-full h-[200px] rounded-t-2xl" />
          <View className="p-3">
            <SkeletonItem className="h-6 rounded-md w-3/4" />
            <View className="flex-row items-center mt-2 gap-2">
              <SkeletonItem className="h-4 rounded-md w-20" />
              <SkeletonItem className="h-4 rounded-md w-32" />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TourCardSK;
