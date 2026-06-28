import type { ExpoConfig } from 'expo/config';

const config: ExpoConfig = {
  name: 'Paramithenio',
  slug: 'paramithenio',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  scheme: 'paramithenio',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#fef9e9',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.acme.paramithenio',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#fef9e9',
    },
    package: 'com.acme.paramithenio',
  },
  web: {
    bundler: 'metro',
    output: 'static',
  },
  plugins: ['expo-router'],
  experiments: {
    typedRoutes: true,
  },
};

export default config;
