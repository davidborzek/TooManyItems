import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LanguageDetectorModule } from 'i18next';
import { Platform, NativeModules } from 'react-native';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from './translations/de.json'
import en from './translations/en.json'

const appLanguageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  init: () => {},
  detect: () => {
    const locale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0] // iOS 13
        : NativeModules.I18nManager.localeIdentifier;
    return locale.split('_')[0];
  },
  cacheUserLanguage: () => {},
};

let instance = i18n;

if (Platform.OS === 'web') {
  instance = i18n.use(LanguageDetector);
} else {
  instance = i18n.use(appLanguageDetector);
}

instance.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    de: {
      translation: de,
    },
    en: {
      translation: en,
    },
  },
  fallbackLng: 'en',

  interpolation: {
    escapeValue: false,
  },
});
