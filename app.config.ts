/* eslint-disable sort-keys */
import 'dotenv/config';

const expo = {
  name: 'mobilecomputing',
  slug: 'mobilecomputing',
  version: '1.0.0',
  orientation: 'portrait',
  entryPoint: 'src/App.tsx',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFFFF',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos.',
        cameraPermission: 'The app accesses your photos.',
      },
    ],
  ],
  extra: {
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
  },
};

export default expo;
