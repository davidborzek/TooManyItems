import { NativeModules, Platform } from 'react-native';
import i18n, { LanguageDetectorModule } from 'i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import de from './translations/de.json';
import en from './translations/en.json';
import { initReactI18next } from 'react-i18next';

const appLanguageDetector: LanguageDetectorModule = {
  detect: () => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    return locale.split('_')[0];
  },
  type: 'languageDetector',
};

let instance = i18n;

if (Platform.OS === 'web') {
  instance = i18n.use(LanguageDetector);
} else {
  instance = i18n.use(appLanguageDetector);
}

instance.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    de: {
      translation: de,
    },
    en: {
      translation: en,
    },
  },
});
