/**
 * Returns a sorted list of common languages for use in a <select> or USelectMenu.
 * Labels are resolved via the browser-native Intl.DisplayNames API — no JSON file,
 * no external dependency.
 *
 * The `value` of each option is a valid BCP 47 / HTML lang attribute tag, e.g. "en", "zh-Hans".
 * The `label` is the English display name, e.g. "English", "Chinese (Simplified)".
 */

// Common language tags used on websites. Extend as needed.
const LANGUAGE_TAGS = [
  'af',
  'sq',
  'am',
  'ar',
  'hy',
  'az',
  'eu',
  'be',
  'bn',
  'bs',
  'bg',
  'ca',
  'zh',
  'zh-Hant',
  'zh-Hans',
  'hr',
  'cs',
  'da',
  'nl',
  'en',
  'et',
  'fi',
  'fr',
  'gl',
  'ka',
  'de',
  'el',
  'gu',
  'he',
  'hi',
  'hu',
  'is',
  'id',
  'ga',
  'it',
  'ja',
  'kn',
  'kk',
  'km',
  'ko',
  'ky',
  'lo',
  'lv',
  'lt',
  'mk',
  'ms',
  'ml',
  'mt',
  'mr',
  'mn',
  'my',
  'ne',
  'nb',
  'nn',
  'or',
  'fa',
  'pl',
  'pt',
  'pa',
  'ro',
  'ru',
  'sr',
  'si',
  'sk',
  'sl',
  'es',
  'sw',
  'sv',
  'tg',
  'ta',
  'te',
  'th',
  'tr',
  'tk',
  'uk',
  'ur',
  'uz',
  'vi',
  'cy',
  'yi',
  'zu',
];

export interface LanguageOption {
  value: string;
  label: string;
}

export function useLanguageOptions(): LanguageOption[] {
  const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

  return LANGUAGE_TAGS.map(tag => ({
    value: tag,
    label: displayNames.of(tag) ?? tag,
  })).sort((a, b) => a.label.localeCompare(b.label));
}
