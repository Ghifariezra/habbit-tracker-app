const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

let config = getDefaultConfig(__dirname);

config.transformer.minifierPath = 'metro-minify-terser';
config.transformer.minifierConfig = {
    compress: {
        // Remove console.log
        drop_console: true,

        unsafe: true,
        unsafe_arrows: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_symbols: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        unused: true,
    },
};

config = withNativeWind(config, { input: "./app/global.css" });

module.exports = config;
