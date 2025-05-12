import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CardHotel from "../../../components/cardHotel";
import apiServer from "../../../utils/api";

const index = () => {
  const navigation = useNavigation();
  const [topListHotel, setTopListHotel] = useState([]);
  const [listHotel, setListHotel] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await apiServer.call(`hotel/list`);
      console.log(res);
      setListHotel(res.data.slice(3));
      setTopListHotel(res.data.slice(0, 3));
    };
    fetchData();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4">
          <View className="flex-row justify-between items-center ">
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

              <Text className="text-2xl font-bold">Khách sạn</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-gray-800 mt-6 mb-4">
            Featured Hotels
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topListHotel.map((hotel, index) => (
              <CardHotel
                key={index}
                hotel={hotel}
                width={"300"}
                height={"120"}
              ></CardHotel>
            ))}
          </ScrollView>

          <Text className="text-xl font-bold text-gray-800  mt-8 mb-4">
            Popular Destinations
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {listHotel.map((hotel) => (
              <CardHotel
                key={hotel.id}
                hotel={hotel}
                width={"190"}
                height={"90"}
              ></CardHotel>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;
