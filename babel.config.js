module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          extensions: ['.ts', '.tsx', '.jsx', '.js', '.json', '.svg', '.jpg'],
          alias: {
            '@components': './src/components',
            '@screens': './src/screens',
            '@styles': './src/styles',
            '@utilities': './src/utilities',
            '@navigation': './src/navigation',
            '@api': './src/api',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
