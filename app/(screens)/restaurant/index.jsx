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
import CardRestaurant from "../../../components/cardRestaurant";
import { useEffect, useState } from "react";
import apiServer from "../../../utils/api";

const FOOD_CATEGORIES = [
  {
    id: "1",
    name: "Beef Burger",
    price: "100000",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=500&fit=crop",
  },
  {
    id: "2",
    name: "Eggs Benedict",
    price: "200000",
    image:
      "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=500&h=500&fit=crop",
  },
  {
    id: "3",
    name: "Sushi Roll",
    price: "200000",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=500&fit=crop",
  },
  {
    id: "4",
    name: "Pumpkin Soup",
    price: "200000",
    image:
      "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=500&h=500&fit=crop",
  },
  {
    id: "5",
    name: "Fresh Pasta",
    price: "120000",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&h=500&fit=crop",
  },
  {
    id: "6",
    name: "Fresh Salad",
    price: "300000",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=500&fit=crop",
  },
];

const index = () => {
  const navigation = useNavigation();
  const [listRes, setListRes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiServer.call(`restaurant/list`);
      console.log(res);
      setListRes(res.data);
    };
    fetchData();
  }, []);
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
          <Text className="text-lg font-semibold mb-4">Danh sách nhà hàng</Text>
          <View className="flex-row flex-wrap justify-between">
            {listRes.map((item) => (
              <CardRestaurant item={item} key={item.id}></CardRestaurant>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
