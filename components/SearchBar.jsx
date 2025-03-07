import { View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const SearchBar = ({
  search,
  setSearch,
  placeholder = "Search something...",
  searchBarAnimation,
  onClear,
}) => {
  const searchBarStyle = useAnimatedStyle(() => {
    return {
      opacity: searchBarAnimation.value,
      transform: [
        {
          translateY: interpolate(searchBarAnimation.value, [0, 1], [-20, 0], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        },
      ],
    };
  });

  return (
    <Animated.View className="px-4 mb-4" style={searchBarStyle}>
      <View className="flex-row items-center bg-gray-50 rounded-full px-4 py-2 shadow-sm">
        <Ionicons name="search-outline" size={20} color="#666" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setSearch("");
              onClear?.();
            }}
          >
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default SearchBar;
