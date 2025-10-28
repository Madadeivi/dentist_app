module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@/shared': './src/shared',
            '@/features': './src/features',
            '@/services': './src/services',
            '@/store': './src/store',
            '@/theme': './src/theme',
            '@/mock': './src/mock',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  }
}

