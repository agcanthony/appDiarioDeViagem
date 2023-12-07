module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      '@babel/transform-react-jsx-source',
      'babel-plugin-transform-typescript-metadata',
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            '@core': './src/core',
            '@components': './src/components',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
