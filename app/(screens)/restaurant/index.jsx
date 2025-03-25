import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const FOOD_CATEGORIES = [
  {
    id: "1",
    name: "Beef Burger",
    price: "15.00",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Eggs Benedict",
    price: "12.00",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Sushi Roll",
    price: "18.00",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Pumpkin Soup",
    price: "10.00",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&h=500&fit=crop",
  },
  {
    id: "5",
    name: "Fresh Pasta",
    price: "16.00",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=500&fit=crop",
  },
  {
    id: "6",
    name: "Fresh Salad",
    price: "9.00",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
  },
];

const index = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 ">
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-center mb-8">
            <View className="flex-row items-center gap-3">
              <TouchableOpacity onPressOut={() => navigation.goBack()}>
                <Ionicons
                  className="p-2 rounded-3xl"
                  style={{
                    boxShadow:
                      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
                  }}
                  name="arrow-back"
                  size={25}
                  color="black"
                />
              </TouchableOpacity>

              <Text className="text-2xl font-bold">Nhà hàng</Text>
            </View>
          </View>
          <Text className="text-lg font-semibold mb-4">Food Category</Text>
          <View className="flex-row flex-wrap justify-between">
            {FOOD_CATEGORIES.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="w-[48%] bg-white rounded-2xl mb-4 overflow-hidden shadow-sm"
                style={{
                  elevation: 2,
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  className="w-full h-32 rounded-t-2xl"
                />
                <View className="p-3">
                  <Text className="text-base font-semibold">{item.name}</Text>
                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-primary font-bold">
                      ${item.price}
                    </Text>
                    <TouchableOpacity className="bg-primary px-3 py-1 rounded-full">
                      <Text className="text-white">Add</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
