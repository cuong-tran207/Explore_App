import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { explores } from "../../utils/TestData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useDebounce } from "../../hooks/useDebounce";
import { ExploreCard } from "../../components/ExploreCard";
import SearchBar from "../../components/SearchBar";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [filteredExplores, setFilteredExplores] = useState(explores);
  const debouncedSearch = useDebounce(search, 500);

  const leftItems = filteredExplores.filter((item) => item.position === "left");
  const rightItems = filteredExplores.filter(
    (item) => item.position === "right"
  );

  const scrollY = useSharedValue(0);
  const searchBarAnimation = useSharedValue(0);

  const handleScroll = (event) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };
  const headerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 50], [1, 0.9], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      }),
      transform: [
        {
          translateY: interpolate(scrollY.value, [0, 100], [0, -5], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        },
      ],
    };
  });
  useEffect(() => {
    searchBarAnimation.value = withTiming(1, { duration: 800 });
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      const filtered = explores.filter((item) =>
        item.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setFilteredExplores(filtered);
    } else {
      setFilteredExplores(explores);
    }
  }, [debouncedSearch]);

  return (
    <SafeAreaView className="flex-1 ">
      <Animated.View
        className="flex-row items-center px-4 pt-2 pb-2"
        style={headerStyle}
      >
        <Animated.Text
          className="text-2xl font-bold ml-2 pb-2"
          entering={FadeIn.delay(200).springify()}
        >
          Explore Bromo
        </Animated.Text>
      </Animated.View>

      <SearchBar
        search={search}
        setSearch={setSearch}
        searchBarAnimation={searchBarAnimation}
        onClear={() => setFilteredExplores(explores)}
      />

      {filteredExplores.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Ionicons name="search" size={48} color="#ccc" />
          <Text className="text-gray-500 mt-4">No results found</Text>
        </View>
      ) : (
        <Animated.ScrollView
          className="flex-1 px-2"
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <View className="flex-row">
            {/* Left column */}
            <View className="w-1/2 px-2">
              {leftItems.map((item, index) => (
                <ExploreCard
                  key={item.id}
                  item={item}
                  index={index}
                  isLeft={true}
                />
              ))}
            </View>

            {/* Right column */}
            <Animated.View className="w-1/2 px-2">
              {rightItems.map((item, index) => (
                <ExploreCard
                  key={item.id}
                  item={item}
                  index={index}
                  isLeft={false}
                />
              ))}
            </Animated.View>
          </View>
        </Animated.ScrollView>
      )}
    </SafeAreaView>
  );
}
