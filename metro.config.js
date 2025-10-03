const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  "@components": "./components",
  "@utils": "./utils",
  "@store": "./store",
  "@env": require.resolve("react-native-dotenv"),
};

config.resolver.sourceExts = ["js", "jsx", "ts", "tsx", "json"];

module.exports = config;
