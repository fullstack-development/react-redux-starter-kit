import { Lang } from './namespace';
import buildTranslationKeys from './helpers/buildTranslationKeys';
import { en } from './locales';

export const LANGUAGES: Lang[] = ['en', 'ru'];

export const DEFAULT_LANGUAGE: Lang = 'en';

export const tKeys = buildTranslationKeys(en);
